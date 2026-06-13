<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useApi } from '@/shared/api/http-client'
import { auctionListQuery } from '@/entities/product'
import { ProductSearchBar, useProductSearch } from '@/features/product-search'
import { ProductGrid } from '@/widgets/product-grid'

// FSD page: the auction listing. Auctions are products with auction.isAuction = true. The detail /
// live-bidding view is a later sub-phase, so cards link to the standard product detail for now.
const api = useApi()
const { data, status, error } = useQuery(auctionListQuery(api))
const products = computed(() => data.value ?? [])
const { searchTerm, sortMethod, results } = useProductSearch(products)
</script>

<template>
  <section class="auctions">
    <h1>Auctions</h1>
    <ProductSearchBar v-model:searchTerm="searchTerm" v-model:sortMethod="sortMethod" />
    <p v-if="status === 'pending'">Loading auctions...</p>
    <p v-else-if="status === 'error'">Could not load auctions: {{ (error as Error)?.message }}</p>
    <ProductGrid v-else :products="results" />
  </section>
</template>

<style scoped>
.auctions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
