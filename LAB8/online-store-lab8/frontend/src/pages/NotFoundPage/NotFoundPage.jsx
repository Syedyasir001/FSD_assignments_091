/**
 * NotFoundPage.jsx
 * -----------------
 * 404 — Displayed for any unmatched route.
 */

import { Link, useLocation } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <main className="page-wrapper not-found-page">
      <div className="container not-found-page__inner">
        <div className="not-found-page__visual" aria-hidden="true">
          <span className="not-found-page__big-icon">🚪</span>
          <div className="not-found-page__error-code">404</div>
        </div>

        <div className="not-found-page__content">
          <h1 className="not-found-page__title">
            Page Not Found
          </h1>
          <p className="not-found-page__subtitle">
            The page you requested does not exist:
          </p>
          <code className="not-found-page__path">{location.pathname}</code>
          <p className="not-found-page__desc">
            It looks like this door opened to the wrong place. No worries — you can head
            back home or use the links below to find what you need.
          </p>

          <div className="not-found-page__actions">
            <Link to="/" className="btn btn-primary btn-lg">
              🏠 Go to Home
            </Link>
            <Link to="/products" className="btn btn-secondary btn-lg">
              🛋️ Browse Products
            </Link>
          </div>

          <div className="not-found-page__popular-links">
            <p>Or go to:</p>
            <div className="not-found-page__links">
              <Link to="/cart">🛒 My Cart</Link>
              <Link to="/orders">📦 My Orders</Link>
              <Link to="/account">👤 My Account</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
