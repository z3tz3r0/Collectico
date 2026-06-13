---
name: vue
description: Vue 3 core engineering reference covering the Composition API, <script setup>, reactivity (ref/reactive/computed/watch), Pinia stores, vue-router, vue-query server state, and Feature-Sliced Design layout. Activates when editing .vue single-file components or doing Vue 3 work (reactivity, composables, provide/inject, slots, built-in components, routing, state management, Vue testing). Framework-core only, no Nuxt content.
origin: ECC
---

# Vue 3 Core

Idiomatic Vue 3 with the Composition API and `<script setup>`, for a Feature-Sliced Design (FSD) frontend backed by Pinia, vue-router, and `@tanstack/vue-query`.

Pinned versions (live-checked 2026-06-13 via npm registry): `vue@3.5.38`, `vue-router@5.1.0`, `pinia@3.0.4`, `@tanstack/vue-query@5.101.0`, `vite@8.0.16`, `create-vue@3.22.3`, `ofetch@1.5.1`. Vue Router 5.0 folded file-based routing into core with no breaking changes for Router 4 users, so all Router 4 APIs below stay valid. Version tags (3.3+, 3.4+, 3.5+) mark when each API landed.

## When to Use

- Editing or creating any `.vue` single-file component (SFC).
- Writing reactivity logic: `ref`, `reactive`, `computed`, `watch`, `watchEffect`, shallow variants.
- Authoring `<script setup>` components: `defineProps`, `defineEmits`, `defineModel`, `withDefaults`, lifecycle hooks.
- Extracting reusable logic into composables (`useXxx`), the FSD `model` segment.
- Wiring Pinia stores, vue-router routes and guards, or vue-query queries and mutations.
- Working with slots, `v-model` on components, dynamic components, or built-ins (`Transition`, `Teleport`, `Suspense`, `KeepAlive`).
- Typing Vue code, profiling Vue performance, or testing with Vitest plus `@vue/test-utils`.
- Placing Vue artifacts into FSD layers and segments (`ui`/`model`/`api`/`lib`/`config`).

Scaffold new Vue apps with `bun create vue@latest` (the official `create-vue` CLI), never a hand-written `package.json` or `vite.config`. This skill is framework-core. For Nuxt, see the sibling `nuxt` skill.

## Reactivity

Vue 3 reactivity is built on `ref` (the primary API) and `reactive` (a deep `Proxy`). `ref` intercepts `.value` access to track reads and trigger re-renders.

### ref and the .value rule

```ts
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0, mutate via .value in JS
count.value++

// Ref auto-unwraps only for TOP-LEVEL bindings in the template render context.
const object = { id: ref(1) }
// {{ count + 1 }}      -> 1            (top-level, unwrapped)
// {{ object.id + 1 }}  -> [object Object]1  (NOT top-level)
// Fix: const { id } = object  so `id` is top-level.
```

### reactive and its caveats

`reactive` needs no `.value` but has hard limits. Prefer `ref` and reach for `reactive` only for grouped object state.

```ts
import { reactive, toRefs } from 'vue'

const state = reactive({ count: 0 })
state.count++ // works

// CAVEATS:
// 1. Object types only (objects, arrays, Map, Set). No primitives.
// 2. Reassignment breaks reactivity: `state = reactive({...})` loses the binding.
// 3. Destructuring drops reactivity: `let { count } = state` detaches from state.count.
//    Use toRefs to keep it reactive.
const { count } = toRefs(state) // count is now a synced Ref<number>
// 4. Proxy identity: reactive(raw) !== raw. Only mutate the proxy, never the raw object.
```

| Feature | `ref()` | `reactive()` |
|---|---|---|
| Primitives | yes | no |
| `.value` in JS | yes | no |
| Reassignable, keeps reactivity | yes | no |
| Destructure-safe | no (use `toRefs`) | no (use `toRefs`) |
| Recommendation | primary API | secondary, grouped state |

### Deep reactivity and ref unwrapping

Both `ref` and `reactive` are deep by default. A `ref` nested in a deep reactive object auto-unwraps. Arrays and collections do not unwrap.

```ts
const count = ref(0)
const state = reactive({ count })
state.count // 0, no .value. Setting state.count = 1 updates count.value too.

reactive([ref(1)])[0].value                       // arrays: still need .value
reactive(new Map([['k', ref(0)]])).get('k')!.value // Map: still need .value
```

### computed

Computed values are cached by reactive dependency. They re-evaluate only when a dependency changes, unlike methods which run every render. Getters must be side-effect free.

```ts
import { computed, ref } from 'vue'

const firstName = ref('Jane')
const lastName = ref('Doe')

const fullName = computed(() => `${firstName.value} ${lastName.value}`)

// Writable computed (getter + setter).
const editableName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (v) => { [firstName.value, lastName.value] = v.split(' ') },
})

// Previous value in getter (3.4+).
const clamped = computed((prev) => (count.value <= 3 ? count.value : prev))
```

### watch vs watchEffect

`watch` is lazy with explicit sources. `watchEffect` runs immediately and auto-tracks any reactive dep accessed synchronously inside it. Deps accessed after `await` are NOT tracked.

```ts
import { watch, watchEffect, onWatcherCleanup } from 'vue'

// watch: a reactive object PROPERTY must be passed as a getter.
watch(count, (newC, oldC) => {})
watch(() => obj.count, (c) => {})
watch([count, () => obj.count], ([nc, no]) => {})
watch(obj, cb, { deep: true })            // 3.5+: bounded depth { deep: 2 }
watch(count, cb, { immediate: true })     // eager
watch(count, cb, { once: true })          // 3.4+

// watchEffect: tracks todoId, NOT anything after the await.
watchEffect(async () => {
  const res = await fetch(`/api/todos/${todoId.value}`)
  data.value = await res.json()
})

// Cleanup (3.5+, must be called synchronously before any await).
watch(id, (newId) => {
  const c = new AbortController()
  fetch(`/api/${newId}`, { signal: c.signal })
  onWatcherCleanup(() => c.abort())
})
```

Flush timing controls when the callback runs relative to the DOM update.

| flush | Runs | Alias |
|---|---|---|
| `'pre'` (default) | before the owner component's DOM update | |
| `'post'` | after DOM update, reads updated DOM | `watchPostEffect()` |
| `'sync'` | synchronously, no batching, use sparingly | `watchSyncEffect()` |

Watchers created synchronously in `setup` auto-stop on unmount. Watchers created in async callbacks (inside `setTimeout`) do NOT auto-stop, capture the returned `stop` and call it.

### Shallow and advanced reactivity

```ts
import {
  shallowRef, triggerRef, customRef, shallowReactive,
  toRaw, markRaw, readonly,
} from 'vue'

const s = shallowRef({ count: 1 })
s.value.count = 2     // NOT reactive (only .value reassignment is)
s.value = { count: 2 } // reactive
triggerRef(s)         // force-trigger after a deep mutation of a shallowRef

// shallowReactive: only root-level props reactive, nested not converted.
const sr = shallowReactive({ nested: { a: 1 } })

// toRaw: escape hatch to the original object. markRaw: permanently exclude from reactivity.
const raw = toRaw(state)
const frozen = markRaw(new SomeThirdPartyClass())

// readonly: deep, tracks reads, blocks and warns on writes. Mutate the original to trigger.
const original = reactive({ count: 0 })
const copy = readonly(original)
original.count++ // triggers watchers on copy. copy.count++ warns and no-ops.
```

A debounced `customRef`, the classic full-control pattern:

```ts
function useDebouncedRef<T>(value: T, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>
  return customRef<T>((track, trigger) => ({
    get() { track(); return value },
    set(v) {
      clearTimeout(timeout)
      timeout = setTimeout(() => { value = v; trigger() }, delay)
    },
  }))
}
```

### Reactivity utilities

```ts
import { toRef, toRefs, toValue, isRef, unref } from 'vue'

const fooRef = toRef(state, 'foo')      // ref synced bidirectionally with state.foo
const refs = toRefs(state)              // whole reactive object -> object of synced refs

// Pass a prop reactively into a composable (3.3+ getter normalization).
useFeature(toRef(() => props.foo))

// toValue (3.3+): normalizes value | ref | getter -> plain value.
// Pairs with the MaybeRefOrGetter<T> composable input type.
function useTitle(source: MaybeRefOrGetter<string>) {
  watchEffect(() => { document.title = toValue(source) })
}
```

### DOM update timing

State changes batch into one async flush per tick. Await `nextTick()` to read the updated DOM.

```ts
import { nextTick } from 'vue'
async function inc() {
  count.value++
  await nextTick() // DOM now reflects the change
}
```

## Composition API and script setup

`<script setup>` is compile-time sugar. The block re-runs per instance, and all top-level bindings (variables, functions, imports, imported components) are exposed to the template automatically.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'

const count = ref(0)
function log() { console.log(count.value) }
</script>

<template>
  <MyComponent />
  <button @click="count++">{{ count }}</button>
</template>
```

- Top-level `await` is allowed, compiles to `async setup()`, and requires a `<Suspense>` ancestor.
- `defineExpose({...})` exposes members to parent template refs (components are closed by default).
- `defineOptions({ inheritAttrs: false })` (3.3+) declares options inline.
- `defineSlots<{...}>()` (3.3+) types slots. `useSlots()` and `useAttrs()` give runtime access.
- Generics: `<script setup lang="ts" generic="T extends string | number">`.
- A plain `<script>` alongside `<script setup>` runs once at module scope.

### defineProps, defineEmits, defineModel, withDefaults

```vue
<script setup lang="ts">
interface Props { msg?: string; labels?: string[]; bar?: number }

// 3.5+: reactive props destructure. Compiler rewrites `msg` -> `props.msg`, stays reactive.
const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()

// Pre-3.5 equivalent for defaults:
// const props = withDefaults(defineProps<Props>(), {
//   msg: 'hello',
//   labels: () => ['one', 'two'], // factory for object/array defaults
// })

// Emits, tuple form (3.3+).
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()

// defineModel (3.4+): two-way v-model as a ref. Compiles to a prop + update:* event.
const model = defineModel<string>()              // default v-model
const count = defineModel<number>('count', { default: 0 }) // v-model:count
model.value = 'x'                                 // emits update:modelValue
</script>
```

`defineModel` with modifiers via the array form:

```ts
const [model, modifiers] = defineModel<string, 'capitalize'>({
  set(v) { return modifiers.capitalize ? v[0].toUpperCase() + v.slice(1) : v },
})
```

### Lifecycle hooks

Register synchronously during `setup`. None except `onServerPrefetch` run during SSR.

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const count = ref(0)
let id: ReturnType<typeof setInterval>
onMounted(() => { id = setInterval(() => count.value++, 1000) })
onUnmounted(() => clearInterval(id)) // always clean up timers and listeners
</script>
```

| Hook | Fires |
|---|---|
| `onBeforeMount` / `onMounted` | before mount (no DOM) / after DOM inserted |
| `onBeforeUpdate` / `onUpdated` | before / after a DOM patch from a reactive change |
| `onBeforeUnmount` / `onUnmounted` | before / after unmount (cleanup) |
| `onErrorCaptured` | error captured from a descendant |
| `onActivated` / `onDeactivated` | `<KeepAlive>` cached component shown / hidden |
| `onRenderTracked` / `onRenderTriggered` | dev-only render-dependency diagnostics |

## Provide and Inject

`provide` and `inject` pass data down a component tree without prop drilling. Co-locate mutations in the provider and expose an updater. Use `InjectionKey<T>` for type safety and Symbol keys to avoid collisions in large apps.

```ts
// shared/lib/injection-keys.ts
import type { InjectionKey, Ref } from 'vue'

export interface LocationContext {
  location: Ref<string>
  updateLocation: (v: string) => void
}
export const locationKey = Symbol('location') as InjectionKey<LocationContext>
```

```vue
<script setup lang="ts">
import { provide, ref, readonly } from 'vue'
import { locationKey } from '@/shared/lib/injection-keys'

const location = ref('home')
function updateLocation(v: string) { location.value = v }
// A ref passed to provide is injected as-is and stays reactive (NOT unwrapped).
provide(locationKey, { location: readonly(location) as Ref<string>, updateLocation })
</script>
```

```vue
<script setup lang="ts">
import { inject } from 'vue'
import { locationKey } from '@/shared/lib/injection-keys'

const ctx = inject(locationKey)            // type: LocationContext | undefined
const withDefault = inject(locationKey, { location: ref('home'), updateLocation: () => {} })
// App-level: app.provide(locationKey, ...)
</script>
```

## Template and Slots

### v-for, :key, and v-if precedence

```vue
<li v-for="item in items" :key="item.id">{{ item.message }}</li>
```

The `:key` must be a unique primitive (string or number, never an object). Without it, the default in-place patch reuses DOM where it sits, which corrupts component state and input values on reorder. Never put `v-if` on the same element as `v-for` (`v-if` has higher precedence and cannot see the `v-for` alias). Filter with a computed instead, and copy arrays before mutating in a computed (`return [...numbers].reverse()`).

### v-model on components

```vue
<!-- parent -->
<UserName v-model:first-name="first" v-model:last-name="last" />
<MyComponent v-model.capitalize="text" />
```

```vue
<!-- child -->
<script setup lang="ts">
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
</script>
```

### Slots and scoped slots

Slot content compiles in the PARENT's scope. Scoped slots pass child data up via `v-bind` on the `<slot>` element.

```vue
<!-- child: BaseLayout.vue -->
<template>
  <header><slot name="header">Default header</slot></header>
  <main><slot /></main>
  <footer v-if="$slots.footer"><slot name="footer" /></footer>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot name="item" v-bind="item" :text="item.body" />
    </li>
  </ul>
</template>
```

```vue
<!-- parent -->
<BaseLayout>
  <template #header><h1>Title</h1></template>
  <p>Implicit default content.</p>
  <template #item="{ body, username }">{{ body }} by {{ username }}</template>
</BaseLayout>
```

### Dynamic components

`:is` accepts a registered name string, an imported component object, or an HTML element name. Wrap in `<KeepAlive>` to preserve switched-away state.

```vue
<KeepAlive>
  <component :is="tabs[currentTab]" />
</KeepAlive>
```

## Built-in Components

### Transition and TransitionGroup

`<Transition>` animates a single element or component toggled by `v-if`, `v-show`, dynamic `<component>`, or a changing `key`. It applies six CSS classes (`v-enter-from`, `v-enter-active`, `v-enter-to`, and the `v-leave-*` trio).

```vue
<template>
  <Transition name="fade" mode="out-in">
    <component :is="activeComponent" />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
```

`<TransitionGroup>` animates insert, remove, and reorder in a `v-for` list. It renders no wrapper by default (pass `tag`), supports no modes, and requires a unique `key` per child. Set leaving items to `position: absolute` so the `*-move` (FLIP) transition computes offsets correctly. Animate `transform` and `opacity` only, never `height` or `width`, which force layout.

### Teleport

Renders part of a template into a DOM node elsewhere (usually `body`) while keeping it a logical child. Solves `position: fixed` and `z-index` breakage from an ancestor `transform`.

```vue
<Teleport to="body">
  <div v-if="open" class="modal">
    <button @click="open = false">Close</button>
  </div>
</Teleport>
<!-- :disabled="isMobile" renders inline. defer (3.5+) resolves target after the render tick. -->
```

### Suspense (experimental)

Orchestrates async dependencies in a subtree (async `setup()` or `<script setup>` top-level `await`) and shows a fallback until they resolve. The API may change. Use `onErrorCaptured` for error handling, there is no built-in error slot.

```vue
<Suspense :timeout="0">
  <Dashboard />
  <template #fallback>Loading...</template>
</Suspense>
```

### KeepAlive

Caches component instances rather than unmounting them. `include` and `exclude` match the component `name` (3.2.34+ infers it from the SFC filename). `max` caps cached instances with an LRU strategy. Cached components fire `onActivated` and `onDeactivated` instead of mount and unmount.

```vue
<KeepAlive :include="['AuctionList', 'AuctionGrid']" :max="10">
  <component :is="activeView" />
</KeepAlive>
```

## Composables

A composable is a function (`useXxx`) that extracts and reuses stateful Composition API logic. In FSD this is the `model` segment alongside Pinia stores. Return `toRefs` of a `reactive` for destructure-safe consumption, and accept `MaybeRefOrGetter` inputs normalized with `toValue`.

```ts
// features/search/model/use-debounced-search.ts
import { ref, watch, toValue, onWatcherCleanup, type MaybeRefOrGetter } from 'vue'

export function useDebouncedSearch(query: MaybeRefOrGetter<string>, delay = 300) {
  const results = ref<string[]>([])
  const loading = ref(false)

  watch(() => toValue(query), (q) => {
    if (!q) { results.value = []; return }
    loading.value = true
    const c = new AbortController()
    const t = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${q}`, { signal: c.signal })
      results.value = await res.json()
      loading.value = false
    }, delay)
    onWatcherCleanup(() => { clearTimeout(t); c.abort() })
  }, { immediate: true })

  return { results, loading }
}
```

A renderless component variant exposes the same logic to a template through a scoped slot. Composables that use lifecycle hooks or `provide`/`inject` must run inside a component `setup`.

## State with Pinia

Use setup stores (recommended for FSD `model`): `ref` becomes state, `computed` becomes getters, `function` becomes actions. Setup stores do not get `$reset` for free, define your own.

```ts
// entities/counter/model/counter.store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() { count.value++ }
  function $reset() { count.value = 0 }
  return { count, doubleCount, increment, $reset }
})
```

Destructuring a store breaks reactivity. Use `storeToRefs` for state and getters, and destructure actions directly (they are bound methods).

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/entities/counter'

const store = useCounterStore()
const { count, doubleCount } = storeToRefs(store) // reactive refs
const { increment } = store                        // actions: safe to destructure
</script>
```

State APIs: direct mutation (`store.count++`), `store.$patch({...})` or `store.$patch((state) => ...)` for batches, and `store.$subscribe(cb, { detached: true })` to persist on change. Register Pinia in `app/`: `createApp(App).use(createPinia())`. For cross-cutting persisted stores, add `pinia-plugin-persistedstate` and whitelist safe fields with `pick`. Never persist raw auth tokens to `localStorage`, prefer `sessionStorage` plus an httpOnly cookie.

## Routing with vue-router

Router lives in `app/router/`. Route components lazy-load with dynamic `import()`. The global `beforeEach` auth gate reads an auth store and uses `meta.requiresAuth`.

```ts
// app/router/router.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/landing/ui/LandingPage.vue') },
  {
    path: '/auction/:id',
    name: 'auction',
    component: () => import('@/pages/auction/ui/AuctionPage.vue'),
    meta: { requiresAuth: true },
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guards return a value: false cancels, a route location redirects, undefined/true continues.
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})
```

```vue
<script setup lang="ts">
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()

// Watch a specific param, not the whole route object.
watch(() => route.params.id, async (id) => { /* refetch */ })
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) { /* refetch */ }
})

router.push({ name: 'auction', params: { id: '42' } })
router.replace({ name: 'login' })
</script>
```

`createWebHistory` gives clean URLs. Use `createWebHashHistory` for static hosting and `createMemoryHistory` for SSR or tests. A parent route must render `<RouterView />` for its `children` to show.

## Server State with vue-query

`@tanstack/vue-query` owns server-cache state (loading, caching, refetch, invalidation). Pinia owns client state. Install the plugin in `app/`, and put request functions plus `queryOptions` factories in the FSD `api` segment.

```ts
// app/providers/query.ts
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
})
export const queryPlugin = { plugin: VueQueryPlugin, options: { queryClient } }
```

The Vue-specific reactivity rule: put the ref or computed ITSELF in the query key, not its `.value`. Vue Query unwraps and tracks it, so the query refetches when it changes.

```ts
// entities/auction/api/auction.queries.ts
import { queryOptions } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'
import { fetchAuction, fetchAuctionList } from './auction.requests'

export const auctionQueries = {
  all: () => queryOptions({ queryKey: ['auctions'], queryFn: fetchAuctionList }),
  detail: (id: MaybeRefOrGetter<number>) =>
    queryOptions({
      queryKey: ['auctions', id],          // pass the ref, NOT id.value
      queryFn: () => fetchAuction(toValue(id)),
    }),
}
```

```vue
<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { auctionQueries } from '@/entities/auction'

const { data, isPending, isError, error } = useQuery(auctionQueries.all())

const queryClient = useQueryClient()
const { mutate } = useMutation({
  mutationFn: createBid,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: auctionQueries.all().queryKey }),
})
</script>
```

## TypeScript with Vue

```ts
import { ref, computed, type Ref, type ComputedRef } from 'vue'

const n = ref(0)                         // inferred Ref<number>
const ids = ref<string[]>([])            // explicit element type
const maybe = ref<number>()              // Ref<number | undefined>
const book: Book = reactive({ title: '' }) // annotate the variable, not the generic
const d: ComputedRef<number> = computed(() => n.value * 2)
```

- Props: `defineProps<{ msg: string; book?: Book }>()`. Complex runtime types use `book: Object as PropType<Book>`.
- Emits: `defineEmits<{ change: [id: number] }>()` (tuple form, 3.3+).
- Provide/inject: `Symbol() as InjectionKey<T>` ties the value type to the key.
- Template refs (3.5+): `const el = useTemplateRef<HTMLInputElement>('el')`. Component instance: `useTemplateRef<InstanceType<typeof Foo>>('comp')`.
- Event handlers: `function onChange(e: Event) { (e.target as HTMLInputElement).value }`.

## Performance

- `v-once`: render a static subtree once, never update it again.
- `v-memo="[a, b]"` (3.2+): memoize a subtree against a fixed-length dep array. Skips VNode creation and diffing when deps are unchanged. Main use is huge `v-for` lists (1000+), placed on the SAME element as `v-for`. `v-memo="[]"` equals `v-once`. It does NOT work on a child inside `v-for`.

```vue
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
</div>
```

- Computed stability (3.4+): a computed only triggers when its returned value changes. Returning a fresh object every run always triggers, compare against the old value and return it unchanged when equal.
- Props stability: compute per-item booleans in the parent so unchanged children keep stable props and skip re-render.
- `shallowRef` and `shallowReactive` for large immutable data, then update by REPLACING the root (`big.value = [...big.value, item]`), not by mutating in place.
- Virtualize lists of thousands with `vue-virtual-scroller`. Code-split routes and heavy components with dynamic `import()` and `defineAsyncComponent`.
- Lazy hydration (3.5+) for SSR'd async components: `hydrate: hydrateOnVisible()`, `hydrateOnIdle()`, `hydrateOnMediaQuery('(max-width:500px)')`, or `hydrateOnInteraction('click')`.

```ts
import { defineAsyncComponent, hydrateOnVisible } from 'vue'
const HeavyChart = defineAsyncComponent({
  loader: () => import('@/widgets/chart/ui/Chart.vue'),
  hydrate: hydrateOnVisible({ rootMargin: '100px' }),
})
```

## Testing

Stack: Vitest (Vite-native runner) plus `@vue/test-utils`. `create-vue` scaffolds include `@vitejs/plugin-vue`. Use `happy-dom` or `jsdom` for a DOM environment.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
export default defineConfig({
  test: { globals: true, environment: 'happy-dom' },
})
```

Composables that only use reactivity APIs can be unit-tested directly. Components use `mount`. `trigger` returns a promise, await it to flush the DOM update.

```ts
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import Counter from './Counter.vue'

test('emits increment on click', async () => {
  const wrapper = mount(Counter, {
    props: { max: 10 },
    global: { plugins: [pinia], provide: { injectedKey: 'value' } },
  })
  await wrapper.find('[data-testid=increment]').trigger('click')
  expect(wrapper.emitted('increment')).toHaveLength(1)

  await nextTick()       // DOM settled after a state change
  await flushPromises()  // pending promises (fetch, async setup) resolved
})
```

Test the public interface (props, events, slots, rendered output). Do not test private state, internal methods, or rely solely on snapshots.

## Feature-Sliced Design in Vue

FSD layers, from most to least app-specific: `app` -> `pages` -> `widgets` -> `features` -> `entities` -> `shared`. A higher layer may import only from layers below it. Each slice splits into segments.

| Segment | Vue artifact | Holds |
|---|---|---|
| `ui` | `.vue` SFCs (`<script setup>`) | presentational and container components, page components |
| `model` | Pinia setup stores, composables (`useXxx`) | state, getters, actions, view-model logic, vue-query hook wrappers |
| `api` | request functions (`ofetch`/axios) plus `queryOptions` factories | `fetchAuction`, `createBid`, `auctionQueries.*` |
| `lib` | framework-agnostic helpers | `slugify`, formatters, guard functions |
| `config` | constants, route meta, env | route definition fragments, query client defaults |

A `<script setup>` SFC compiles to a DEFAULT export. The slice public API is `index.ts` barrels that re-export those defaults by name, so cross-slice imports use the barrel only, never deep paths.

```ts
// entities/auction/ui/index.ts
export { default as AuctionCard } from './AuctionCard.vue'
export { default as AuctionList } from './AuctionList.vue'

// entities/auction/index.ts  (slice public API)
export * from './ui'
export { useAuctionStore } from './model/auction.store'
export { auctionQueries, fetchAuction, createBid } from './api'
export type { Auction } from './model/types'
```

Consumers import only the barrel: `import { AuctionCard, auctionQueries } from '@/entities/auction'`. A slice's internals (`./ui/AuctionCard.vue`, `./model/...`) stay private. Enforce barrel-only imports mechanically with `@feature-sliced/steiger` or `eslint-plugin-boundaries`. This repo's `src/entities/`, `src/features/`, `src/widgets/`, and `src/shared/` dirs already follow this layout.

## Quick Reference

- Reactivity: prefer `ref`, use `reactive` for grouped object state, never destructure either without `toRefs`.
- `ref` auto-unwraps only at the template top level. Nested `ref` in arrays/collections still needs `.value`.
- `watch` is lazy and needs a getter for a reactive property. `watchEffect` is eager and stops tracking after `await`.
- `computed` getters must be pure. Writable computed takes `{ get, set }`.
- `<script setup>` macros: `defineProps`, `defineEmits`, `defineModel` (3.4+), `defineExpose`, `withDefaults` (or 3.5+ destructure defaults).
- Lifecycle hooks register synchronously in `setup`. Clean up in `onUnmounted`.
- `storeToRefs` for Pinia state and getters, destructure actions directly.
- vue-query: put the ref itself in the query key, not `.value`. `invalidateQueries` after a mutation.
- Performance: `v-memo` on the `v-for` element for huge lists, `shallowRef` plus root replacement for big immutable data.
- FSD: SFC is a default export, barrel re-exports it by name, import via the barrel only.

## Anti-Patterns

- Destructuring `reactive` or a Pinia store without `toRefs` / `storeToRefs`, which silently drops reactivity.
- Reassigning a whole `reactive` object (`state = reactive({...})`), which breaks the binding. Mutate fields instead.
- `v-if` and `v-for` on the same element. Filter with a computed or move `v-if` to a `<template>` wrapper.
- Using array index or an object as `:key`. Use a stable unique primitive id.
- Reading the DOM right after a state change without `await nextTick()`.
- Putting `.value` of a ref in a vue-query key, which freezes the key and kills reactive refetch.
- Side effects, async, or DOM mutation inside a `computed` getter. Use `watch` / `watchEffect`.
- Mutating a `shallowRef` value in place and expecting an update. Replace the root.
- Persisting raw auth tokens to `localStorage`. Whitelist with `pick` and prefer `sessionStorage` plus httpOnly cookies.
- Deep-importing another slice's internals (`@/entities/auction/ui/AuctionCard.vue`). Import the barrel.
- Registering a lifecycle hook asynchronously (inside a promise or `setTimeout`). Vue cannot bind it to the instance.

## Related Skills

- `nuxt`: sibling skill for the Nuxt meta-framework (SSR, file-based routing, `useFetch`, server routes). Use it for Nuxt-specific work this core skill deliberately excludes.
- `react-to-vue-fsd-migration`: migrating the React + Zustand + react-router codebase in this repo to Vue 3 plus Pinia plus vue-router under FSD. Pairs with the FSD section above.
- `feature-sliced-design`: framework-agnostic FSD layer and segment rules, slice boundaries, and import constraints.
- `ecc:vite-patterns`: Vite build, dev server, and plugin configuration underpinning the Vue toolchain.
- `ecc:e2e-testing`: end-to-end testing with Playwright, complementing the Vitest component testing above.
