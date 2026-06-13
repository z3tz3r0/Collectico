<script setup lang="ts">
import { useAuthStore } from '@/entities/user'

// FSD features/bidding UI: the place-a-bid form. Validation mirrors the legacy BidForm (numeric,
// positive, above the current bid, below one quadrillion). Unauthenticated users get a sign-in prompt.
const props = defineProps<{
  currentBid: number
  isAuctionEnded: boolean
  winner?: { name: string; amount: number } | null
}>()
const emit = defineEmits<{ bid: [amount: number] }>()
const auth = useAuthStore()

const amount = ref('')
const errorMessage = ref<string | null>(null)

function validate(): string | null {
  const n = Number(amount.value)
  if (!amount.value || !Number.isFinite(n)) return 'Enter a valid amount.'
  if (n <= 0) return 'Amount must be positive.'
  if (!Number.isInteger(n)) return 'Enter a whole number.'
  if (n <= props.currentBid) return `Bid must be higher than $${props.currentBid.toLocaleString('en-US')}.`
  if (n > 999_999_999_999_995) return 'Amount is too large.'
  return null
}

function onSubmit() {
  errorMessage.value = validate()
  if (errorMessage.value) return
  emit('bid', Number(amount.value))
  amount.value = ''
}
</script>

<template>
  <div class="bid-form">
    <div v-if="isAuctionEnded" class="bid-form__ended">
      <p>This auction has ended.</p>
      <p v-if="winner">Winner: {{ winner.name }} (${{ winner.amount.toLocaleString('en-US') }})</p>
      <p v-else>No winner.</p>
    </div>
    <button
      v-else-if="!auth.isAuthenticated"
      type="button"
      class="bid-form__signin"
      @click="auth.openLoginPopup()"
    >
      Sign in to bid
    </button>
    <form v-else class="bid-form__form" @submit.prevent="onSubmit">
      <label>
        Your bid
        <input v-model="amount" type="number" min="0" step="1" inputmode="numeric" required />
      </label>
      <p v-if="errorMessage" role="alert" class="bid-form__error">{{ errorMessage }}</p>
      <button type="submit">Place bid</button>
    </form>
  </div>
</template>

<style scoped>
.bid-form__form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.bid-form__form label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.bid-form__error {
  color: #b3261e;
  margin: 0;
}
.bid-form__ended {
  color: #b3261e;
}
</style>
