import express from "express";
import { taskStore } from "../data/taskStore.js";
import { validateTaskPayload } from "../middleware/validation.js";

const router = express.Router();

// [CONCEPT: RESTful Routes & HTTP Verbs/Status Codes]

// 1. GET ALL: List tasks with optional query filters (?search=...&status=...&priority=...)
// HTTP 200 OK
router.get("/", (req, res, next) => {
  try {
    const { search, status, priority, category } = req.query;
    const tasks = taskStore.findAll({ search, status, priority, category });
    res.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (err) {
    next(err); // Forward unexpected errors to centralized error handler
  }
});

// 2. GET ONE: Retrieve a single task by ID
// HTTP 200 OK or 404 Not Found
router.get("/:id", (req, res, next) => {
  try {
    const task = taskStore.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${req.params.id} does not exist.`,
      });
    }
    res.status(200).json({ data: task });
  } catch (err) {
    next(err);
  }
});

// 3. POST CREATE: Add a new task
// HTTP 201 Created (with validation middleware)
router.post("/", validateTaskPayload(false), (req, res, next) => {
  try {
    const { title, description, category, priority } = req.body;
    const newTask = taskStore.create({ title, description, category, priority });
    res.status(201).json({
      message: "Task created successfully.",
      data: newTask,
    });
  } catch (err) {
    next(err);
  }
});

// 4. PUT UPDATE: Update an existing task
// HTTP 200 OK or 404 Not Found
router.put("/:id", validateTaskPayload(true), (req, res, next) => {
  try {
    const updatedTask = taskStore.update(req.params.id, req.body);
    if (!updatedTask) {
      return res.status(404).json({
        error: "Not Found",
        message: `Cannot update: Task with ID ${req.params.id} not found.`,
      });
    }
    res.status(200).json({
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
});

// 5. PATCH TOGGLE: Convenience route to toggle task completion status
// HTTP 200 OK
router.patch("/:id/toggle", (req, res, next) => {
  try {
    const existing = taskStore.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${req.params.id} not found.`,
      });
    }

    const updatedTask = taskStore.update(req.params.id, {
      completed: !existing.completed,
    });

    res.status(200).json({
      message: `Task marked as ${updatedTask.completed ? "completed" : "active"}.`,
      data: updatedTask,
    });
  } catch (err) {
    next(err);
  }
});

// 6. DELETE: Remove a task
// HTTP 200 OK or 404 Not Found
router.delete("/:id", (req, res, next) => {
  try {
    const deleted = taskStore.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        error: "Not Found",
        message: `Cannot delete: Task with ID ${req.params.id} not found.`,
      });
    }
    res.status(200).json({
      message: `Task with ID ${req.params.id} was deleted successfully.`,
      deletedId: Number(req.params.id),
    });
  } catch (err) {
    next(err);
  }
});

export default router;

