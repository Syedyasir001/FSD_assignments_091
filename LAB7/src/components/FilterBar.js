import React from 'react';

const CATEGORIES = ['All', 'Home Decor', 'Workspace', 'Textiles', 'Lighting', 'Kitchen', 'Wall Art'];

function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      {CATEGORIES.map(category => (
        <button
          key={category}
          className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
