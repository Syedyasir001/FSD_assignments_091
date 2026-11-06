import React from "react";

// [CONCEPT: Component-based UI - Layout Component]
// Provides consistent shell, header, and metrics summary across the app.
export default function Layout({ children, stats }) {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">✓</div>
          <div>
            <h1>TaskFlow</h1>
            <p className="subtitle">Full-Stack React + Express Task Manager</p>
          </div>
        </div>

        {/* [CONCEPT: Props for Data Flow - Stats passed from App state] */}
        {stats && (
          <div className="stats-badges">
            <div className="stat-pill">
              <span className="stat-label">Total</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-pill stat-active">
              <span className="stat-label">Active</span>
              <span className="stat-value">{stats.active}</span>
            </div>
            <div className="stat-pill stat-completed">
              <span className="stat-label">Done</span>
              <span className="stat-value">{stats.completed}</span>
            </div>
          </div>
        )}
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <p>Built with React (Vite) + Node.js (Express) • REST API</p>
      </footer>
    </div>
  );
}

