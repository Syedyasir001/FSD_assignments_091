// [CONCEPT: Middleware - Centralized Error Handler]
// Catches unhandled errors across all routes and sends a clean JSON error response.

// 404 Not Found handler for undefined routes
export const notFoundHandler = (req, res, _next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};

// Centralized error handler (4 arguments identify it to Express as error-handling middleware)
export const errorHandler = (err, _req, res, _next) => {
  console.error("Centralized Error Caught:", err);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: err.name || "InternalError",
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

