<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { apiPaths, useApi } from '@/shared/api/http-client'

// Phase 0 smoke route: exercises the full chain (vue-query plugin + shared ofetch client + FSD import).
const api = useApi()

const { data, status, error } = useQuery({
  queryKey: ['products', 'list'],
  queryFn: () => api<unknown[]>(apiPaths.products.list),
  retry: false,
})

const count = computed(() => (Array.isArray(data.value) ? data.value.length : 0))
</script>

<template>
  <main style="padding: 2rem; font-family: sans-serif">
    <h1>Collectico</h1>
    <p>Nuxt 4 + Feature-Sliced Design baseline.</p>
    <p v-if="status === 'pending'">Loading products...</p>
    <p v-else-if="status === 'error'">Backend not reachable: {{ (error as Error)?.message }}</p>
    <p v-else>Products fetched: {{ count }}</p>
  </main>
</template>
