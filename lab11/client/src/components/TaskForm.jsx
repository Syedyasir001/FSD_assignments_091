import React, { useState, useEffect } from "react";

// [CONCEPT: Reusable Form Component with Props & Local State]
// Serves both creation and editing flows depending on the presence of `editingTask`.
export default function TaskForm({ onSubmit, onCancel, editingTask, isSubmitting }) {
  // [CONCEPT: Local Component State via useState]
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    priority: "medium",
  });
  const [validationError, setValidationError] = useState("");

  // Sync form state when editingTask prop changes (or reset on cancel)
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        category: editingTask.category || "General",
        priority: editingTask.priority || "medium",
      });
      setValidationError("");
    } else {
      setFormData({
        title: "",
        description: "",
        category: "General",
        priority: "medium",
      });
      setValidationError("");
    }
  }, [editingTask]);

  // [CONCEPT: Event Handling - Controlled Input Changes]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError && name === "title" && value.trim()) {
      setValidationError("");
    }
  };

  // [CONCEPT: Event Handling - Form Submission with Validation]
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setValidationError("Please enter a task title.");
      return;
    }

    // Pass data up to parent component (lifting state up)
    onSubmit(formData);
  };

  const isEditing = Boolean(editingTask);

  return (
    <div className={`task-form-card ${isEditing ? "editing-mode" : ""}`}>
      <div className="form-header">
        <h3>{isEditing ? "✏️ Edit Task" : "➕ Create New Task"}</h3>
        {isEditing && (
          <span className="editing-badge">Editing Task #{editingTask.id}</span>
        )}
      </div>

      {validationError && (
        <div className="form-error-alert" role="alert">
          {validationError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="task-title">
            Title <span className="required-star">*</span>
          </label>
          <input
            id="task-title"
            type="text"
            name="title"
            placeholder="e.g. Implement user authentication"
            value={formData.title}
            onChange={handleChange}
            maxLength={120}
            required
            autoFocus={isEditing}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description (optional)</label>
          <textarea
            id="task-desc"
            name="description"
            rows="3"
            placeholder="Add relevant details, requirements, or links..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="task-category">Category</label>
            <input
              id="task-category"
              type="text"
              name="category"
              placeholder="e.g. Frontend, Backend, Docs"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group half">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : isEditing
              ? "Update Task"
              : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

