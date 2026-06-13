<script setup lang="ts">
import type { Product } from '../model/types'

// FSD entities/product UI: one product tile for a grid, links to the detail page.
const props = defineProps<{ product: Product }>()

const priceLabel = computed(() => {
  const n = Number(props.product.price)
  return Number.isFinite(n) && n > 0 ? `$${n.toLocaleString('en-US')}` : null
})

// Auction products link to the live auction detail; fixed-price products to the standard detail.
const linkTo = computed(() =>
  props.product.auction?.isAuction
    ? `/auction/${props.product._id}`
    : `/product/${props.product._id}`,
)
</script>

<template>
  <NuxtLink :to="linkTo" class="product-card">
    <div class="product-card__media">
      <img v-if="product.image" :src="product.image" :alt="product.title" loading="lazy" />
    </div>
    <div class="product-card__body">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__artist">{{ product.artist }}</p>
      <p v-if="priceLabel" class="product-card__price">{{ priceLabel }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
}
.product-card__media {
  aspect-ratio: 1 / 1;
  background: #f2f2f2;
  overflow: hidden;
  border-radius: 8px;
}
.product-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-card__title {
  font-size: 1rem;
  margin: 0;
}
.product-card__artist {
  font-size: 0.875rem;
  color: #555;
  margin: 0;
}
.product-card__price {
  font-weight: 600;
  margin: 0;
}
</style>
