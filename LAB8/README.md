# LAB8 — Online Store: Backend + Full App

Full-stack Furnish India furniture store. This folder duplicates the app under
`online-store-lab8/` so LAB8 can run standalone.

## How the backend works

- **`backend/server.js`** — Express entry point. Applies CORS, JSON parsing, request logging, mounts the API routers, serves product images, then error/404 middleware.
- **Routes**
  - `/api/auth` — `POST register`, `POST login`, `GET profile` (JWT + bcrypt, auth required for profile).
  - `/api/products` — `GET /` (category/search/minPrice/maxPrice filters) and `GET /:id`.
  - `/api/orders` — `POST /` (place order, JWT) and `GET /` (own orders; admins see all).
- **Data** — in-memory JS stores in `backend/data/` (`users`, `products`, `orders`); passwords are stored as bcrypt hashes. Data resets on restart.
- **`backend/nodeserver`** — small Express + Mongoose example showing MongoDB connectivity. **DB credentials are not committed**: set `MONGODB_URI` via `backend/nodeserver/.env` (see `.env.example`).

## Run the backend

```bash
cd backend
npm install
npm run dev     # http://localhost:5000
npm start       # production
```

Demo logins: `admin@furnishindia.com` / `Admin@123` · `customer@furnishindia.com` / `Customer@123`