import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'

// FSD app layer: registers TanStack Query with SSR state transfer (dehydrate on server, hydrate on client).
export default defineNuxtPlugin((nuxt) => {
  const queryClient = new QueryClient({
    // retry: 1 keeps a single transient-blip retry without making SSR (which now awaits the query
    // via suspense) hang through the default 3-attempt backoff when the backend is unreachable.
    defaultOptions: { queries: { staleTime: 5_000, retry: 1 } },
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
