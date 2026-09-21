/**
 * server.js
 * ----------
 * Entry point for the Furnish India Online Store Backend.
 *
 * Architecture overview:
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │  Express App                                                │
 *   │   ├── Global Middleware (CORS, JSON parser, request logger) │
 *   │   ├── Routes                                                │
 *   │   │    ├── /api/auth      → authRoutes.js                   │
 *   │   │    ├── /api/products  → productsRoutes.js               │
 *   │   │    └── /api/orders    → ordersRoutes.js                 │
 *   │   └── Error Middleware (404 handler, global error handler)  │
 *   └─────────────────────────────────────────────────────────────┘
 *
 * Start with:
 *   npm run dev   (development – auto-reloads with nodemon)
 *   npm start     (production)
 */

const path = require("path");
const express = require("express");
const cors = require("cors");

const { PORT, ALLOWED_ORIGINS, NODE_ENV } = require("./config/env");

// ── Route Modules ──────────────────────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");

// ── Error Middleware ───────────────────────────────────────────────────────────
const { notFoundHandler, globalErrorHandler } = require("./middleware/errorMiddleware");

// ─── App Initialisation ────────────────────────────────────────────────────────
const app = express();

// ── Global Middleware ──────────────────────────────────────────────────────────

// CORS – allow requests from the configured frontend origins
app.use(
  cors({
    origin: function (requestOrigin, callback) {
      // Allow requests with no origin (e.g., curl, Postman, mobile apps)
      if (!requestOrigin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(requestOrigin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS policy: origin '${requestOrigin}' is not allowed.`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ── Request Logger ─────────────────────────────────────────────────────────────
app.use((req, _res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── Health Check Endpoint ──────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🪑 Furnish India API is up and running.",
    version: "1.0.0",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        profile: "GET /api/auth/profile  [protected]",
      },
      products: {
        listAll: "GET /api/products",
        getById: "GET /api/products/:id",
      },
      orders: {
        placeOrder: "POST /api/orders  [protected]",
        getOrders: "GET  /api/orders  [protected]",
      },
    },
  });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
// Serve product images (SVG illustrations) as static assets
app.use(
  "/images/products",
  express.static(path.join(__dirname, "public/images/products"))
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

// ── Error Handling Middleware (must be LAST) ───────────────────────────────────
app.use(notFoundHandler);
app.use(globalErrorHandler);

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║       🪑  Furnish India — Backend Server         ║");
  console.log("╠══════════════════════════════════════════════════╣");
  console.log(`║  Status      : Running                           ║`);
  console.log(`║  Environment : ${NODE_ENV.padEnd(34)}║`);
  console.log(`║  Port        : ${String(PORT).padEnd(34)}║`);
  console.log(`║  URL         : http://localhost:${String(PORT).padEnd(18)}║`);
  console.log("╚══════════════════════════════════════════════════╝");
});

module.exports = app; // Export for testing purposes
