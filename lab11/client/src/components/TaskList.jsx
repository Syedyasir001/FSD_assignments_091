import React from "react";
import TaskItem from "./TaskItem";

// [CONCEPT: Reusable List Component with Loading and Error States]
export default function TaskList({
  tasks,
  isLoading,
  error,
  onRetry,
  onToggle,
  onEdit,
  onDelete,
  editingTaskId,
}) {
  // [CONCEPT: Loading State]
  if (isLoading) {
    return (
      <div className="state-card loading-state">
        <div className="spinner"></div>
        <p>Loading tasks from server...</p>
      </div>
    );
  }

  // [CONCEPT: Error State with Retry Handler]
  if (error) {
    return (
      <div className="state-card error-state" role="alert">
        <div className="error-icon">⚠️</div>
        <h3>Failed to load tasks</h3>
        <p className="error-text">{error}</p>
        <button type="button" className="btn btn-secondary" onClick={onRetry}>
          Try Again
        </button>
      </div>
    );
  }

  // [CONCEPT: Empty State]
  if (!tasks || tasks.length === 0) {
    return (
      <div className="state-card empty-state">
        <div className="empty-icon">📋</div>
        <h3>No tasks found</h3>
        <p>There are no tasks matching your current filters, or none have been added yet.</p>
      </div>
    );
  }

  // [CONCEPT: List Rendering & Data Flow via Props]
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          isBeingEdited={editingTaskId === task.id}
        />
      ))}
    </div>
  );
}

