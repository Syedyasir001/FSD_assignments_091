/**
 * ordersController.js
 * --------------------
 * Handles order placement and retrieval.
 *
 * Endpoints consumed by ordersRoutes.js:
 *   POST /api/orders   – place a new order (protected: requires authentication)
 *   GET  /api/orders   – retrieve orders (admin: all orders; customer: own orders)
 */

const { v4: generateUUID } = require("uuid");
const allProducts = require("../data/products");
const orders = require("../data/orders");

// ─── Controllers ───────────────────────────────────────────────────────────────

/**
 * POST /api/orders
 * Places a new order. Requires authentication (JWT).
 *
 * Expected request body:
 * {
 *   "items": [
 *     { "productId": "PROD-001", "quantity": 2 },
 *     { "productId": "PROD-005", "quantity": 1 }
 *   ],
 *   "shippingAddress": {
 *     "fullName": "Rajan Sharma",
 *     "street": "12, MG Road",
 *     "city": "Bengaluru",
 *     "state": "Karnataka",
 *     "pincode": "560001",
 *     "phone": "9876543210"
 *   }
 * }
 */
function placeOrder(req, res, next) {
  try {
    const { items, shippingAddress } = req.body;
    const { userId, email } = req.user; // Injected by authenticate middleware

    // ── Validate request body ───────────────────────────────────────────────
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item in the 'items' array.",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "A 'shippingAddress' object is required.",
      });
    }

    const requiredAddressFields = [
      "fullName",
      "street",
      "city",
      "state",
      "pincode",
      "phone",
    ];
    const missingAddressFields = requiredAddressFields.filter(
      (field) => !shippingAddress[field]
    );

    if (missingAddressFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required shipping address fields: ${missingAddressFields.join(", ")}.`,
      });
    }

    // ── Validate each order item and build order line items ─────────────────
    const resolvedOrderItems = [];
    const stockErrors = [];

    for (const orderItem of items) {
      const { productId, quantity } = orderItem;

      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message:
            "Each item must have a 'productId' and a 'quantity' greater than zero.",
        });
      }

      const parsedQuantity = parseInt(quantity, 10);
      if (isNaN(parsedQuantity) || parsedQuantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity '${quantity}' for product '${productId}'. Quantity must be a positive integer.`,
        });
      }

      const matchedProduct = allProducts.find(
        (p) => p.id.toLowerCase() === productId.toLowerCase()
      );

      if (!matchedProduct) {
        return res.status(404).json({
          success: false,
          message: `Product with ID '${productId}' does not exist in our catalogue.`,
        });
      }

      if (matchedProduct.stock < parsedQuantity) {
        stockErrors.push(
          `'${matchedProduct.name}' only has ${matchedProduct.stock} unit(s) in stock (requested ${parsedQuantity}).`
        );
        continue;
      }

      resolvedOrderItems.push({
        productId: matchedProduct.id,
        productName: matchedProduct.name,
        category: matchedProduct.category,
        image: matchedProduct.image,
        unitPrice: matchedProduct.price,
        quantity: parsedQuantity,
        lineTotal: matchedProduct.price * parsedQuantity,
      });
    }

    if (stockErrors.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Insufficient stock for one or more items.",
        details: stockErrors,
      });
    }

    // ── Compute order totals ────────────────────────────────────────────────
    const subtotalAmount = resolvedOrderItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );
    const gstRate = 0.18; // 18% GST
    const gstAmount = parseFloat((subtotalAmount * gstRate).toFixed(2));
    const shippingCharge = subtotalAmount >= 50000 ? 0 : 999; // Free shipping above ₹50,000
    const grandTotalAmount = subtotalAmount + gstAmount + shippingCharge;

    // ── Deduct stock ────────────────────────────────────────────────────────
    resolvedOrderItems.forEach((orderedItem) => {
      const productToUpdate = allProducts.find(
        (p) => p.id === orderedItem.productId
      );
      if (productToUpdate) {
        productToUpdate.stock -= orderedItem.quantity;
      }
    });

    // ── Persist order to in-memory store ────────────────────────────────────
    const newOrder = {
      orderId: `ORD-${generateUUID().slice(0, 8).toUpperCase()}`,
      userId,
      userEmail: email,
      items: resolvedOrderItems,
      shippingAddress,
      pricing: {
        subtotal: subtotalAmount,
        gst: gstAmount,
        shippingCharge,
        grandTotal: parseFloat(grandTotalAmount.toFixed(2)),
      },
      status: "Confirmed",
      placedAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    return res.status(201).json({
      success: true,
      message: "Your order has been placed successfully. Thank you for shopping with Furnish India!",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/orders
 * Retrieves orders. Requires authentication (JWT).
 *   - Admin users  → see all orders
 *   - Customers    → see only their own orders
 *
 * Supports optional query:
 *   ?status=<string>   – filter by order status (e.g., Confirmed, Shipped)
 */
function getOrders(req, res, next) {
  try {
    const { userId, role } = req.user;
    const { status } = req.query;

    let resultOrders = [];

    if (role === "admin") {
      resultOrders = [...orders]; // Admin sees all orders
    } else {
      resultOrders = orders.filter((order) => order.userId === userId);
    }

    // Optional status filter
    if (status) {
      resultOrders = resultOrders.filter(
        (order) => order.status.toLowerCase() === status.toLowerCase().trim()
      );
    }

    return res.status(200).json({
      success: true,
      totalCount: resultOrders.length,
      data: resultOrders,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { placeOrder, getOrders };
