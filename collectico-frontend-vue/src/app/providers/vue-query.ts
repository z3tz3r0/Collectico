import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'

// FSD app layer: registers TanStack Query with SSR state transfer (dehydrate on server, hydrate on client).
export default defineNuxtPlugin((nuxt) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 5_000 } },
  })
  nuxt.vueApp.use(VueQueryPlugin, { queryClient })

  const vueQueryState = useState<unknown>('vue-query')
  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }
  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }
})
