/**
 * authMiddleware.js
 * ------------------
 * Protects routes that require a valid JWT.
 *
 * Usage: add `authenticate` as middleware to any route that needs auth.
 *   e.g. router.post('/orders', authenticate, ordersController.placeOrder);
 *
 * The client must include the token in the Authorization header:
 *   Authorization: Bearer <token>
 */

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

/**
 * Middleware: authenticate
 * Verifies the Bearer token from the Authorization header.
 * Attaches the decoded payload (userId, email, role) to req.user.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message:
        "Access denied. No token provided. Include 'Authorization: Bearer <token>' in the request header.",
    });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    req.user = decodedPayload; // { userId, email, role, iat, exp }
    next();
  } catch (tokenError) {
    if (tokenError.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please log in again.",
      });
    }
    return res.status(403).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
}

/**
 * Middleware: authorizeAdmin
 * Ensures the authenticated user has the 'admin' role.
 * Must be used AFTER the `authenticate` middleware.
 */
function authorizeAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Forbidden. Admin privileges are required.",
  });
}

module.exports = { authenticate, authorizeAdmin };
