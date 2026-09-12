/**
 * ordersRoutes.js
 * ----------------
 * Mounts order-related routes under /api/orders.
 * All endpoints require authentication (JWT).
 *
 *   POST /api/orders   – place a new order
 *   GET  /api/orders   – retrieve orders (own orders for customers; all for admins)
 */

const express = require("express");
const { placeOrder, getOrders } = require("../controllers/ordersController");
const { authenticate } = require("../middleware/authMiddleware");

const ordersRouter = express.Router();

ordersRouter.post("/", authenticate, placeOrder);   // Protected
ordersRouter.get("/", authenticate, getOrders);      // Protected

module.exports = ordersRouter;
