import express from "express";
import cors from "cors";
import { requestLogger } from "./middleware/logger.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = process.env.PORT || 5000;

// [CONCEPT: Middleware - Built-in & Third-party]
// 1. CORS: Enable Cross-Origin requests from the frontend (Vite dev server)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2. Body Parser: Parse incoming JSON request bodies into req.body
app.use(express.json());

// 3. Custom Request Logger: Log all incoming requests
app.use(requestLogger);

// [CONCEPT: REST API Routes]
// Health check route
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Resource routes for tasks
app.use("/api/tasks", taskRoutes);

// [CONCEPT: Middleware - Error Handling]
// Handle 404 for unknown endpoints (must come after routes)
app.use(notFoundHandler);

// Centralized error handling middleware (must be the final app.use)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/tasks`);
});

export default app;

