/**
 * Navbar.jsx
 * -----------
 * Top navigation bar with logo, nav links, cart badge, and user menu.
 * Becomes translucent on scroll and collapses to a hamburger on mobile.
 */

import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const { isLoggedIn, currentUser, logoutUser } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  /** Detect scroll to apply glass effect */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** Close mobile menu on route change */
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logoutUser();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link to="/" className="navbar__logo" onClick={closeMobileMenu}>
          <span className="navbar__logo-icon">🪑</span>
          <span className="navbar__logo-text">
            <span className="navbar__logo-primary">Kaarya</span>
            <span className="navbar__logo-secondary">Griha</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ─────────────────────────────────────────── */}
        <nav className="navbar__links" aria-label="Primary navigation">
          <NavLink to="/"        className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'} end>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
            Products
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/orders" className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}>
              My Orders
            </NavLink>
          )}
        </nav>

        {/* ── Right Actions ─────────────────────────────────────────────── */}
        <div className="navbar__actions">

          {/* Cart Icon */}
          <Link to="/cart" className="navbar__cart-btn" aria-label="Open cart">
            <span className="navbar__cart-icon">🛒</span>
            {cartItemCount > 0 && (
              <span className="navbar__cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
            )}
          </Link>

          {/* User Menu */}
          {isLoggedIn ? (
            <div className="navbar__user-menu" onMouseLeave={() => setIsUserDropdownOpen(false)}>
              <button
                className="navbar__user-btn"
                onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                aria-label="User menu"
                aria-expanded={isUserDropdownOpen}
              >
                <span className="navbar__user-avatar">
                  {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                </span>
                <span className="navbar__user-name">{currentUser?.name?.split(' ')[0]}</span>
                <span className="navbar__chevron">{isUserDropdownOpen ? '▲' : '▼'}</span>
              </button>

              {isUserDropdownOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-name">{currentUser?.name}</p>
                    <p className="navbar__dropdown-email">{currentUser?.email}</p>
                  </div>
                  <hr className="navbar__dropdown-divider" />
                  <Link to="/orders" className="navbar__dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
                    📦 My Orders
                  </Link>
                  <Link to="/account" className="navbar__dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
                    👤 My Account
                  </Link>
                  <hr className="navbar__dropdown-divider" />
                  <button className="navbar__dropdown-item navbar__dropdown-logout" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/account" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          {/* Hamburger (mobile only) */}
          <button
            className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────────────────────── */}
      {isMobileMenuOpen && (
        <nav className="navbar__mobile-menu" aria-label="Mobile navigation">
          <NavLink to="/"        onClick={closeMobileMenu} end>Home</NavLink>
          <NavLink to="/products" onClick={closeMobileMenu}>Products</NavLink>
          <NavLink to="/cart"     onClick={closeMobileMenu}>Cart ({cartItemCount})</NavLink>
          {isLoggedIn && (
            <NavLink to="/orders" onClick={closeMobileMenu}>My Orders</NavLink>
          )}
          {isLoggedIn ? (
            <button className="navbar__mobile-logout" onClick={() => { handleLogout(); closeMobileMenu(); }}>
              Logout
            </button>
          ) : (
            <NavLink to="/account" onClick={closeMobileMenu}>Login</NavLink>
          )}
        </nav>
      )}
    </header>
  );
}
