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

  function joinRoom() {
    socket?.emit('joinAuction', idRef.value)
  }
  function onNewBid(payload: NewBidPayload) {
    // Room-scoped broadcasts already target this auction; the id check is a harmless extra guard.
    // A new accepted bid means any prior bid error is stale, so clear it.
    if (payload?.productId === idRef.value) {
      bidError.value = null
      queryClient.invalidateQueries({ queryKey: ['bids', idRef.value] })
    }
  }
  function onBidError(payload: BidErrorPayload) {
    bidError.value = payload?.message ?? 'Bid failed'
  }
  function onConnect() {
    // Fires on the initial connect and every reconnect. newBid events broadcast while disconnected
    // are not replayed, so re-join the room and re-sync the history on every (re)connect.
    joinRoom()
    queryClient.invalidateQueries({ queryKey: ['bids', idRef.value] })
  }

  onMounted(() => {
    if (!socket) return
    socket.on('newBid', onNewBid)
    socket.on('bidError', onBidError)
    socket.on('connect', onConnect)
    if (socket.connected) joinRoom()
  })
  onUnmounted(() => {
    if (!socket) return
    socket.emit('leaveAuction', idRef.value)
    socket.off('newBid', onNewBid)
    socket.off('bidError', onBidError)
    socket.off('connect', onConnect)
  })

  // Emits the bid over the socket. The server derives the bidder from the authenticated handshake,
  // so no userId is sent (anti-impersonation). Returns false + opens the login popup when anonymous.
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
    socket.emit('placeBid', { productId: idRef.value, amount })
    return true
  }

  return { placeBid, bidError }
}
