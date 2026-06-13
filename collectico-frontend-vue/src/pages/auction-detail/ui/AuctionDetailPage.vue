<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useApi } from '@/shared/api/http-client'
import { productDetailQuery } from '@/entities/product'
import { AuctionCountdown, CurrentBidDisplay, bidsByProductQuery, highestBidAmount } from '@/entities/auction'
import { BidForm, BidHistory, useAuctionBidding } from '@/features/bidding'

// FSD page: auction detail with live bidding. Product + bid history are SSR'd; the countdown and the
// auth-gated bid form are client-only (time + auth), and the bid history updates live over the socket.
const route = useRoute()
const api = useApi()
const id = computed(() => String(route.params.auctionId ?? ''))

const { data: product, status: productStatus, error: productError, suspense: productSuspense } =
  useQuery(productDetailQuery(api, id))
const { data: bidsData, suspense: bidsSuspense } = useQuery(bidsByProductQuery(api, id))

// Composable with lifecycle hooks (socket on/off) must be called before the first await in setup.
const { placeBid, bidError } = useAuctionBidding(id)

if (import.meta.server) {
  await Promise.all([productSuspense().catch(() => {}), bidsSuspense().catch(() => {})])
}

const bids = computed(() => bidsData.value ?? [])
const startingBid = computed(() => Number(product.value?.minBidPrice) || 0)
const currentBid = computed(() => highestBidAmount(bids.value))
const isAuctionEnded = ref(false)

function onBid(amount: number) {
  placeBid(amount)
}
function onEnded() {
  isAuctionEnded.value = true
}
</script>

<template>
  <section class="auction-detail">
    <p v-if="productStatus === 'pending'">Loading...</p>
    <p v-else-if="productStatus === 'error'">
      Could not load auction: {{ (productError as Error)?.message }}
    </p>
    <article v-else-if="product" class="auction-detail__layout">
      <div class="auction-detail__media">
        <img v-if="product.image" :src="product.image" :alt="product.title" />
      </div>
      <div class="auction-detail__info">
        <h1>{{ product.title }}</h1>
        <p class="auction-detail__artist">{{ product.artist }}</p>

        <CurrentBidDisplay :current-bid="currentBid" :starting-bid="startingBid" />

        <ClientOnly>
          <AuctionCountdown :end-date="product.auction?.endDate" @ended="onEnded" />
        </ClientOnly>

        <p v-if="product.description" class="auction-detail__desc">{{ product.description }}</p>

        <ClientOnly>
          <BidForm :current-bid="currentBid" :is-auction-ended="isAuctionEnded" @bid="onBid" />
        </ClientOnly>
        <p v-if="bidError" role="alert" class="auction-detail__error">{{ bidError }}</p>

        <h2>Bid history</h2>
        <BidHistory :bids="bids" />
      </div>
    </article>
    <p v-else>Auction not found.</p>
  </section>
</template>

<style scoped>
.auction-detail {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
.auction-detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
}
.auction-detail__media img {
  width: 100%;
  border-radius: 8px;
}
.auction-detail__info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.auction-detail__artist {
  color: #555;
  margin: 0;
}
.auction-detail__error {
  color: #b3261e;
}
@media (max-width: 640px) {
  .auction-detail__layout {
    grid-template-columns: 1fr;
  }
}
</style>
