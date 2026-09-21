# 🪑 Furnish India — Backend API

A RESTful backend for an Indian Furniture e-commerce store, built with **Node.js** and **Express**.  
Uses **JWT-based authentication**, an in-memory product catalogue, and a live orders store.

---

## 📁 Project Structure

```
backend/
├── config/
│   └── env.js                  # Centralised environment config (JWT, port, CORS)
├── controllers/
│   ├── authController.js        # Register, login, profile logic
│   ├── productsController.js    # List products, get by ID
│   └── ordersController.js      # Place order, retrieve orders
├── data/
│   ├── products.js              # In-memory product catalogue (10 items)
│   ├── users.js                 # Seeded demo users with bcrypt-hashed passwords
│   └── orders.js                # In-memory orders store (runtime)
├── middleware/
│   ├── authMiddleware.js        # JWT verify + admin role guard
│   └── errorMiddleware.js       # 404 handler + global error handler
├── routes/
│   ├── authRoutes.js            # /api/auth/*
│   ├── productsRoutes.js        # /api/products/*
│   └── ordersRoutes.js          # /api/orders/*
├── .gitignore
├── package.json
└── server.js                    # Express app entry point
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Development (auto-reload)
npm run dev

# Production
npm start
```

Server runs at: **http://localhost:5000**

---

## 🔑 Authentication

This API uses **JWT (JSON Web Token)** authentication.

1. **Register** or **Login** to receive a token.
2. Include the token in the `Authorization` header for protected routes:
   ```
   Authorization: Bearer <your_jwt_token>
   ```
3. Tokens expire after **2 hours**.

### Demo Credentials

| Role     | Email                         | Password       |
|----------|-------------------------------|----------------|
| Admin    | admin@furnishindia.com        | Admin@123      |
| Customer | customer@furnishindia.com     | Customer@123   |

---

## 📡 API Endpoints

### 🔐 Auth Endpoints

| Method | Endpoint              | Auth Required | Description                  |
|--------|-----------------------|---------------|------------------------------|
| POST   | `/api/auth/register`  | ❌            | Create a new user account    |
| POST   | `/api/auth/login`     | ❌            | Log in and receive a JWT     |
| GET    | `/api/auth/profile`   | ✅            | Get the logged-in user's profile |

**Register / Login — Request Body:**
```json
{
  "name": "Priya Mehta",
  "email": "priya@example.com",
  "password": "SecurePass@1"
}
```

---

### 🛋️ Product Endpoints

| Method | Endpoint               | Auth Required | Description                    |
|--------|------------------------|---------------|--------------------------------|
| GET    | `/api/products`        | ❌            | List all products (filterable) |
| GET    | `/api/products/:id`    | ❌            | Get a product by ID            |

**Query Parameters for `GET /api/products`:**

| Parameter  | Type   | Example                  | Description                        |
|------------|--------|--------------------------|------------------------------------|
| `category` | string | `?category=Bedroom`      | Filter by category (case-insensitive) |
| `search`   | string | `?search=teak`           | Search in name & description        |
| `minPrice` | number | `?minPrice=10000`        | Minimum price in ₹                 |
| `maxPrice` | number | `?maxPrice=50000`        | Maximum price in ₹                 |

---

### 📦 Order Endpoints

| Method | Endpoint       | Auth Required | Description                                   |
|--------|----------------|---------------|-----------------------------------------------|
| POST   | `/api/orders`  | ✅            | Place a new order                             |
| GET    | `/api/orders`  | ✅            | Get orders (own orders; admins see all)       |

**POST `/api/orders` — Request Body:**
```json
{
  "items": [
    { "productId": "PROD-001", "quantity": 1 },
    { "productId": "PROD-003", "quantity": 2 }
  ],
  "shippingAddress": {
    "fullName": "Rajan Sharma",
    "street": "12, MG Road",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560001",
    "phone": "9876543210"
  }
}
```

**Order Pricing Logic:**
- GST: **18%** on subtotal
- Shipping: **₹999** (free on orders above ₹50,000)
- Stock is automatically deducted on order confirmation

---

## 🛋️ Product Catalogue

| ID       | Name                          | Category    | Price (₹) | Stock |
|----------|-------------------------------|-------------|-----------|-------|
| PROD-001 | Sheesham Wood King Bed        | Bedroom     | 42,000    | 12    |
| PROD-002 | Teakwood Diwan                | Living Room | 28,500    | 8     |
| PROD-003 | Cane Swing Chair (Jhula)      | Outdoor     | 15,000    | 20    |
| PROD-004 | Rajasthani Jali Wardrobe      | Bedroom     | 55,000    | 6     |
| PROD-005 | Kerala Teak Dining Table Set  | Dining Room | 75,000    | 4     |
| PROD-006 | Acacia Wood Coffee Table      | Living Room | 18,500    | 15    |
| PROD-007 | Bamboo Bookshelf (5-Tier)     | Study       | 9,800     | 30    |
| PROD-008 | Mango Wood Sideboard          | Living Room | 32,000    | 10    |
| PROD-009 | Rosewood Rocking Chair        | Living Room | 22,000    | 9     |
| PROD-010 | Iron & Mango Wood Console Table | Hallway   | 13,500    | 18    |

---

## 🌐 CORS

Allowed origins (configurable via `ALLOWED_ORIGINS` env var):
- `http://localhost:3000`
- `http://127.0.0.1:3000`

---

## ⚙️ Environment Variables

| Variable          | Default                              | Description              |
|-------------------|--------------------------------------|--------------------------|
| `PORT`            | `5000`                               | Server port              |
| `JWT_SECRET`      | `furnish_india_super_secret_...`     | JWT signing secret       |
| `JWT_EXPIRES_IN`  | `2h`                                 | Token expiry duration    |
| `NODE_ENV`        | `development`                        | Runtime environment      |
| `ALLOWED_ORIGINS` | `http://localhost:3000,...`          | Comma-separated origins  |

> ⚠️ **Production Note:** Always override `JWT_SECRET` with a strong random secret in production. Use a `.env` file with `dotenv`.
