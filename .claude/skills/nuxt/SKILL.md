---
name: nuxt
description: Nuxt 4 patterns for the Collectico frontend. SSR/SSG/hybrid rendering via routeRules, useFetch/useAsyncData/$fetch data fetching, useState SSR-safe state, Nitro server routes (server/api, defineEventHandler, createError), SEO with useHead/useSeoMeta, and Feature-Sliced Design layout. Pairs Nuxt with a separate Express + socket.io backend and Vuetify + ofetch. Activate on any nuxt.config edit, work under app/ or server/, or any Nuxt routing, rendering, data-fetch, or deployment task.
origin: ECC
---

# Nuxt 4 (Collectico)

Project skill for migrating the Collectico frontend to Nuxt 4. The app is universal-rendered Vue 3, talks to a separate Express + socket.io backend, styles with Vuetify, and fetches with ofetch (`$fetch` wraps it). The layout follows Feature-Sliced Design (FSD), so Nuxt's reserved `app/` and `pages/` dirs are remapped (see the FSD section).

Verified live 2026-06-13: nuxt 4.4.8, vue 3.5.38, @pinia/nuxt 0.11.3, @nuxt/image 2.0.0, @nuxtjs/seo 5.3.0, @tanstack/vue-query 5.101.0, ofetch 1.5.1, socket.io-client 4.8.3. Nuxt 4 ships vue-router v5 internally (do not add a standalone vue-router). Nuxt 3 is EOL 2026-07-31. Nuxt 5 (Nitro v3 / h3 v2) is planned, not released, so prefer the new Web-API error naming (`status` / `statusText`) to avoid a future migration.

## When to Use

- Editing `nuxt.config.ts`, `app.config.ts`, or `.env` runtime config.
- Adding or changing anything under `app/` (pages, layouts, middleware, plugins) or `server/`.
- Choosing a rendering strategy: universal SSR, SPA, static SSG, or per-route hybrid.
- Writing data fetching: `useFetch`, `useAsyncData`, `$fetch`, lazy variants, caching, transform/pick.
- Building Nitro server routes (`server/api`, `defineEventHandler`, `createError`).
- Calling the external Express backend with SSR cookie passthrough, or wiring the client-only socket.io connection.
- SEO and meta tags (`useHead`, `useSeoMeta`, dynamic per-page meta, a real 404).
- Registering modules (`@nuxt/image`, `@pinia/nuxt`, `@nuxtjs/seo`).
- Deploying to a free static host or a node-server / edge preset.
- Applying Feature-Sliced Design on top of Nuxt's opinionated dirs.

## Directory Convention

Nuxt 4 sets `srcDir` to `app/` by default, so framework files live at `app/pages/`, `app/layouts/`, `app/middleware/`, `app/plugins/`, `app/app.config.ts`. `nuxt.config.ts` and `server/` stay at the project root. The FSD section below overrides `srcDir` to `src/` and remaps `dir.pages` / `dir.layouts` into an FSD `app` layer, so examples here use the default `app/` paths unless the FSD context is explicit.

## Rendering Modes

### Universal rendering (SSR) is the default

Server renders HTML, then the same code re-runs on the client to attach listeners (hydration). Best for SEO and first paint. Needs a running Node or edge server. This is Collectico's default for the public marketplace and auction pages.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // default, can omit
})
```

```vue
<script setup lang="ts">
const counter = ref(0)                        // runs on server AND client
const increment = () => { counter.value++ }   // fires client-side only
</script>
<template>
  <div>
    <p>Count: {{ counter }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>
```

### Client-side rendering (SPA)

Browser builds the DOM from JS. No server-compat concerns (free use of `window`), cheap static hosting, but slow first paint and poor SEO. Reserve for back-office or admin views that do not need indexing.

```ts
// nuxt.config.ts
export default defineNuxtConfig({ ssr: false })
```

Add `app/spa-loading-template.html` to show a loader until hydration completes.

### Static SSG (prerender), the free-tier path

A prerendered route is plain HTML written to `.output/public/` with no server runtime, so it drops onto any static CDN (GitHub Pages, Cloudflare Pages, Netlify free) at zero compute cost. Two ways to produce it:

- `nuxt generate`: SSG with `ssr: true`. Prerenders every route, emits `200.html` and `404.html` fallbacks.
- `nuxt build --prerender`: normal build that prerenders only the routes you mark.

```ts
// nuxt.config.ts: pin specific routes to static build output
export default defineNuxtConfig({
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/sitemap.xml': { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,                 // follow NuxtLink/<a> to discover routes
      routes: ['/rss.xml'],             // routes the crawler cannot find
      ignore: ['/admin'],               // exclude
    },
  },
})
```

Register routes at render time when the URL is data-derived:

```vue
<script setup lang="ts">
// inside a page that knows about other URLs to prerender
prerenderRoutes(['/auction/featured', '/auction/ending-soon'])
</script>
```

Pull the route list from the backend before prerender (build-time hook):

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  hooks: {
    async 'prerender:routes'(ctx) {
      const lots = await $fetch<{ slug: string }[]>('https://api.collectico.dev/lots')
      for (const lot of lots) ctx.routes.add(`/auction/${lot.slug}`)
    },
  },
})
```

### Hybrid rendering, per-route strategies via routeRules

One app, different strategy per route. `isr` / `swr` routes emit `_payload.json` for cached client navigation. Not available under `nuxt generate`, those rules need a server or edge runtime.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/':            { prerender: true },   // static at build (free-hostable)
    '/auction':     { swr: 60 },           // server-cached, revalidate after 60s
    '/auction/**':  { swr: 3600 },         // TTL in seconds
    '/blog':        { isr: 3600 },         // CDN incremental regen (Vercel/Netlify)
    '/blog/**':     { isr: true },
    '/admin/**':    { ssr: false },        // ship as client-only SPA
    '/api/**':      { cors: true },
    '/old-lot':     { redirect: '/auction' },
  },
})
```

| Rule | Effect |
|---|---|
| `prerender: true` | static HTML at build time (the free static-host option) |
| `ssr: false` | client-only render for the route |
| `swr: number\|boolean` | server-cached, background regen, number is TTL seconds |
| `isr: number\|boolean` | CDN incremental regen (Vercel/Netlify), number is TTL |
| `redirect: string` | server-side redirect |
| `cors: boolean` / `headers: {}` | inject CORS / custom headers |
| `appMiddleware` / `appLayout` | control middleware / layout per route |

Takeaway for free hosting: keep routes on `prerender: true` (or run `nuxt generate`). Reserve `swr` / `isr` / `ssr` rules for routes that genuinely need a runtime, since they disqualify pure-static hosting.

## File-based Routing and Pages

`app/pages/` is optional (a bare `app.vue` works alone). Each file becomes a route. Render the matched page with `<NuxtPage />`. Every page needs a single root element for transitions.

```vue
<!-- app/app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

### Dynamic, optional, and catch-all routes

```text
app/pages/index.vue                  -> /
app/pages/auction/[slug].vue         -> /auction/derby-1957
app/pages/users-[group]/[id].vue     -> /users-admins/123
app/pages/[[slug]]/index.vue         -> matches / and /anything (optional)
app/pages/[...path].vue              -> /a/b/c  (params.path = ['a','b','c'])
```

```vue
<!-- app/pages/auction/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const { data: lot } = await useFetch(`/api/lots/${route.params.slug}`)
</script>
<template><h1>{{ lot?.title }}</h1></template>
```

### Nested routes and route groups

A parent file plus a same-named dir, with `<NuxtPage>` inside the parent, nests children.

```text
app/pages/account.vue                -> renders <NuxtPage /> for children
app/pages/account/orders.vue         -> /account/orders, nested under /account
app/pages/(marketing)/about.vue      -> /about  (group name does not affect URL)
```

### definePageMeta

A compiler macro, so it takes static values only (no reactive data or side-effect calls).

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'auction',
  middleware: ['auth'],
  alias: ['/lots'],
  key: route => route.fullPath,
  keepalive: true,
  validate: route => /^\d+$/.test(route.params.id as string),
})
</script>
```

Augment the typed `PageMeta` for custom keys:

```ts
// index.d.ts
declare module '#app' {
  interface PageMeta { pageType?: 'auction' | 'marketing' }
}
export {}
```

Client- or server-only pages: `page.client.vue` (skips SSR) and `page.server.vue` (server component, dropped from the client bundle).

## Layouts and Navigation

Layouts live in `app/layouts/`, load async, and need a single root element. Page content renders at `<slot />`. Enable them by wrapping `<NuxtPage>` in `<NuxtLayout>` (shown in `app.vue` above).

```vue
<!-- app/layouts/default.vue -->
<template>
  <v-app>
    <AppHeader />
    <v-main><slot /></v-main>
  </v-app>
</template>
```

Pick a named layout (kebab-cased filename) per page:

```vue
<script setup lang="ts">
definePageMeta({ layout: 'auction' }) // app/layouts/auction.vue
</script>
```

Switch the layout at runtime, or pass typed props (Nuxt 4.4+):

```vue
<script setup lang="ts">
definePageMeta({ layout: false })
function showCustom() { setPageLayout('panel', { sidebar: true, title: 'Dashboard' }) }
</script>
```

```vue
<!-- app/layouts/panel.vue -->
<script setup lang="ts">
const props = defineProps<{ sidebar?: boolean; title?: string }>()
</script>
```

### NuxtLink

Renders an `<a>` and, after hydration, navigates in JS. Auto-prefetches the linked page's components and payload when the link enters the viewport.

```vue
<template>
  <nav>
    <NuxtLink to="/auction">Auctions</NuxtLink>
    <NuxtLink :to="`/auction/${lot.slug}`">{{ lot.title }}</NuxtLink>
  </nav>
</template>
```

### navigateTo

Programmatic navigation. Always `await` it or `return` it.

```vue
<script setup lang="ts">
const query = ref('')
function search() {
  return navigateTo({ path: '/auction', query: { q: query.value } })
}
</script>
```

Read the current route or router with `useRoute()` / `useRouter()` in `<script setup>`.

## Route Middleware

Files in `app/middleware/`, defined with `defineNuxtRouteMiddleware`. Use the `to` / `from` arguments for route data, do not call `useRoute()` inside middleware.

Three kinds: inline (in `definePageMeta`), named (a file referenced by a page), global (`.global` suffix, runs on every route change).

```ts
// app/middleware/auth.ts  (named)
export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession() // example composable
  if (!loggedIn.value) return navigateTo('/login')
})
```

```vue
<script setup lang="ts">
definePageMeta({ middleware: 'auth' }) // or an array: ['auth', inlineGuard]
</script>
```

Return values control navigation:

- nothing: continue
- `navigateTo('/')`: redirect (302 server-side), `{ redirectCode: 301 }` for a custom status
- `abortNavigation()`: stop, `abortNavigation(error)`: reject with an error

Ordering: global middleware runs first, alphabetical by filename, then page-defined in array order. Prefix to force order: `01.setup.global.ts`, `02.analytics.global.ts`. Register dynamically from a plugin with `addRouteMiddleware('name', fn, { global: true })`.

## Config: three distinct files

| Concern | File | Scope | Env override | Reactive at runtime | Secrets? |
|---|---|---|---|---|---|
| build/server, route rules, modules, nitro, ssr flag | `nuxt.config.ts` | build-time | n/a | no | n/a |
| runtime values (private + public) | `runtimeConfig` in `nuxt.config.ts` | server + client (public) | yes (`NUXT_*`) | public is reactive on client | private keys server-only |
| public build-time app settings (theme, flags) | `app/app.config.ts` | client bundle | no | yes (HMR + update) | never |

### runtimeConfig

Private keys are server-only. `public` keys serialize into the page payload (client-visible). Override at runtime with `NUXT_`-prefixed env vars.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    sessionSecret: '',                 // server only
    public: {
      apiBase: 'https://api.collectico.dev',  // Express backend
      socketUrl: 'https://api.collectico.dev', // socket.io endpoint
    },
  },
})
```

```ini
# .env  (NUXT_ prefix, UPPER_SNAKE path)
NUXT_SESSION_SECRET=replace_me
NUXT_PUBLIC_API_BASE=https://api.collectico.dev
NUXT_PUBLIC_SOCKET_URL=https://api.collectico.dev
```

```ts
// client component: only .public is available
const config = useRuntimeConfig()
config.public.apiBase            // ok
// config.sessionSecret          // undefined on client

// server route: pass event so per-request env overrides apply
export default defineEventHandler((event) => {
  const { sessionSecret } = useRuntimeConfig(event)
})
```

Type it (serializable data only):

```ts
declare module 'nuxt/schema' {
  interface RuntimeConfig { sessionSecret: string }
  interface PublicRuntimeConfig { apiBase: string; socketUrl: string }
}
export {}
```

### app.config.ts

Public, build-fixed, reactive (HMR + runtime update). Cannot be overridden by env vars. Never put secrets here, it ships in the client bundle. Good for Vuetify theme tokens and feature flags.

```ts
// app/app.config.ts
export default defineAppConfig({
  theme: { primary: '#1867C0' },
  features: { liveBidding: true },
})
```

```vue
<script setup lang="ts">
const appConfig = useAppConfig()
updateAppConfig({ theme: { primary: '#000000' } }) // reactive update
</script>
```

Use `runtimeConfig` for values that change per environment or deploy (API URLs, secrets). Use `app.config.ts` for public, build-fixed, reactive settings.

## Data Fetching

### Pick the right tool

| Tool | What it is | SSR-safe | Use for |
|---|---|---|---|
| `$fetch` | global wrapper around ofetch | no (no hydration de-dupe) | event-driven client calls: form submits, button clicks, POST/PUT/DELETE mutations |
| `useFetch` | composable wrapping `$fetch` + `useAsyncData`, URL-first | yes | initial component/page data from a URL, the default choice |
| `useAsyncData` | composable wrapping any async fn, handler-first | yes | custom async logic: SDK clients, GraphQL, combining multiple `$fetch` calls into one payload entry |

`useFetch(url, opts)` is sugar for `useAsyncData(url, () => $fetch(url, opts), opts)`.

### Avoid the hydration double-fetch

Bare `$fetch` for initial render runs once on the server and again on the client during hydration. `useFetch` / `useAsyncData` forward the server result through the payload so the client does not refetch. Use them for anything rendered on first paint, use `$fetch` only for interactions.

```vue
<script setup lang="ts">
// initial data: SSR-safe, no double fetch
const { data: lots, status, error, refresh } = await useFetch('/api/lots')

// mutation on a button click: plain $fetch is correct here
async function placeBid(lotId: string, amount: number) {
  await $fetch(`/api/lots/${lotId}/bids`, { method: 'POST', body: { amount } })
  await refresh()
}
</script>
```

### useAsyncData for custom logic

```vue
<script setup lang="ts">
const route = useRoute()
const { data: lot } = await useAsyncData(
  `lot-${route.params.slug}`,           // explicit key for sharing across components
  () => $fetch(`/api/lots/${route.params.slug}`),
)
</script>
```

Do not run side effects (Pinia mutations) inside `useAsyncData`, use `callOnce` instead.

### Options that matter

`transform` and `pick` shrink the payload that crosses to the client. They reduce serialized size, they do not skip the fetch.

```ts
const { data: lot } = await useFetch('/api/lots/everest', {
  pick: ['title', 'currentBid'],
})

const { data: lots } = await useFetch('/api/lots', {
  transform: rows => rows.map(r => ({ id: r.id, title: r.title })),
})
```

Reactive keys and `watch` re-run the fetch:

```ts
const id = ref(1)
const { data } = await useFetch('/api/lots', { query: { id }, watch: [id] })
// changing id.value refetches automatically
```

`lazy` does not block navigation, drive the UI off `status`:

```ts
const { data, status } = useLazyFetch('/api/lots') // status: idle | pending | success | error
```

`immediate: false` defers until you call `execute()`. `server: false` makes it client-only (skips SSR fetch, runs on client navigation). `default: () => []` supplies a fallback so `data` is not `null` while lazy. `dedupe: 'cancel'` (default) cancels an in-flight request on a new one, `'defer'` keeps the existing one. `deep: true` switches `data` from a `shallowRef` to deep reactivity when you mutate nested fields.

### Return object

```ts
const { data, status, error, refresh, execute, clear, pending } = useFetch('/api/lots')
// status: 'idle' | 'pending' | 'success' | 'error'
// refresh()/execute(): re-run · clear(): reset to idle
```

### Caching and avoiding refetch on back-navigation

The payload carries server-fetched data to the client. The default resolver reads `nuxtApp.payload.data[key]` during hydration and `nuxtApp.static.data[key]` on client navigation. Provide `getCachedData` for custom caching, gate on `ctx.cause` so manual `refresh()` still hits the network.

```ts
const { data } = await useFetch('/api/lots', {
  key: 'lots',
  getCachedData(key, nuxtApp, ctx) {
    if (ctx.cause === 'refresh:manual') return // force network on explicit refresh
    return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
  },
})
```

Read cached data elsewhere with `useNuxtData(key)` (list-to-detail prefill, optimistic UI). Invalidate with `refreshNuxtData(key?)` and `clearNuxtData(key?)`.

### Serialization caveat

`useAsyncData` payload uses `devalue`, so `Date`, `Map`, `Set`, `RegExp`, and refs survive. A `server/api` response is `JSON.stringify`-only, define `toJSON()` for non-JSON types:

```ts
export default defineEventHandler(() => ({
  endsAt: new Date(),
  toJSON() { return { endsAt: this.endsAt.toISOString() } },
}))
```

## SSR-safe State (useState)

Never `export const state = ref()` at module scope. On the server that ref is one shared instance across all concurrent requests, so one user's data leaks into another's and it leaks memory. `useState` is the SSR-safe replacement, keyed and preserved through hydration.

```ts
// signature
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

```ts
// app/composables/useColor.ts  (auto-imported, type-safe global state)
export const useColor = () => useState<string>('color', () => 'pink')
```

```vue
<script setup lang="ts">
const counter = useState('counter', () => Math.round(Math.random() * 1000))
</script>
```

Async server-side init (the Nuxt 2 `nuxtServerInit` replacement), in `app.vue`:

```vue
<script setup lang="ts">
const config = useState('config')
await callOnce(async () => {
  config.value = await $fetch('https://api.collectico.dev/site-config')
})
</script>
```

`useState` values serialize to JSON, no classes or functions. For large rarely-mutated objects pair with `shallowRef`: `useState('big', () => shallowRef({ deep: 'not reactive' }))`.

Note: with `@pinia/nuxt` installed, prefer Pinia stores for domain state and reserve `useState` for small cross-component primitives.

## Nitro Server Routes

Nitro (built by the UnJS/Nuxt team, on h3) compiles `server/` into a standalone `.output` server that runs on Node, serverless, and edge. Files auto-register by path.

```text
server/api/        -> routes under /api   (server/api/hello.ts -> /api/hello)
server/routes/     -> routes without /api (server/routes/sitemap.xml.ts -> /sitemap.xml)
server/middleware/ -> runs on every request
server/plugins/    -> Nitro lifecycle hooks
server/utils/      -> auto-imported, also importable via #server alias
```

### Handlers and method matching

```ts
// server/api/lots.get.ts
export default defineEventHandler((event) => {
  return [{ id: 1, title: 'Derby 1957' }] // object/array -> auto JSON
})

// server/api/lots.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return { created: true, ...body }
})
```

### Dynamic, query, params, cookies

```ts
// server/api/lots/[slug].ts
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const { page } = getQuery(event)        // /api/lots/x?page=2
  const cookies = parseCookies(event)
  const url = getRequestURL(event)
  return { slug, page }
})
```

### Server middleware

Runs before route handlers, must not return a response, only mutate `event.context` or headers.

```ts
// server/middleware/auth.ts
export default defineEventHandler((event) => {
  event.context.auth = { userId: 123 } // read later via event.context.auth
})
```

### Errors

```ts
export default defineEventHandler(async (event) => {
  const lot = await findLot(getRouterParam(event, 'slug'))
  if (!lot) {
    throw createError({ status: 404, statusText: 'Lot Not Found' })
  }
  return lot
})
```

Uncaught errors become 500. Keep `statusText` short and ASCII (it reaches the client), put detail in `message` or `data`. Set status without throwing via `setResponseStatus(event, 202)`.

### Runtime config on the server

Pass `event` so per-request env overrides apply:

```ts
export default defineEventHandler(async (event) => {
  const { sessionSecret } = useRuntimeConfig(event)
  // ...
})
```

Nitro plugins use `defineNitroPlugin((nitroApp) => { ... })`.

## Calling the External Express + socket.io Backend

In the browser, fetch attaches cookies automatically. During SSR the Nuxt server makes the call, and for security Nuxt does not auto-attach the incoming user's cookies to an outbound `$fetch`. Forward them so Express sees the authenticated session.

### useRequestFetch, the cleanest passthrough

Returns a `$fetch` instance pre-bound with the incoming request's headers (cookies included). `useFetch` already uses it internally for relative URLs, call it explicitly for the external absolute backend URL.

```vue
<script setup lang="ts">
const config = useRuntimeConfig()
const requestFetch = useRequestFetch()
const { data: me } = await useAsyncData('me', () =>
  requestFetch(`${config.public.apiBase}/me`),   // forwards cookies on SSR
)
</script>
```

On the client it behaves like regular `$fetch`. It never forwards `host`, `accept`, `connection`, `transfer-encoding`, and similar hop-by-hop headers.

### useRequestHeaders for selective forwarding

```vue
<script setup lang="ts">
const config = useRuntimeConfig()
const { data } = await useFetch(`${config.public.apiBase}/confidential`, {
  headers: useRequestHeaders(['cookie']),  // forward only the cookie header
})
</script>
```

On the client `useRequestHeaders()` returns `{}` (the browser attaches cookies natively, use `credentials: 'include'` for cross-origin).

### Relaying Set-Cookie from backend to browser

If Express issues a `Set-Cookie` during SSR (login or refresh), relay it with `$fetch.raw` plus `appendResponseHeader`:

```ts
// server/utils/proxy-cookie.ts
import type { H3Event } from 'h3'
export const fetchWithCookie = async <T>(event: H3Event, url: string): Promise<T> => {
  const res = await $fetch.raw<T>(url)
  for (const cookie of res.headers.getSetCookie()) {
    appendResponseHeader(event, 'set-cookie', cookie)
  }
  return res._data as T
}
```

### Cross-origin requirements (Express side)

Express must set `cors({ credentials: true, origin: <nuxt-origin> })` and issue cookies with `SameSite=None; Secure` for cross-site requests, so the browser stores and resends them.

### socket.io is client-only

The realtime socket is browser-only, open it in a `.client.ts` plugin, never during SSR. The browser attaches cookies to the WS handshake when `withCredentials: true` and Express allows the origin with credentials. SSR cookie forwarding above concerns only the HTTP REST calls.

```ts
// app/plugins/socket.client.ts
import { io } from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const socket = io(config.public.socketUrl, {
    autoConnect: true,
    withCredentials: true,
  })
  return { provide: { socket } }   // useNuxtApp().$socket
})
```

```vue
<script setup lang="ts">
const { $socket } = useNuxtApp()
onMounted(() => {
  $socket.on('bid:new', payload => { /* update local state */ })
})
onBeforeUnmount(() => $socket.off('bid:new'))
</script>
```

## SEO and Meta

### Static defaults in nuxt.config (non-reactive)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Collectico',
      htmlAttrs: { lang: 'en' },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
```

Nuxt adds `charset` and `viewport` by default. `app.head` takes static values only.

### useSeoMeta, the type-safe choice

Prevents the `name` vs `property` mistake (OG tags use `property`).

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Collectico',
  ogTitle: 'Collectico',
  description: 'Live auctions for collectors.',
  ogDescription: 'Live auctions for collectors.',
  ogImage: 'https://collectico.dev/og.png',
  twitterCard: 'summary_large_image',
})
</script>
```

`useServerSeoMeta` is the server-only variant (no client cost) when values never change client-side.

### useHead and title templates

```vue
<script setup lang="ts">
useHead({
  titleTemplate: titleChunk => titleChunk ? `${titleChunk} · Collectico` : 'Collectico',
  bodyAttrs: { class: 'app' },
})
</script>
```

### Dynamic per-page meta from fetched data

Fetch first, derive meta with getters so it stays reactive, and throw a real 404 when nothing comes back.

```vue
<!-- app/pages/auction/[slug].vue -->
<script setup lang="ts">
const route = useRoute()
const { data: lot } = await useFetch(`/api/lots/${route.params.slug}`)

if (!lot.value) {
  throw createError({ status: 404, statusText: 'Lot Not Found' })
}

useSeoMeta({
  title: () => lot.value!.title,
  description: () => lot.value!.summary,
  ogTitle: () => lot.value!.title,
  ogImage: () => lot.value!.imageUrl,
  twitterCard: 'summary_large_image',
})
</script>
```

### Real 404 and the error page

`createError` moved to Web-API field names in Nuxt 4.3. `status` / `statusText` are current, `statusCode` / `statusMessage` still work but are deprecated ahead of Nuxt 5, prefer the new names. Thrown server-side it renders the full error page (or JSON for `Accept: application/json`), thrown client-side it needs `fatal: true` to force the error page.

```vue
<!-- error.vue  (project root, NOT under pages/) -->
<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps({ error: Object as () => NuxtError })
const handleError = () => clearError({ redirect: '/' })
</script>
<template>
  <div>
    <h1>{{ error?.statusCode }}</h1>
    <p>{{ error?.statusMessage }}</p>
    <button @click="handleError">Back home</button>
  </div>
</template>
```

Related: `clearError({ redirect })`, `useError()`, `<NuxtErrorBoundary>` for scoped non-fatal handling.

## Modules

Register modules in the `modules: []` array. `npx nuxt module add <name>` installs the dep and edits the array.

### @pinia/nuxt

```bash
npx nuxi@latest module add pinia   # installs @pinia/nuxt + pinia
```

```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  pinia: { storesDirs: ['./app/stores/**'] }, // or FSD model segments, see below
})
```

Auto-imports `defineStore`, `storeToRefs`, `acceptHMRUpdate`. No manual `app.use(createPinia())`, the module wires it including SSR state transfer.

### @nuxt/image

```bash
npx nuxt module add image
```

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: { /* provider, screens, presets */ },
})
```

```vue
<template>
  <NuxtImg src="/lots/derby.jpg" width="640" loading="lazy" />
  <NuxtPicture src="/lots/derby.jpg" />
</template>
```

### @nuxtjs/seo

A meta-module that installs robots, sitemap, link-checker, og-image, schema-org, seo-utils, and site-config in one go.

```bash
npx nuxi module add @nuxtjs/seo
```

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],
  site: { url: 'https://collectico.dev', name: 'Collectico' },
})
```

### Vuetify note

Vuetify ships its own Nuxt module (`vuetify-nuxt-module`) or is wired through a plugin with `vite-plugin-vuetify` for treeshaking. Either way it registers under `modules: []` or `app/plugins/`, and theme tokens belong in `app.config.ts` so they stay reactive.

## Deployment

### Commands

- `nuxt dev`: dev server on port 3000 (`-o` to open the browser).
- `nuxt build`: server build to `.output/`, default Node preset.
- `nuxt generate`: full static SSG to `.output/public/`.
- `nuxt preview`: preview a production build locally.

Hybrid `swr` / `isr` route rules need `nuxt build` plus a runtime, they are not available under `nuxt generate`.

### Static prerender to a free host

```bash
nuxt generate
# upload .output/public/ to GitHub Pages, Cloudflare Pages, Netlify free, etc.
```

GitHub Pages subpath site (`<user>.github.io/<repo>/`):

```bash
NUXT_APP_BASE_URL=/collectico/ npx nuxt build --preset github_pages
# CI: NUXT_APP_BASE_URL="/${GITHUB_REPOSITORY##*/}/", upload ./.output/public via actions/deploy-pages
```

Leave the base URL empty for a user or org root site.

### Node server preset (default)

```ts
export default defineNuxtConfig({ nitro: { preset: 'node-server' } })
```

```bash
NODE_ENV=production node .output/server/index.mjs
```

Runtime env: `NITRO_PORT` / `PORT` (3000), `NITRO_HOST` / `HOST` (0.0.0.0). Cluster mode: `NITRO_PRESET=node_cluster nuxt build`. Always set `NODE_ENV=production`.

### Edge presets

`cloudflare_module` is the recommended Cloudflare preset (Workers, zero-config), `cloudflare_pages` still works (emits `_routes.json`). Set via `nitro.preset` or `NITRO_PRESET=...`. Disable Cloudflare Rocket Loader and Email Obfuscation to avoid hydration errors. Full list at nitro.build/deploy.

## Feature-Sliced Design on Nuxt

FSD layers (`app`, `pages`, `widgets`, `features`, `entities`, `shared`) collide with Nuxt's reserved `app/` and `pages/`. The fix: set `srcDir: 'src/'`, remap Nuxt's routing dirs into the FSD `app` layer, and re-alias `@` / `~` to the FSD root.

```ts
// nuxt.config.ts
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  srcDir: 'src/',                       // FSD root
  dir: {
    pages: 'app/routes',                // file-based routing lives at src/app/routes
    layouts: 'app/layouts',             // src/app/layouts
  },
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
    '~': fileURLToPath(new URL('./src', import.meta.url)),
  },
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxtjs/seo'],
  pinia: {
    storesDirs: ['./src/entities/**/model/**', './src/features/**/model/**'],
  },
})
```

Resulting structure:

```text
src/
  app/                  # FSD app layer == Nuxt app dir
    routes/             # dir.pages -> file-based routing
    layouts/            # dir.layouts
    plugins/            # vue-query.ts, socket.client.ts, ...
    router.options.ts   # custom router options (scrollBehavior, etc.)
    styles/main.css
  pages/                # FSD pages layer (compositions), NOT Nuxt routing
  widgets/
  features/   .../model # pinia stores
  entities/   .../model # pinia stores
  shared/     ui | lib | api | config
```

The naming clash to document in the README: FSD's `pages` layer (page compositions) is distinct from Nuxt routing, which moved to `src/app/routes` via `dir.pages`.

### Nuxt owns the app instance

You do not hand-mount `createApp` / `createRouter` / `createPinia` like a standalone Vite SPA. Nuxt owns the Vue app, its router, and (via `@pinia/nuxt`) Pinia.

- Router: customize via `src/app/router.options.ts`, not `createRouter`. Routes come from `dir.pages`.
- Pinia: registered by the module, stores live in FSD model segments through `pinia.storesDirs`.
- Vue Query: register as a plugin (the documented SSR pattern).

```ts
// src/app/plugins/vue-query.ts
import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query'
import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')
  const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => { vueQueryState.value = dehydrate(queryClient) })
  }
  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }
})
```

Plugin ordering uses filename prefixes (`01.foo.ts`) or the object form with `enforce: 'pre' | 'post'`. Client-only plugins use the `.client.ts` suffix (see the socket plugin above).

## Quick Reference

- Rendering: `ssr: true` (default SSR), `ssr: false` (SPA), `nuxt generate` (SSG), `routeRules` (hybrid). Free static host wants `prerender: true`.
- Routing: `app/pages/[slug].vue`, `[[opt]]`, `[...catch]`, `(group)`, `definePageMeta`, `<NuxtPage>`.
- Nav: `<NuxtLink to>`, `await navigateTo(...)`, `useRoute()` / `useRouter()`.
- Middleware: `app/middleware/*.ts` with `defineNuxtRouteMiddleware((to, from) => ...)`, `.global` suffix for every-route.
- Config: `runtimeConfig` (env-overridable, secrets server-only) vs `app.config.ts` (public, reactive, no secrets).
- Data: `useFetch` (URL initial data), `useAsyncData` (custom logic), `$fetch` (client interactions only). Lazy via `useLazyFetch`, shrink with `pick` / `transform`.
- State: `useState('key', () => init)`, never module-scope `ref`.
- Server: `server/api/*.{get,post}.ts`, `defineEventHandler`, `readBody`, `getRouterParam`, `getQuery`, `createError({ status, statusText })`.
- External backend: `useRequestFetch()` or `useRequestHeaders(['cookie'])` for SSR cookie passthrough, socket.io in `.client.ts` only.
- SEO: `useSeoMeta` (type-safe), `useHead` (titleTemplate), throw `createError({ status: 404 })`, root `error.vue`.
- Deploy: `nuxt generate` for free static, `node-server` preset for SSR, `cloudflare_module` for edge.

## Anti-Patterns

- Do not add a standalone `vue-router` dependency. Nuxt 4 bundles vue-router v5, customize via `app/router.options.ts`.
- Do not use bare `$fetch` for first-paint data. It double-fetches on hydration, use `useFetch` / `useAsyncData`.
- Do not `export const state = ref()` at module scope. It leaks across SSR requests, use `useState`.
- Do not assume cookies reach the Express backend during SSR. They do not unless you forward them with `useRequestFetch` / `useRequestHeaders`.
- Do not open the socket.io connection during SSR. It is browser-only, use a `.client.ts` plugin.
- Do not put secrets in `app.config.ts` or `runtimeConfig.public`. Both ship to the client.
- Do not expect `swr` / `isr` / `ssr` route rules to work under `nuxt generate`. They need a runtime.
- Do not call `useRoute()` inside route middleware. Use the `to` / `from` arguments.
- Do not return a response from `server/middleware/`. It only mutates `event.context` or headers.
- Do not hand-mount `createApp` / `createPinia` / `createRouter` in a Nuxt plugin. Nuxt owns the instance, register libs with `nuxt.vueApp.use(...)`.
- Do not put reactive data in `app.head` (nuxt.config). It is static-only, use `useHead` / `useSeoMeta`.
- Prefer `status` / `statusText` over the deprecated `statusCode` / `statusMessage` in `createError` for new code.

## Related Skills

- `ecc:nuxt4-patterns` (global ECC Nuxt patterns)
- `ecc:vite-patterns` (Nuxt builds on Vite)
- `ecc:frontend-patterns`, `ecc:frontend-a11y`
- `feature-sliced-design` (FSD layer and segment rules)
- `ecc:backend-patterns` (the Express side)
- `ecc:deployment-patterns`, `ecc:docker-patterns`
- `ecc:seo` (broader SEO workflow)
