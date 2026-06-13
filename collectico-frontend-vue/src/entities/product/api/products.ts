import type { MaybeRefOrGetter } from 'vue'
import { queryOptions } from '@tanstack/vue-query'
import { apiPaths, useApi } from '@/shared/api/http-client'
import type { Product } from '../model/types'

// The ofetch instance returned by useApi(). Pass it in from component setup (where useApi() is valid
// for SSR cookie forwarding) rather than calling useApi() inside a queryFn.
type Api = ReturnType<typeof useApi>

// The legacy backend wraps each list/detail endpoint differently (allProduct / allAuctionProduct /
// products / product). Normalize every response to a plain Product[] or Product here so the rest of
// the app sees one consistent shape.
async function fetchProductList(api: Api): Promise<Product[]> {
  const data = await api<{ err?: boolean; allProduct?: Product[] }>(apiPaths.products.list)
  return data.allProduct ?? []
}

async function fetchAuctionList(api: Api): Promise<Product[]> {
  const data = await api<{ err?: boolean; allAuctionProduct?: Product[] }>(apiPaths.products.auctionList)
  return data.allAuctionProduct ?? []
}

async function fetchProductsByGenre(api: Api, genre: string): Promise<Product[]> {
  const data = await api<{ error?: boolean; products?: Product[] }>(apiPaths.products.byGenre(genre))
  return data.products ?? []
}

async function fetchProduct(api: Api, id: string): Promise<Product> {
  const data = await api<{ error?: boolean; product: Product }>(apiPaths.products.detail(id))
  return data.product
}

export function productListQuery(api: Api) {
  return queryOptions({
    queryKey: ['products', 'list'],
    queryFn: () => fetchProductList(api),
  })
}

export function auctionListQuery(api: Api) {
  return queryOptions({
    queryKey: ['products', 'auction', 'list'],
    queryFn: () => fetchAuctionList(api),
  })
}

export function productsByGenreQuery(api: Api, genre: MaybeRefOrGetter<string>) {
  // The reactive source goes into the key itself (a computed), never its unwrapped value, so the
  // query refetches when the genre changes.
  const genreRef = computed(() => toValue(genre))
  return queryOptions({
    queryKey: ['products', 'genre', genreRef],
    queryFn: () => fetchProductsByGenre(api, genreRef.value),
    enabled: computed(() => genreRef.value.length > 0),
  })
}

// The shop listing: products of a genre when one is selected, otherwise the full fixed-price list.
// A single reactive query so the page refetches when the genre query param changes.
export function shopProductsQuery(api: Api, genre: MaybeRefOrGetter<string>) {
  const genreRef = computed(() => toValue(genre))
  return queryOptions({
    queryKey: ['products', 'shop', genreRef],
    queryFn: () => (genreRef.value ? fetchProductsByGenre(api, genreRef.value) : fetchProductList(api)),
  })
}

export function productDetailQuery(api: Api, id: MaybeRefOrGetter<string>) {
  const idRef = computed(() => toValue(id))
  return queryOptions({
    queryKey: ['products', 'detail', idRef],
    queryFn: () => fetchProduct(api, idRef.value),
    enabled: computed(() => idRef.value.length > 0),
  })
}
