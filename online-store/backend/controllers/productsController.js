/**
 * productsController.js
 * ----------------------
 * Handles product-related request logic.
 *
 * Endpoints consumed by productsRoutes.js:
 *   GET /api/products        – list all products (supports category & search filters)
 *   GET /api/products/:id    – get a single product by its ID
 */

const allProducts = require("../data/products");

// ─── Controllers ───────────────────────────────────────────────────────────────

/**
 * GET /api/products
 * Returns all products.
 * Supports optional query parameters:
 *   ?category=<string>  – filter by category (case-insensitive)
 *   ?search=<string>    – search by name or description (case-insensitive)
 *   ?minPrice=<number>  – filter products with price >= minPrice
 *   ?maxPrice=<number>  – filter products with price <= maxPrice
 */
function getAllProducts(req, res, next) {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let filteredProducts = [...allProducts];

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLowerCase() === category.toLowerCase().trim()
      );
    }

    // Full-text search across name and description
    if (search) {
      const searchTerm = search.toLowerCase().trim();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }

    // Price range filter
    if (minPrice !== undefined) {
      const minimumPrice = parseFloat(minPrice);
      if (!isNaN(minimumPrice)) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minimumPrice
        );
      }
    }

    if (maxPrice !== undefined) {
      const maximumPrice = parseFloat(maxPrice);
      if (!isNaN(maximumPrice)) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price <= maximumPrice
        );
      }
    }

    return res.status(200).json({
      success: true,
      totalCount: filteredProducts.length,
      data: filteredProducts,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/products/:id
 * Returns a single product matching the given ID.
 * Responds with 404 if the product is not found.
 */
function getProductById(req, res, next) {
  try {
    const { id } = req.params;
    const product = allProducts.find(
      (p) => p.id.toLowerCase() === id.toLowerCase()
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID '${id}' was not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllProducts, getProductById };
