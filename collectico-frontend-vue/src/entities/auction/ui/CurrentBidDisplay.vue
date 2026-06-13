<script setup lang="ts">
// FSD entities/auction UI: shows the current highest bid, falling back to the starting bid when no
// bids exist. Uses an explicit en-US locale so SSR and client render identical text (hydration-safe).
const props = defineProps<{ currentBid: number; startingBid: number }>()

function fmt(n: number): string {
  return `$${n.toLocaleString('en-US')}`
}

const hasBids = computed(() => props.currentBid > 0)
</script>

<template>
  <div class="current-bid">
    <p class="current-bid__amount">{{ hasBids ? fmt(currentBid) : fmt(startingBid) }}</p>
    <p class="current-bid__label">{{ hasBids ? 'Current bid' : 'Starting bid' }}</p>
    <p v-if="hasBids" class="current-bid__starting">Starting bid: {{ fmt(startingBid) }}</p>
  </div>
</template>

<style scoped>
.current-bid__amount {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}
.current-bid__label {
  color: #555;
  margin: 0;
}
.current-bid__starting {
  color: #777;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
}
</style>
