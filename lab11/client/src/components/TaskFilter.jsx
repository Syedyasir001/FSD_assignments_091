import React from "react";

// [CONCEPT: Reusable Filter & Search Component]
// Controlled form elements communicating state changes upward via props.
export default function TaskFilter({ filters, categories, onFilterChange, onReset }) {
  // [CONCEPT: Event Handling]
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.category !== "all";

  return (
    <div className="filter-card">
      <div className="filter-grid">
        {/* Search input */}
        <div className="filter-field search-field">
          <label htmlFor="search-input">Search Tasks</label>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              id="search-input"
              type="text"
              name="search"
              placeholder="Filter by keyword..."
              value={filters.search}
              onChange={handleInputChange}
            />
            {filters.search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onFilterChange({ ...filters, search: "" })}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Status filter */}
        <div className="filter-field">
          <label htmlFor="status-select">Status</label>
          <select
            id="status-select"
            name="status"
            value={filters.status}
            onChange={handleInputChange}
          >
            <option value="all">All Tasks</option>
            <option value="active">Active Only</option>
            <option value="completed">Completed Only</option>
          </select>
        </div>

        {/* Priority filter */}
        <div className="filter-field">
          <label htmlFor="priority-select">Priority</label>
          <select
            id="priority-select"
            name="priority"
            value={filters.priority}
            onChange={handleInputChange}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Category filter */}
        <div className="filter-field">
          <label htmlFor="category-select">Category</label>
          <select
            id="category-select"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="filter-actions">
          <span className="active-filter-indicator">Filtered view active</span>
          <button type="button" className="btn-text" onClick={onReset}>
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

