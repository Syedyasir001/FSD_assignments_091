import React from "react";

// [CONCEPT: Component-based UI - Reusable Item Component]
// Renders individual task state, badges, and triggers action handlers via props.
export default function TaskItem({ task, onToggle, onEdit, onDelete, isBeingEdited }) {
  // Priority color helper
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-badge priority-high";
      case "medium":
        return "priority-badge priority-medium";
      case "low":
        return "priority-badge priority-low";
      default:
        return "priority-badge";
    }
  };

  return (
    <div
      className={`task-item-card ${task.completed ? "task-completed" : ""} ${
        isBeingEdited ? "task-active-edit" : ""
      }`}
    >
      <div className="task-item-left">
        {/* [CONCEPT: Event Handling - Checkbox Toggle] */}
        <label className="checkbox-container" title="Mark complete/active">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="checkmark"></span>
        </label>

        <div className="task-details">
          <div className="task-header-row">
            <h4 className="task-title">{task.title}</h4>
            <div className="badge-group">
              <span className={getPriorityClass(task.priority)}>
                {task.priority}
              </span>
              {task.category && (
                <span className="category-badge">{task.category}</span>
              )}
            </div>
          </div>

          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          <div className="task-meta">
            <span className="task-date">
              Created {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* [CONCEPT: Event Handling - Edit and Delete buttons] */}
      <div className="task-item-actions">
        <button
          type="button"
          className="btn-icon btn-edit"
          onClick={() => onEdit(task)}
          title="Edit task"
          aria-label={`Edit ${task.title}`}
        >
          ✏️
        </button>

        <button
          type="button"
          className="btn-icon btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
          aria-label={`Delete ${task.title}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

