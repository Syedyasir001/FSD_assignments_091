// [CONCEPT: Middleware - Request Logger]
// Logs every incoming HTTP request with its method, path, and response time.
export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Hook into response finish event to calculate elapsed time and status code
  res.on("finish", () => {
    const elapsed = Date.now() - start;
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${elapsed}ms)`
    );
  });

  next(); // Pass control to the next middleware/handler
};

