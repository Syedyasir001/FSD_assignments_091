// [CONCEPT: Middleware - Input Validation]
// Validates incoming payload before hitting controller/route logic.
// Returns early with HTTP 400 Bad Request if fields are invalid or missing.

const ALLOWED_PRIORITIES = ["low", "medium", "high"];

export const validateTaskPayload = (isUpdate = false) => {
  return (req, res, next) => {
    const { title, priority } = req.body;

    // For creation, title is required. For update, it is validated if provided.
    if (!isUpdate || title !== undefined) {
      if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          error: "Validation Error",
          message: "Title is required and must be a non-empty string.",
        });
      }

      if (title.trim().length > 120) {
        return res.status(400).json({
          error: "Validation Error",
          message: "Title must be 120 characters or fewer.",
        });
      }
    }

    // Validate priority if provided
    if (priority !== undefined) {
      if (typeof priority !== "string" || !ALLOWED_PRIORITIES.includes(priority.toLowerCase())) {
        return res.status(400).json({
          error: "Validation Error",
          message: `Priority must be one of: ${ALLOWED_PRIORITIES.join(", ")}.`,
        });
      }
    }

    next();
  };
};

