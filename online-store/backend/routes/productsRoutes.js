/**
 * productsRoutes.js
 * ------------------
 * Mounts product-related routes under /api/products.
 *
 *   GET /api/products          – fetch all products (with optional filters)
 *   GET /api/products/:id      – fetch a single product by ID
 */

const express = require("express");
const { getAllProducts, getProductById } = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getProductById);

module.exports = productsRouter;
