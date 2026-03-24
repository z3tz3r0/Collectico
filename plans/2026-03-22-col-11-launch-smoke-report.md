# COL-11 Launch Smoke Report

Date: 2026-03-22
Owner: QA Engineer
Command: `bash scripts/qa-launch-smoke.sh`

## Release Call

No-go for MVP launch in the current state.

## Smoke Result Summary

- Frontend build: pass
- Frontend lint: fail
- Backend test command: fail
- Frontend/backend launch route contract audit: fail

## Critical Blockers

1. Launch-critical frontend flows call backend routes that do not exist.
   - The audit found 30 failing API references across auth, browse, cart and checkout, seller submission, and auction flows.
   - Examples:
     - Frontend logout uses `/api/auth/logout`, while backend exposes `POST /api/users/auth/logout`.
     - Product detail uses `/api/product/:id`, while backend exposes `GET /api/products/:id`.
     - Seller submission uses `/api/product-add` and `/api/product-put/:id`, while backend exposes `POST /api/products/` and `PUT /api/products/auth/:id`.
     - Cart and checkout use `/api/cart-get`, `/api/cart-add`, `/api/order-add`, while backend exposes `/api/cart/cart-get`, `/api/cart/cart-add`, and `POST /api/orders/`.

2. Commerce pages fail lint on undefined globals in launch flows.
   - `collectico-frontend/src/pages/ProductPage.jsx`
   - `collectico-frontend/src/pages/Cart.jsx`
   - `collectico-frontend/src/pages/Auction.jsx`
   - These files reference `axios` and or `baseURL` without imports.

3. Backend has no automated test runner yet.
   - `collectico-backend/package.json` still defines `npm test` as the default placeholder that exits with status 1.

## Secondary Risks

- Frontend bundle builds at about 1.2 MB minified JS, which is high for launch and likely to slow first-load performance.
- Build emits unresolved font asset warnings for local font files.

## Recommended Next Actions

1. Align frontend API calls to the backend route contract or update backend routes to match the frontend.
2. Fix undefined `axios` and `baseURL` references in the buyer and auction flows.
3. Replace the backend placeholder test command with at least one repeatable smoke check.
4. Re-run `bash scripts/qa-launch-smoke.sh` and require a clean pass before release.
