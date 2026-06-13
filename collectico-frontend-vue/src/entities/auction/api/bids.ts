import type { MaybeRefOrGetter } from 'vue'
import { queryOptions } from '@tanstack/vue-query'
import { apiPaths, useApi } from '@/shared/api/http-client'
import type { Bid } from '../model/types'

type Api = ReturnType<typeof useApi>

// The bids endpoint returns a bare array (newest first), no wrapper to normalize.
async function fetchBids(api: Api, productId: string): Promise<Bid[]> {
  return await api<Bid[]>(apiPaths.bids.detail(productId))
}

export function bidsByProductQuery(api: Api, productId: MaybeRefOrGetter<string>) {
  const idRef = computed(() => toValue(productId))
  return queryOptions({
    queryKey: ['bids', idRef],
    queryFn: () => fetchBids(api, idRef.value),
    enabled: computed(() => idRef.value.length > 0),
  })
}
