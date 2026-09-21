/**
 * ProductCard.jsx
 * ----------------
 * Reusable card component for a single product.
 *
 * Prices are formatted with Intl.NumberFormat('en-IN') — the Indian numbering
 * system — and prefixed with the ₹ symbol.
 *   e.g. 150000 → "₹1,50,000"
 *
 * Clicking the card title or image navigates to /products/:id (the Details page).
 * The "Add to Cart" button adds the item to the global cart context.
 *
 * Props:
 *   product {Object} – a single product object from the backend API with shape:
 *     { id, name, category, price, stock, description }
 */

import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ProductImage from '../ProductImage/ProductImage';
import './ProductCard.css';

/** Maps category names to decorative emoji icons */
const CATEGORY_ICONS = {
  'Bedroom':     '🛏️',
  'Living Room': '🛋️',
  'Dining Room': '🍽️',
  'Outdoor':     '🌿',
  'Study':       '📚',
  'Hallway':     '🚪',
};

/**
 * Formats a number using the Indian numbering system with the ₹ symbol.
 * Uses the built-in Intl.NumberFormat with the 'en-IN' locale.
 *
 * Examples:
 *   formatRupees(42000)   → "₹42,000"
 *   formatRupees(150000)  → "₹1,50,000"
 *   formatRupees(9800)    → "₹9,800"
 *
 * @param {number} amountInRupees
 * @returns {string}
 */
function formatRupees(amountInRupees) {
  const indianFormatter = new Intl.NumberFormat('en-IN', {
    style:    'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // No paise — furniture prices are whole rupees
  });
  return indianFormatter.format(amountInRupees);
}

export default function ProductCard({ product }) {
  const { addItemToCart, cartItems } = useCart();

  const isOutOfStock  = product.stock === 0;
  const cartEntry     = cartItems.find((item) => item.id === product.id);
  const isMaxInCart   = cartEntry && cartEntry.quantity >= product.stock;
  const categoryIcon  = CATEGORY_ICONS[product.category] || '🪑';
  const isLowStock    = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent card Link from navigating
    if (!isOutOfStock && !isMaxInCart) {
      addItemToCart(product, 1);
    }
  };

  return (
    <article
      className={`product-card ${isOutOfStock ? 'product-card--out-of-stock' : ''}`}
      aria-label={`Product: ${product.name}, Price: ${formatRupees(product.price)}`}
    >
      {/* ── Product Image / Visual Area ────────────────────────────────── */}
      <Link
        to={`/products/${product.id}`}
        className="product-card__image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="product-card__image-wrapper">
          <ProductImage
            className="product-card__image"
            image={product.image}
            alt={product.name}
            fallback={
              <div className="product-card__image-placeholder">
                <span className="product-card__category-icon">{categoryIcon}</span>
              </div>
            }
          />

          {/* Category label overlay */}
          <span className="product-card__category-badge">{product.category}</span>

          {/* Out-of-stock overlay */}
          {isOutOfStock && (
            <div className="product-card__out-of-stock-overlay">
              <span>Out of Stock</span>
            </div>
          )}

          {/* Low stock warning overlay */}
          {isLowStock && !isOutOfStock && (
            <span className="product-card__low-stock-badge">
              ⚡ Only {product.stock} left!
            </span>
          )}
        </div>
      </Link>

      {/* ── Product Info ───────────────────────────────────────────────── */}
      <div className="product-card__body">

        {/* Product ID (for reference) */}
        <span className="product-card__id">{product.id}</span>

        {/* Product name — navigates to details page on click */}
        <Link to={`/products/${product.id}`} className="product-card__name-link">
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        {/* Truncated description */}
        <p className="product-card__description">{product.description}</p>

        {/* ── Footer: Price + Action ──────────────────────────────────── */}
        <div className="product-card__footer">
          <div className="product-card__price-block">
            {/*
             * Price displayed using Intl.NumberFormat('en-IN') via formatRupees().
             * The ₹ symbol comes from the 'currency: INR' option — NOT from CSS ::before.
             * This ensures screen readers announce the price correctly.
             */}
            <span className="product-card__price" aria-label={`Price: ${formatRupees(product.price)}`}>
              {formatRupees(product.price)}
            </span>
            <span className="product-card__gst-note">+ 18% GST</span>
          </div>

          <button
            className={`btn btn-sm product-card__cart-btn ${
              isOutOfStock || isMaxInCart ? 'btn-secondary' : 'btn-primary'
            }`}
            onClick={handleAddToCart}
            disabled={isOutOfStock || isMaxInCart}
            aria-label={
              isOutOfStock
                ? `${product.name} is out of stock`
                : isMaxInCart
                ? `${product.name} is already at maximum quantity in your cart`
                : `Add ${product.name} to cart`
            }
          >
            {isOutOfStock
              ? 'Out of Stock'
              : isMaxInCart
              ? '✓ In Cart'
              : '🛒 Add to Cart'}
          </button>
        </div>

        {/* Stock indicator bar */}
        <div className="product-card__stock-row">
          <span
            className={`badge ${
              product.stock === 0
                ? 'badge-red'
                : isLowStock
                ? 'badge-saffron'
                : 'badge-green'
            }`}
          >
            {product.stock === 0
              ? 'Out of Stock'
              : isLowStock
              ? `Only ${product.stock} left`
              : `${product.stock} in stock`}
          </span>
        </div>
      </div>
    </article>
  );
}
