import type { MaybeRefOrGetter } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { useSocket } from '@/shared/api/socket'
import { useAuthStore } from '@/entities/user'

interface NewBidPayload {
  productId: string
}
interface BidErrorPayload {
  message?: string
}

// Wires realtime bidding for one auction product: refetches the bid history when a matching newBid
// broadcast arrives, surfaces bidError, and emits placeBid (auth-gated). Socket work is client-only
// (useSocket returns null on the server), guarded throughout.
export function useAuctionBidding(productId: MaybeRefOrGetter<string>) {
  const auth = useAuthStore()
  const queryClient = useQueryClient()
  const socket = useSocket()
  const bidError = ref<string | null>(null)
  const idRef = computed(() => toValue(productId))

  function onNewBid(payload: NewBidPayload) {
    // The backend broadcasts newBid to all clients, so filter to this auction before refetching.
    if (payload?.productId === idRef.value) {
      queryClient.invalidateQueries({ queryKey: ['bids', idRef.value] })
    }
  }
  function onBidError(payload: BidErrorPayload) {
    bidError.value = payload?.message ?? 'Bid failed'
  }

  onMounted(() => {
    if (!socket) return
    socket.on('newBid', onNewBid)
    socket.on('bidError', onBidError)
  })
  onUnmounted(() => {
    if (!socket) return
    socket.off('newBid', onNewBid)
    socket.off('bidError', onBidError)
  })

  // Emits the bid over the socket. Returns false and opens the login popup when not authenticated.
  function placeBid(amount: number): boolean {
    bidError.value = null
    if (!auth.isAuthenticated || !auth.user?.id) {
      auth.openLoginPopup()
      return false
    }
    if (!socket) {
      bidError.value = 'Realtime connection unavailable.'
      return false
    }
    socket.emit('placeBid', { productId: idRef.value, userId: auth.user.id, amount })
    return true
  }

  return { placeBid, bidError }
}
