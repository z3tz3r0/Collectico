# Collectico Frontend: React to Vue 3 + FSD Migration Roadmap

Supersedes the prior `col-4-mvp-scope-plan` and `col-11-launch-smoke-report` (removed). The MVP feature scope and the still-open backend blockers from those are carried forward below.

## Strategy

Parallel-build, not destroy-in-place. Scaffold a fresh Vue app in a sibling directory (`collectico-frontend-vue/`) and grow it slice by slice to MVP parity against the live React app. The React app stays the deployed frontend until the Vue app passes the parity gate, then a single cutover swaps it in and legacy is removed last. Both talk to the same unchanged `collectico-backend` (Express + socket.io), so the backend is never blocked.

Effort sizing (relative, single developer): S is up to ~1 focused day, M is 2 to 4 days, L is 1 to 2 weeks.

Every phase ends with a `/code-review` gate. Any phase touching auth, cookies, bidding, payments, or file upload also runs `/security-review`.

The reusable mechanics live in the learned skill `react-to-vue-fsd-migration` (`~/.claude/skills/learned/`), which ships `fsd-init.sh` (skeleton) and `verify-slice.sh` (per-slice gate).

## Stack decisions (resolve before Phase 0 code, R1)

Recommended defaults from the verified research pass. A, C, D gate the scaffold. B and E can be confirmed later.

| # | Decision | Recommended (star) | Alternatives | Rationale |
|---|---|---|---|---|
| A | Render mode | Nuxt 4 (SSR/SSG hybrid) | Vue 3 + Vite SPA | Public art marketplace, so SEO is the deciding axis (real meta and OG tags in initial HTML, proper 404s). Nuxt stays free-tier via `routeRules { prerender: true }` to static hosts. Cost: one-time FSD-on-Nuxt directory override. If SEO is not a near-term priority, the SPA is materially less work and the roadmap still holds. |
| B | Component library | Vuetify 3 | PrimeVue, Naive UI, headless+Tailwind | Closest Material-Design likeness to the current MUI 7 app. PrimeVue is the strong alternative if the data grid dominates. No 1:1 MUI port exists, this is a re-implementation of every UI surface. |
| C | Package manager | bun | keep npm, pnpm | Global default. Greenfield is the clean moment to adopt. create-vue and Vite run fine under bun. Backend PM stays independent. |
| D | HTTP client | ofetch | ky, redaxios, native fetch, keep axios | Maps the current `axios.create({ baseURL, withCredentials })` + `apiPaths` pattern 1:1. The axios "hack" was a registry compromise, not a source flaw, so keeping axios pinned >=1.15.0 is also defensible. ofetch is an ergonomics and Nuxt-fit win, not a security necessity. |
| E | Data grid | PrimeVue DataTable (free) | AG Grid Community/Enterprise, Vuetify v-data-table-server | Hardest component swap from `@mui/x-data-grid`. Action: confirm which MUI X Pro/Premium features FinancialReportingPage actually uses before committing, those are paywalled or split across tiers in every Vue option. |

Phase deliverables below assume A1 Nuxt / B1 Vuetify / C1 bun / D1 ofetch / E1 PrimeVue DataTable. Swap any letter and the affected deltas get restated.

## MVP feature scope (framework-agnostic, carried forward)

In scope for parity cutover: (1) auth (login, register, logout, reset password, verify-token session, login popup), (2) marketplace browse (product list, by-genre, debounced search, auction list), (3) product detail, (4) auction detail + realtime bidding (socket.io), (5) cart to checkout to orders, (6) seller submission (product create + upload, my-products, edit).

Out of MVP, deferred to polish: admin dashboard, FinancialReportingPage charts, the 2D sprite museum (`Animation/`).

## Carried-forward backend blockers (survive the frontend rewrite)

From the old COL-11 smoke report, these are backend-side and remain open regardless of frontend framework:
- Frontend-to-backend route contract alignment. The new `apiPaths` map already centralizes this on the frontend, so verify each path against the Express routes during Phase 1 and Phase 2.
- Backend has no automated test runner (placeholder `npm test` exits 1). Needs at least a smoke pack before any launch.

## Phases

- Phase 0 Foundation (M): scaffold Vue + Vite + TS + Router + Pinia + Vitest via `create-vue`, run `fsd-init.sh`, Nuxt-FSD reconciliation if A1, `shared/config/env.ts`, `shared/api/http-client.ts` with ofetch replacing axios (apiPaths verbatim), carry-over deps (socket.io-client, chart.js, swiper, @fontsource/roboto) + Vue adapters (@tanstack/vue-query, pinia, vue-router, vue-chartjs, unplugin-icons). Drop the 7 misplaced backend deps and the unused styled-components and zustand. CI lint + typecheck + test + build + SCA audit. Exit: app builds, a live `apiPaths.products.list` call returns data with cookies, FSD boundaries pass.
- Phase 1 Auth (M): `entities/user`, Pinia auth store (replaces AuthContext), `features/auth` (login 387L, register 378L, reset, login-popup), session bootstrap via verifyToken, vue-router guards, wire the 401 onResponseError handler. Security-review.
- Phase 2 Marketplace browse (L): `entities/product` + `entities/auction`, vue-query queries, `features/product-search` (port useDebounce), landing/shop/genre widgets and pages, swiper/vue, unplugin-icons.
- Phase 3 Product detail (S): product detail page, useRoute params, per-product SEO meta and real 404 (A1).
- Phase 4 Auction + realtime bidding (M): `features/bidding`, socket composable (onMounted/onUnmounted, placeBid emit, newBid listener), countdown, SSR-safe client-only init. Security-review (bid input).
- Phase 5 Cart, checkout, orders (L): `entities/cart` + `entities/order`, Pinia cart store (replaces CartContext), `features/checkout` (Step 278L, PaymentMethod 258L, OrderDetailsPopup 399L), cart badge in navbar. Security-review (payment, order creation).
- Phase 6 Seller submission (L): `features/product-submission` (PostPage 585L, the heaviest single surface, uploads + validation), my-products, edit. Security-review (file upload, ownership).
- MVP parity gate: side-by-side parity pass with `/e2e` / playwright. Cutover decision point, keep React for one rollback window.
- Phase 7 Component-library and styling parity (M): MUI to Vuetify theme parity, CSS-in-JS unwind, responsive + a11y pass.
- Phase 8 Admin + FinancialReporting (L): admin pages, vue-chartjs, data grid rewrite (Decision E). The grid is most of this.
- Phase 9 Legacy removal (M, R1): after a stable production window, remove the React app (tag the final commit for rollback, confirm with the user), rename the Vue dir, update CI and deploy paths. Decide keep-or-drop on the 2D `Animation/` museum explicitly. Final dep audit.

## Cross-cutting risks

- The biggest aggregate cost is the React-hooks to Composition-API mental shift across ~127 component files, not any one library. Stale-closure bugs translate into reactivity-tracking bugs. `/react-review` does not help here, use `/code-review` plus a Vue-aware reviewer.
- `@mui/x-data-grid` to a Vue grid and the whole MUI to Vuetify re-implementation are the two hardest aggregate surfaces.
- React 19 APIs (Actions, useActionState, use, RSC) and react-router-dom 7 data APIs (loaders, actions) have no direct Vue equivalent. Confirm whether the app actually uses them before assuming work.
- socket.io and the backend are unaffected by frontend decisions. The only realtime risk under Nuxt is SSR safety, handled in Phase 4.
- Do not copy backend deps into the new frontend. The scaffold simply omits them, verify they never reappear.
