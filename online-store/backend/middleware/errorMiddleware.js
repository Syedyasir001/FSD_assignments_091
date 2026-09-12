/**
 * errorMiddleware.js
 * -------------------
 * Centralised error-handling middleware for Express.
 * Must be registered LAST in the middleware chain (after all routes).
 *
 * Express identifies error-handling middleware by its 4-parameter signature:
 *   (err, req, res, next)
 */

/**
 * Handles 404 Not Found errors for unknown routes.
 */
function notFoundHandler(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

/**
 * Global error handler — catches errors passed via next(err).
 */
function globalErrorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected server error occurred.";

  console.error(
    `[ERROR] ${new Date().toISOString()} | ${statusCode} | ${req.method} ${req.originalUrl} | ${message}`
  );

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

module.exports = { notFoundHandler, globalErrorHandler };
