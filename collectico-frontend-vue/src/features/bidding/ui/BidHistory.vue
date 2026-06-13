<script setup lang="ts">
import type { Bid } from '@/entities/auction'

// FSD features/bidding UI: the bid history list. Amounts and times use deterministic formatting
// (explicit en-US, UTC ISO) so SSR and client render identically.
defineProps<{ bids: Bid[] }>()

function bidderName(bid: Bid): string {
  const name = `${bid.user?.firstName ?? ''} ${bid.user?.lastName ?? ''}`.trim()
  return name || 'Anonymous'
}
function amountLabel(bid: Bid): string {
  const n = Number(bid.amount)
  return Number.isFinite(n) ? `$${n.toLocaleString('en-US')}` : bid.amount
}
function timeLabel(bid: Bid): string {
  if (!bid.createdAt) return ''
  return `${new Date(bid.createdAt).toISOString().slice(0, 16).replace('T', ' ')} UTC`
}
</script>

<template>
  <div class="bid-history">
    <ul v-if="bids.length" class="bid-history__list">
      <li v-for="bid in bids" :key="bid._id" class="bid-history__item">
        <span class="bid-history__name">{{ bidderName(bid) }}</span>
        <span class="bid-history__amount">{{ amountLabel(bid) }}</span>
        <span class="bid-history__time">{{ timeLabel(bid) }}</span>
      </li>
    </ul>
    <p v-else class="bid-history__empty">No bids yet.</p>
  </div>
</template>

<style scoped>
.bid-history__list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 16rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.bid-history__item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  font-size: 0.875rem;
}
.bid-history__amount {
  font-weight: 600;
}
.bid-history__time {
  color: #777;
}
.bid-history__empty {
  color: #555;
}
</style>
