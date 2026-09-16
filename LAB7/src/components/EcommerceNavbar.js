import React from 'react';

/**
 * E-Commerce Navigation Bar Component
 * Provides store branding, quick navigation, cart item counter, and Express backend connectivity badge.
 */
function EcommerceNavbar({ cartCount = 0, serverOnline = true }) {
  return (
    <header className="store-navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="store-brand">
          <span className="brand-icon">⚡</span>
          <div className="brand-text">
            <span className="brand-title">TECHVAULT</span>
            <span className="brand-tagline">Premium Hardware & Member Club</span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="nav-menu">
          <a href="#catalog-section" className="nav-link">Catalog</a>
          <a href="#lab-components-section" className="nav-link">Lab Components</a>
          <a href="#tutorial-components-section" className="nav-link">Tutorial Components</a>
          <a href="#api-status-section" className="nav-link">API Routes</a>
        </nav>

        {/* Right Actions: Express API Status & Cart Badge */}
        <div className="navbar-actions">
          <div className={`backend-indicator ${serverOnline ? 'online' : 'offline'}`} title="Node.js + Express API on Port 5000">
            <span className="dot"></span>
            <span className="indicator-text">{serverOnline ? 'Express API Live' : 'API Connecting...'}</span>
          </div>

          <div className="cart-indicator-button" title="View Cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-badge">{cartCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default EcommerceNavbar;
