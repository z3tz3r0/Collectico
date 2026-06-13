import type { MaybeRefOrGetter } from 'vue'
import type { Product } from '@/entities/product'
import { useDebounce } from '@/shared/lib/use-debounce'

// Client-side search + sort over an already-fetched product list, mirroring the legacy SortBox /
// AuctionSort behavior (filter by title or artist, sort by title or price). The list is fetched by
// the page via entities/product queries and passed in here.
export type ProductSortMethod = 'none' | 'az' | 'za' | 'price-asc' | 'price-desc'

// Prices are strings on the backend. Coerce defensively, treating non-numeric as 0.
function toPrice(value?: string): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

export function useProductSearch(products: MaybeRefOrGetter<Product[]>) {
  const searchTerm = ref('')
  const sortMethod = ref<ProductSortMethod>('none')
  const debouncedTerm = useDebounce(searchTerm, 250)

  const results = computed(() => {
    const term = debouncedTerm.value.trim().toLowerCase()
    const source = toValue(products)
    const filtered = term
      ? source.filter(
          (p) =>
            p.title?.toLowerCase().includes(term) || p.artist?.toLowerCase().includes(term),
        )
      : source

    const sorted = [...filtered]
    switch (sortMethod.value) {
      case 'az':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'za':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'price-asc':
        sorted.sort((a, b) => toPrice(a.price) - toPrice(b.price))
        break
      case 'price-desc':
        sorted.sort((a, b) => toPrice(b.price) - toPrice(a.price))
        break
    }
    return sorted
  })

  return { searchTerm, sortMethod, results }
}
