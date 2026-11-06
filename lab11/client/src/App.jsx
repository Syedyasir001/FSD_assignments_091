import React, { useState, useEffect, useMemo, useCallback } from "react";
import Layout from "./components/Layout";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import { api } from "./services/api";
import "./App.css";

export default function App() {
  // [CONCEPT: Lifting State Up / Centralized State via useState]
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  // [CONCEPT: Filter State]
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    category: "all",
  });

  // Display a temporary user feedback notification
  const showFeedback = (message, type = "success") => {
    setActionFeedback({ message, type });
    setTimeout(() => {
      setActionFeedback(null);
    }, 3500);
  };

  // [CONCEPT: Fetching Data / Connecting to Backend API]
  const loadTasks = useCallback(async (currentFilters = filters) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.getTasks(currentFilters);
      setTasks(response.data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setError(err.message || "Could not connect to backend server.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Initial fetch and re-fetch when filters change (with debounce on search)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks(filters);
    }, 250); // Small debounce for search input

    return () => clearTimeout(timer);
  }, [filters, loadTasks]);

  // [CONCEPT: Derived State / Calculations]
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [tasks]);

  const uniqueCategories = useMemo(() => {
    const set = new Set(tasks.map((t) => t.category).filter(Boolean));
    return Array.from(set).sort();
  }, [tasks]);

  // [CONCEPT: Event Handlers - Form Submit for Create / Update]
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        // UPDATE existing task
        const response = await api.updateTask(editingTask.id, formData);
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? response.data : t))
        );
        setEditingTask(null);
        showFeedback("Task updated successfully!");
      } else {
        // CREATE new task
        const response = await api.createTask(formData);
        setTasks((prev) => [response.data, ...prev]);
        showFeedback("New task created!");
      }
    } catch (err) {
      console.error("Save task error:", err);
      alert(err.message || "Failed to save task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // [CONCEPT: Event Handler - Toggle Completion]
  const handleToggleTask = async (id) => {
    // Optimistic UI update
    const previousTasks = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      const response = await api.toggleTask(id);
      // Sync with server response
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? response.data : t))
      );
    } catch (err) {
      console.error("Toggle error:", err);
      setTasks(previousTasks); // Revert on failure
      alert("Failed to toggle task status.");
    }
  };

  // [CONCEPT: Event Handler - Delete Task]
  const handleDeleteTask = async (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    if (!taskToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${taskToDelete.title}"?`
    );
    if (!confirmDelete) return;

    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
      showFeedback("Task removed.", "info");
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Failed to delete task.");
    }
  };

  // [CONCEPT: Event Handler - Edit Trigger]
  const handleStartEdit = (task) => {
    setEditingTask(task);
    // Scroll form into view smoothly if on smaller screen
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      status: "all",
      priority: "all",
      category: "all",
    });
  };

  return (
    <Layout stats={stats}>
      {/* Toast feedback banner */}
      {actionFeedback && (
        <div className={`toast-banner toast-${actionFeedback.type}`}>
          {actionFeedback.message}
        </div>
      )}

      <div className="content-grid">
        {/* Left Column: Form & Filters */}
        <aside className="sidebar-column">
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
            editingTask={editingTask}
            isSubmitting={isSubmitting}
          />

          <TaskFilter
            filters={filters}
            categories={uniqueCategories}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Right Column: Task List */}
        <section className="main-column">
          <div className="section-header">
            <h2>
              {filters.status === "completed"
                ? "Completed Tasks"
                : filters.status === "active"
                ? "Active Tasks"
                : "All Tasks"}
            </h2>
            <span className="task-count-badge">
              {tasks.length} {tasks.length === 1 ? "item" : "items"}
            </span>
          </div>

          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            error={error}
            onRetry={() => loadTasks(filters)}
            onToggle={handleToggleTask}
            onEdit={handleStartEdit}
            onDelete={handleDeleteTask}
            editingTaskId={editingTask?.id}
          />
        </section>
      </div>
    </Layout>
  );
}

