<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useApi } from '@/shared/api/http-client'
import { shopProductsQuery } from '@/entities/product'
import { ProductSearchBar, useProductSearch } from '@/features/product-search'
import { ProductGrid } from '@/widgets/product-grid'

// FSD page: the shop listing. Reads an optional ?genre query and lists the matching products,
// with client-side search + sort over the fetched list.
const route = useRoute()
const api = useApi()
const genre = computed(() => (typeof route.query.genre === 'string' ? route.query.genre : ''))

const { data, status, error } = useQuery(shopProductsQuery(api, genre))
const products = computed(() => data.value ?? [])
const { searchTerm, sortMethod, results } = useProductSearch(products)
</script>

<template>
  <section class="shop">
    <h1>{{ genre ? `Shop: ${genre}` : 'Shop' }}</h1>
    <ProductSearchBar v-model:searchTerm="searchTerm" v-model:sortMethod="sortMethod" />
    <p v-if="status === 'pending'">Loading artworks...</p>
    <p v-else-if="status === 'error'">Could not load products: {{ (error as Error)?.message }}</p>
    <ProductGrid v-else :products="results" />
  </section>
</template>

<style scoped>
.shop {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
