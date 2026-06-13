<script setup lang="ts">
import type { ProductSortMethod } from '../model/use-product-search'

// Controlled search + sort bar. Two-way bound to the refs from useProductSearch via v-model.
const searchTerm = defineModel<string>('searchTerm', { default: '' })
const sortMethod = defineModel<ProductSortMethod>('sortMethod', { default: 'none' })
</script>

<template>
  <div class="product-search-bar">
    <input
      v-model="searchTerm"
      type="search"
      placeholder="Search by title or artist"
      aria-label="Search products"
    />
    <select v-model="sortMethod" aria-label="Sort products">
      <option value="none">Sort</option>
      <option value="az">Title A-Z</option>
      <option value="za">Title Z-A</option>
      <option value="price-asc">Price low to high</option>
      <option value="price-desc">Price high to low</option>
    </select>
  </div>
</template>

<style scoped>
.product-search-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.product-search-bar input {
  flex: 1 1 12rem;
}
</style>
