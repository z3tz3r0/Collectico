<script setup lang="ts">
import { ProductCard, type Product } from '@/entities/product'

// FSD widget: a responsive grid of product cards. Composes the entities/product card.
defineProps<{ products: Product[] }>()
</script>

<template>
  <div v-if="products.length" class="product-grid">
    <ProductCard v-for="product in products" :key="product._id" :product="product" />
  </div>
  <p v-else class="product-grid__empty">No artworks found.</p>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}
.product-grid__empty {
  color: #555;
}
</style>
