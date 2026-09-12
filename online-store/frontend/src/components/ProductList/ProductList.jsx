/**
 * ProductList.jsx
 * ----------------
 * Reusable component that renders a responsive grid of ProductCard components.
 *
 * Handles three render states internally:
 *   1. isLoading — shows skeleton placeholders
 *   2. error     — shows an error panel with a retry button
 *   3. Empty     — shows a "no results" state
 *   4. Products  — renders the grid
 *
 * Props:
 *   products  {Array}     – array of product objects from the API
 *   isLoading {boolean}   – true while the API request is in-flight
 *   error     {string|null} – error message to display (null = no error)
 *   onRetry   {Function}  – called when the user clicks "Try Again"
 *   emptyMessage {string} – custom message when products array is empty
 *   skeletonCount {number} – how many skeleton cards to show while loading
 */

import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const DEFAULT_EMPTY_MESSAGE = 'No products match your current filters.';
const DEFAULT_SKELETON_COUNT = 8;

export default function ProductList({
  products,
  isLoading,
  error,
  onRetry,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  skeletonCount = DEFAULT_SKELETON_COUNT,
}) {

  /* ── Loading State: Skeleton Cards ─────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="product-list product-list--loading" aria-busy="true" aria-label="Loading products">
        <div className="products-grid">
          {Array.from({ length: skeletonCount }, (_, index) => (
            <div
              key={`skeleton-${index}`}
              className="skeleton product-list__skeleton-card"
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="product-list__loading-label" aria-live="polite">
          Loading products from the server...
        </p>
      </div>
    );
  }

  /* ── Error State ────────────────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="product-list product-list--error" role="alert">
        <div className="product-list__error-card">
          <span className="product-list__error-icon">⚠️</span>
          <h3 className="product-list__error-title">Could Not Load Products</h3>
          <p className="product-list__error-message">{error}</p>
          {typeof onRetry === 'function' && (
            <button
              className="btn btn-primary"
              onClick={onRetry}
              id="product-list-retry-btn"
            >
              🔄 Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Empty State ────────────────────────────────────────────────────────── */
  if (!products || products.length === 0) {
    return (
      <div className="product-list product-list--empty">
        <div className="empty-state">
          <span className="empty-state-icon">🔍</span>
          <h3>No Products Found</h3>
          <p>{emptyMessage}</p>
          {typeof onRetry === 'function' && (
            <button
              className="btn btn-primary"
              onClick={onRetry}
              id="product-list-clear-btn"
            >
              View All Products
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Products Grid ──────────────────────────────────────────────────────── */
  return (
    <section
      className="product-list product-list--loaded fade-in"
      aria-label={`${products.length} product${products.length !== 1 ? 's' : ''} available`}
    >
      <div className="products-grid">
        {products.map((product) => (
          /*
           * key={product.id} uses the stable backend ID, not the array index,
           * so React can efficiently reconcile the list on re-renders.
           */
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
