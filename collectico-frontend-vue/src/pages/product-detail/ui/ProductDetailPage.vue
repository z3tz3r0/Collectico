<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { useApi } from '@/shared/api/http-client'
import { productDetailQuery } from '@/entities/product'

// FSD page: a single product detail. The id comes from the /product/[productId] route param.
const route = useRoute()
const api = useApi()
const id = computed(() => String(route.params.productId ?? ''))

const { data: product, status, error, suspense } = useQuery(productDetailQuery(api, id))
// Resolve on the server so the detail is dehydrated into the SSR payload and the client hydrates
// without an immediate refetch. Swallow errors so the error branch still renders.
if (import.meta.server) await suspense().catch(() => {})

const priceLabel = computed(() => {
  const n = Number(product.value?.price)
  return Number.isFinite(n) && n > 0 ? `$${n.toLocaleString('en-US')}` : null
})
</script>

<template>
  <section class="product-detail">
    <p v-if="status === 'pending'">Loading...</p>
    <p v-else-if="status === 'error'">Could not load product: {{ (error as Error)?.message }}</p>
    <article v-else-if="product" class="product-detail__layout">
      <div class="product-detail__media">
        <img v-if="product.image" :src="product.image" :alt="product.title" />
      </div>
      <div class="product-detail__info">
        <h1>{{ product.title }}</h1>
        <p class="product-detail__artist">{{ product.artist }}</p>
        <p v-if="priceLabel" class="product-detail__price">{{ priceLabel }}</p>
        <p v-if="product.description">{{ product.description }}</p>
        <dl class="product-detail__meta">
          <template v-if="product.yearCreated">
            <dt>Year</dt>
            <dd>{{ product.yearCreated }}</dd>
          </template>
          <template v-if="product.dimensions">
            <dt>Dimensions</dt>
            <dd>{{ product.dimensions }}</dd>
          </template>
          <template v-if="product.material">
            <dt>Material</dt>
            <dd>{{ product.material }}</dd>
          </template>
        </dl>
      </div>
    </article>
    <p v-else>Product not found.</p>
  </section>
</template>

<style scoped>
.product-detail {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
.product-detail__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem;
}
.product-detail__media img {
  width: 100%;
  border-radius: 8px;
}
.product-detail__artist {
  color: #555;
}
.product-detail__price {
  font-weight: 600;
  font-size: 1.25rem;
}
.product-detail__meta {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem 1rem;
  margin-top: 1rem;
}
.product-detail__meta dt {
  font-weight: 600;
}
@media (max-width: 640px) {
  .product-detail__layout {
    grid-template-columns: 1fr;
  }
}
</style>
