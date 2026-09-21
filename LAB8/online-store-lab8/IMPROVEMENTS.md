# 🪑 The Crafted Woods — Project Improvements Document

> Comprehensive list of improvement areas for the Online Furniture Store project
> (Express backend + React/Vite frontend).

Each item is tagged with a priority so the team can plan work:

| Priority | Meaning |
|----------|---------|
| 🔴 **Critical** | Security bug, data-loss risk, or blocking blocker |
| 🟠 **High** | Major feature/architecture gap, wrong behaviour |
| 🟡 **Medium** | Should-have for production, quality/UX |
| 🟢 **Low** | Nice-to-have, cleanup, polish |

---

## 1. 🔴 Critical — Security

- [ ] **C.1 — JWT secret is committed/hardcoded.** `backend/config/env.js:12` falls back to `furnish_india_super_secret_jwt_key_2026` when no env var is set. Anyone with the repo can forge admin tokens. It must be loaded from a `process.env` value with **no default**, and rejected at startup if missing.
- [ ] **C.2 — `dotenv` is never loaded.** `env.js` and the README instruct using a `.env` file "with dotenv", but `dotenv` is not installed and never `require`d in `server.js`. No environment configuration actually works as documented.
- [ ] **C.3 — JWT stored in `localStorage` on the frontend.** `AuthContext.jsx:26,30` persists the token and user in `localStorage`, which is readable by any XSS payload. Prefer **httpOnly + Secure + SameSite cookies** (with CSRF protection) or at minimum a shorter-lifetime token strategy with refresh tokens.
- [ ] **C.4 — Register endpoint allows attacker-set roles?** `authController.js:90` correctly hardcodes `role: "customer"`, but nothing prevents a crafted JWT payload being *trusted* elsewhere. The middleware `authenticate` (`authMiddleware.js:35`) trusts `req.user` from the token without re-checking the user still exists / role wasn't changed. Verify role from the user store on protected routes.
- [ ] **C.5 — No rate limiting on auth.** `POST /api/auth/login` is unthrottled — brute-force friendly. Add `express-rate-limit` (stricter on `/login` and `/register`) plus account lockout / failed-attempt tracking.
- [ ] **C.6 — No security headers.** No `helmet`, no CSP, no `X-Content-Type-Options`, etc. `app.use(helmet())` should be added to `server.js`.
- [ ] **C.7 — No request body size / input bounds beyond Express defaults.** Quantities/price inputs are accepted loosely. Cross-check and cap `items` array length, string lengths, and sanitize inputs on every endpoint.
- [ ] **C.8 — No CSRF consideration for state-changing endpoints.** If tokens move to cookies (C.3), CSRF protection must be added. Also consider `SameSite=Lax` defaults.
- [ ] **C.9 — Sensitive info leak in errors.** `globalErrorHandler` (`errorMiddleware.js:35`) returns `stack` in development — fine — but ensure no DB credentials, keys, or internal paths can leak via 500 messages in production.
- [ ] **C.10 — `CORS` returns a generic `Error` which becomes a raw 500.** `server.js:51` calls `callback(new Error(...))`. Errors from CORS should produce a readable 403 response, not a crash path, and `ALLOWED_ORIGINS` should be `.trim()`med when parsed.

---

## 2. 🔴 Critical — Data Persistence & Integrity

- [ ] **D.1 — No real database.** `users.js`, `products.js`, `orders.js` are all in-memory arrays. **Every restart wipes registered users, stock changes, and orders.** Replace with SQLite (simplest for an assignment), PostgreSQL, or MongoDB via an ORM/ODM (Prisma, Sequelize, Mongoose).
- [ ] **D.2 — No data migrations.** Whatever store is chosen, add a migration strategy and a schema versioning approach.
- [ ] **D.3 — Stock updates are not atomic/transactional.** `ordersController.js:147-154` does read-then-write. Concurrent order placements (or future multi-process deployment) can over-sell stock. Use a transaction or an atomic decrement (`UPDATE ... WHERE stock >= qty`).
- [ ] **D.4 — No order idempotency.** Double-submitting `POST /api/orders` (duplicate click/retry) creates duplicate orders. Add an idempotency key (client-generated UUID or a hash of items+address) and reject/return the existing order.
- [ ] **D.5 — Money stored as floats.** `ordersController.js` computes `lineTotal = price * quantity` and `gstAmount` as floats. JS floating-point can produce `.0000004` drift. Store amounts as integer **paise** (or use a decimal library) across backend and `CartPage.jsx`.
- [ ] **D.6 — Order state is static.** Orders are created with `status: "Confirmed"` and never change. There is no endpoint to update status; the `badge-*` statuses (`Shipped`, `Delivered`, `Cancelled`) frontend expects are impossible.

---

## 3. 🟠 High — Backend API Gaps

- [ ] **A.1 — `authorizeAdmin` is dead code.** `authMiddleware.js:57` defines `authorizeAdmin`, but it is never used by any route. Admin capabilities (see A.2–A.4) should actually use it.
- [ ] **A.2 — No admin product CRUD.** There are only `GET /api/products` and `GET /api/products/:id`. Add `POST / PUT / PATCH / DELETE` (admin-only) so stock/price can be maintained.
- [ ] **A.3 — No admin order management.** No `GET /api/orders/:orderId`, no `PATCH /api/orders/:id/status`, no dashboard stats endpoint (total revenue, orders per day, low-stock list).
- [ ] **A.4 — No user profile management.** Only `GET /api/auth/profile`. Add `PATCH` to update name/address, change password, and (admin) list users.
- [ ] **A.5 — No pagination.** `GET /api/products` and `GET /api/orders` return full arrays. Add `page`/`limit`, total-count metadata, and cap result sizes.
- [ ] **A.6 — Server-side filtering/sorting not used.** The backend already supports `category/search/minPrice/maxPrice`, but the frontend fetches the *entire* catalogue and filters/sorts client-side (`ProductsPage.jsx:63-99`). Add `sort` and combine filters so the API does the work (also enables pagination).
- [ ] **A.7 — No "related products" endpoint.** `ProductDetailsPage.jsx:75` re-fetches the whole product list just to show 3 related items. Add `GET /api/products/:id/related` (same category, exclude self, limit 3).
- [ ] **A.8 — No cart-validate endpoint.** `CartPage.jsx:46-67` fires one `GET /api/products/:id` per cart item to re-check stock. Add `POST /api/products/stock-check` that accepts an array and returns current stock in one call.
- [ ] **A.9 — No token refresh / logout endpoint.** JWT expires after 2h with no refresh flow and no server-side revocation. Add refresh tokens and/or a token-blacklist / short-lived access tokens.
- [ ] **A.10 — No central validation layer.** Validation is hand-rolled per controller (e.g., `authController.js:48-95`, `ordersController.js:57-74`). Use `express-validator`, `zod`, or `joi` schemas for consistent, reusable validation.
- [ ] **A.11 — Localised/duplicated pricing logic.** GST (18%), shipping threshold (₹50,000) and charge (₹999) are hardcoded in *three* places (backend `ordersController.js`, `CartPage.jsx`, `ProductDetailsPage.jsx`). Centralise on the backend and return a server-computed breakdown the cart can mirror.
- [ ] **A.12 — No request tracing / structured logging.** Replace the ad-hoc `console.log` in `server.js:66-70` with a structured logger (pino/morgan) that includes request IDs and JSON output.
- [ ] **A.13 — No compression.** Add `compression` middleware for JSON payloads.
- [ ] **A.14 — Health endpoint is minimal.** Add `/api/health` that verifies DB connectivity and uptime.

---

## 4. 🟠 High — Frontend Behaviour & State

- [ ] **F.1 — Session validity is never checked on load.** `AuthContext.jsx:19-31` blindly trusts `localStorage`. A user whose token has expired still sees themselves as logged in until a request 401s. Re-validate at boot (`GET /api/auth/profile`) and auto-logout on failure.
- [ ] **F.2 — No global 401 handling.** `api.js` has only a request interceptor. Add a response interceptor that clears the auth session (and redirects to `/account`) when a 401 is returned.
- [ ] **F.3 — Hardcoded backend URL.** `api.js:10` hardcodes `http://localhost:5000/api`. Use a Vite env var (`VITE_API_URL`) plus a Vite dev-server proxy so no CORS/hardcoding is needed at all.
- [ ] **F.4 — Fetch-all-then-filter pattern.** `ProductsPage` and `ProductDetailsPage` (related products) each fetch the full catalogue and compute derived lists. Use the server filters (A.6/A.7) instead.
- [ ] **F.5 — Inefficient `useProducts` dependency.** `useProducts.js:70` uses `JSON.stringify(queryParams)` in the dependency array with an eslint-disable comment. Passing an inline object re-triggers fetches. Accept a stable `params` object or individual args.
- [ ] **F.6 — Duplicated price formatter.** `formatRupees` is copy-pasted in `ProductCard.jsx:45-52` and `ProductDetailsPage.jsx:41-47`, while a similar `formatPriceWithSymbol` already exists in `utils/formatters.js`. Consolidate into the util and import everywhere.
- [ ] **F.7 — Inconsistent brand identity.** Backend is "Furnish India", frontend is "The Crafted Woods", storage keys are `kaarya_griha_*`. Unify branding/naming across the product.
- [ ] **F.8 — Home page stats are fabricated/unlinked.** Hero claims "500+ Products", "50,000+ Happy Customers" while the catalogue has 10 products. Drive these from real API/data or remove.
- [ ] **F.9 — No error boundary.** A runtime error anywhere unmounts the whole React tree. Add a top-level ErrorBoundary.
- [ ] **F.10 — No code splitting / lazy loading.** All routes are statically imported in `App.jsx`. Use `React.lazy` + `Suspense` for routes to reduce the initial bundle.
- [ ] **F.11 — Search input is not debounced.** `ProductsPage` filters on every keystroke. Debounce (300 ms) — important once catalogues grow beyond the current 10 items.
- [ ] **F.12 — Cart is device-local only.** Cart lives only in `localStorage`. Add an authenticated server-side cart/session so a user's cart follows them across devices.
- [ ] **F.13 — Cart localStorage writes can throw.** `CartContext.jsx:26` writes without try/catch; in private browsing/quota-full scenarios the app can error.
- [ ] **F.14 — `Buy Now` is just add-to-cart + navigate.** It provides no dedicated checkout/review flow nor redirect back to a checkout page after login. Consider a real order-review → payment flow.
- [ ] **F.15 — Remove `/api` hardcoded in cart redirect buttons.** Several pages, e.g. `CartPage.jsx:342`, hardcode `redirect=%2Fcart` strings — derive from the current location.

---

## 5. 🟠 High — Testing

- [ ] **T.1 — No automated tests anywhere.** There is no `*.test.js`/`*.spec.js` file in this project and no test runner configured for either package.
- [ ] **T.2 — Backend:** add a test runner (Jest or Vitest + Supertest); unit-test controllers/helpers; integration-test every endpoint (register, login, products filters, order placement, stock deduction, role guard).
- [ ] **T.3 — Frontend:** add Vitest + React Testing Library; cover AuthContext, CartContext, filters/sorting logic, ProductList states (loading/error/empty), and checkout validation.
- [ ] **T.4 — Test coverage gates.** Add `npm test` scripts and a CI step; enforce a minimum coverage on the money/stock logic (D.3–D.5).

---

## 6. 🟡 Medium — UX & Accessibility

- [ ] **U.1 — Keyboard/focus handling in the navbar dropdown.** `Navbar.jsx` closes the user dropdown only on `mouseLeave`; ESC key, focus-out, and arrow-key navigation are not handled.
- [ ] **U.2 — Mobile menu traps/interaction issues.** The hamburger menu in `Navbar.jsx:133-149` has no focus management, no ESC/outside-click close, and no `aria-controls`/`aria-hidden` on the panel.
- [ ] **U.3 — Quantity stepper semantics.** `ProductDetailsPage.jsx:296-303` renders the quantity as a `<span id="qty-input">` labelled via a `<label htmlFor>`. A real `<input type="number">` (or `role="spinbutton"` with value/aria-valuenow) is more accessible.
- [ ] **U.4 — Password visibility toggles / forgot-password.** The account page has no "show password" or "forgot password" affordances (backend support in A.4/A.9).
- [ ] **U.5 — Toast/feedback consistency.** Success/error feedback is done inline per page; a shared toast component would be cleaner and more consistent.
- [ ] **U.6 — Empty/error/skeleton states for cart live-stock fetch.** `CartPage` shows no loading indicator while N stock requests are in flight.
- [ ] **U.7 — Per-page SEO/meta.** Only `index.html` has meta tags. Add per-route `<title>`/meta (document title at minimum, or a lightweight head-manager / react-helmet-async).
- [ ] **U.8 — Reduced-motion / focus-visible audit.** Smooth scrolls and fades exist; ensure `prefers-reduced-motion` handling.
- [ ] **U.9 — Focus after route change.** `useProductById.js:85` scrolls to top on product change but doesn't move focus, so keyboard/screen-reader users stay anchored. Move focus to the `<main>` landmark.
- [ ] **U.10 — Social links are dead `href="#"`.** `Footer.jsx:28-31` links to nothing; wire real URLs or mark them as placeholders.

---

## 7. 🟡 Medium — Missing E-commerce Features

- [ ] **E.1 — No payment integration.** The site promises UPI/cards/EMI (footer, hero) but checkout collects only an address and "places the order" with no payment step. Integrate a payment gateway (Razorpay/Stripe) or clearly scope it out of scope.
- [ ] **E.2 — No GST invoice / receipt download.**
- [ ] **E.3 — No order tracking UI.** Orders are static (D.6); add status timeline + estimated delivery.
- [ ] **E.4 — No coupons / discount codes / promotional pricing.**
- [ ] **E.5 — No wishlist / favourites.**
- [ ] **E.6 — No product reviews / ratings.**
- [ ] **E.7 — No product variants (size/finish/colour) or bundles.**
- [ ] **E.8 — No email/SMS notifications** (order confirmation, dispatch, delivery).
- [ ] **E.9 — No search suggestions/autocomplete** in the hero search box.
- [ ] **E.10 — No admin dashboard UI** — the entire admin story is backend-only.
- [ ] **E.11 — No "track order" / support pages, T&C, privacy policy, return policy pages** (footer/links imply them).

---

## 8. 🟢 Low — Tooling, Quality & Elispure

- [ ] **Q.1 — No TypeScript.** Both packages are plain JS. Introducing TypeScript (incrementally) would catch a large class of bugs.
- [ ] **Q.2 — No shared ESLint/prettier setup for the backend** (oxlint exists only for the frontend). Add a consistent linter + formatter across the repo.
- [ ] **Q.3 — No `dotenv` + `.env.example` committed** (README references it). Provide `.env.example` and commit the convention.
- [ ] **Q.4 — No root README / monorepo setup.** Two packages, no `concurrently` script to run both, no root `package.json` workspace.
- [ ] **Q.5 — Frontend README is the unmodified Vite boilerplate.** Replace with real project docs.
- [ ] **Q.6 — Node.js version not pinned.** Add `engines` in both `package.json` and an `.nvmrc`/`.node-version`.
- [ ] **Q.7 — No CI/CD, lint-stage, or pre-commit hooks.** Add husky/lint-staged and a GitHub Actions workflow (lint → test → build).
- [ ] **Q.8 — No local developer ergonomics.** Add `concurrently` to run backend + frontend with one command.
- [ ] **Q.9 — No Docker/deployment config.** Add `Dockerfile`s + a compose file (app + DB) and static hosting config for the built SPA.
- [ ] **Q.10 — No monitoring/ready-probes.** Add `/api/health` (A.14) and structured logging (A.12) so deployment is observable.
- [ ] **Q.11 — Image optimisation.** Product images are served as-is; consider compression, responsive `srcset`, and caching headers.
- [ ] **Q.12 — Minor correctness cleanups.** `OrdersPage.jsx:27` calls `.reverse()` directly on the API response array (mutates server data in-memory); copy before reverse. Some `<a href="#">` and emoji-only icons need accessible text alternatives.

---

## 9. Suggested Priority Roadmap

| Phase | Focus | Recommended items |
|-------|-------|-------------------|
| **Phase 1 — Hardening (do first)** | Security + persistence | C.1, C.2, C.3, C.5, C.6, D.1, D.3, D.5, D.6 |
| **Phase 2 — Correctness** | API + state | A.1–A.11, F.1, F.2, F.6, F.7, F.9 |
| **Phase 3 — Features** | Commerce | E.1, E.2, E.3, A.2, A.3, E.5, E.6 |
| **Phase 4 — Quality** | Testing + UX | T.1–T.4, U.1–U.10, Q.1, Q.7 |
| **Phase 5 — Polish** | Tooling/deployment | Q.2–Q.12 |

---

*Document generated from a full review of the codebase on 14 Sep 2026.*