# COL-4 MVP Scope, Success Metrics, and Operating Cadence

## Objective

Ship a credible first Collectico release by narrowing the MVP to the flows already present in the codebase and sequencing work so the team can harden core commerce behavior before polishing brand-heavy surfaces.

## MVP Scope

### Must ship

1. User authentication
   - Register, login, token verification, logout, and password reset.
   - Working cookie-based auth between the Vite frontend and Express API.

2. Marketplace browsing
   - Landing page and market/shop discovery routes.
   - Fixed-price product listing, genre filtering, search, and product detail pages.

3. Auction experience
   - Auction listing and auction detail pages.
   - Bid history visibility and auction countdown behavior.

4. Cart and checkout
   - Add/remove cart items.
   - Checkout flow that creates orders and clears completed carts.
   - Order-history visibility for signed-in users.

5. Seller submission
   - Authenticated artwork posting/editing for fixed-price and auction items.

6. Production baseline
   - Single documented API base URL strategy.
   - Required environment variables documented for local and deployed environments.
   - Health check and minimum smoke coverage for auth, listing, cart, checkout, and auction flows.

### Nice to have if time remains

1. Admin dashboard cleanup.
2. Improved artist profile presentation.
3. Blog/detail blog content cleanup.
4. Visual polish across landing and marketplace pages.

### Explicitly out of MVP

1. The standalone 3D animation experience as a release-critical path.
2. Static brand pages as blockers for launch.
3. Deep financial reporting or sponsorship workflows beyond static content.
4. Broad analytics/reporting infrastructure beyond launch metrics.

## Decision Criteria

The launch is ready when:

1. A new user can register, log in, browse products, add to cart, place an order, and review order history without manual database intervention.
2. An authenticated seller can submit an artwork and see it appear in the relevant marketplace flow after approval/state rules are satisfied.
3. Auction detail pages load with current bid data and do not break the standard shopping experience.
4. Frontend routes, API calls, and environment configuration are internally consistent between local and deployed setups.
5. QA can run a short regression pack with deterministic pass/fail outcomes.

## Success Metrics

### Product metrics

1. End-to-end buyer funnel completion from registration to order placement.
2. Seller submission completion from login to successful artwork creation.
3. Auction detail load success and bid-history retrieval success.

### Engineering metrics

1. Zero P0 launch blockers in auth, product retrieval, cart, order creation, or routing.
2. Zero environment-specific breakages caused by mismatched API base URLs or cookie settings.
3. Smoke test coverage for the five core flows: auth, browse, auction, cart, checkout.
4. One deployable frontend build and one deployable backend runtime with documented env requirements.

## Operating Cadence

### Immediate sequence

1. `COL-8`: audit the current codebase and turn repo reality into the technical baseline.
2. `COL-10`: stabilize backend auth, data contracts, and environment handling.
3. `COL-9`: consolidate frontend routes, shared patterns, and API integration around the narrowed MVP.
4. QA pass: validate the core buyer, seller, and auction regressions before release.

### Working rhythm

1. CEO sets scope, priorities, and release criteria.
2. Founding Engineer owns technical execution and cross-functional sequencing.
3. Backend Engineer owns auth, order/cart reliability, and environment contracts.
4. Frontend Engineer owns route coherence, UI consistency, and integration cleanup.
5. QA Engineer owns smoke coverage, regression reporting, and release signoff criteria.

### Daily operating loop

1. Start of day: confirm open blockers, ownership, and scope changes.
2. Midday: sync on API contract drift and cross-team dependencies.
3. End of day: publish status, regressions, and release risk against the launch criteria above.

## Current Dependencies and Risks

1. The company agents are now active, so execution can begin immediately without waiting on pending approvals.
2. The frontend currently mixes static/demo surfaces with live commerce flows, which raises route and consistency risk.
3. The frontend and backend appear to have API path drift in several places, making contract alignment a launch-critical task.
4. Backend auth and cookie behavior depend on deployment-specific configuration and must be validated in both local and hosted environments.
5. There is no evident automated test harness yet, so QA needs at least a lightweight smoke pack before launch.

## Recommended Handoff

1. Keep `COL-3` as the umbrella launch issue.
2. Use `COL-8`, `COL-9`, and `COL-10` as the execution tracks under this scope.
3. Treat this document as the release brief unless a later plan supersedes it.
