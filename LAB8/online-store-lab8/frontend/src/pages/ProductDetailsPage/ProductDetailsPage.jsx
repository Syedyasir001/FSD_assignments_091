/**
 * ProductDetailsPage.jsx
 * -----------------------
 * Shows the full details of a single product fetched via GET /api/products/:id.
 *
 * Data flow:
 *   1. `productId` is extracted from the URL (/products/:productId).
 *   2. `useProductById(productId)` fires a real HTTP request on mount.
 *   3. Distinct error states: 404 (not found) vs network/server failure.
 *   4. Prices are formatted with Intl.NumberFormat('en-IN', { currency: 'INR' }).
 *   5. A related products section uses `useProducts()` to fetch the full list
 *      and filters by same category client-side.
 *   6. Every page refresh = new mount = new API call for both hooks.
 */

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductById } from '../../hooks/useProductById';
import { useProducts }    from '../../hooks/useProducts';
import { useCart }        from '../../context/CartContext';
import ProductList        from '../../components/ProductList/ProductList';
import ProductImage       from '../../components/ProductImage/ProductImage';
import './ProductDetailsPage.css';

const CATEGORY_ICONS = {
  'Bedroom':     '🛏️',
  'Living Room': '🛋️',
  'Dining Room': '🍽️',
  'Outdoor':     '🌿',
  'Study':       '📚',
  'Hallway':     '🚪',
};

/**
 * Formats a number using the Indian numbering system (en-IN) with the ₹ symbol.
 * Uses Intl.NumberFormat internally — same as the ProductCard component.
 *
 * @param {number} amountInRupees
 * @returns {string}  e.g. ₹1,50,000
 */
function formatRupees(amount) {
  return new Intl.NumberFormat('en-IN', {
    style:                'currency',
    currency:             'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ProductDetailsPage() {
  const { productId } = useParams();   // e.g. "PROD-001"
  const navigate      = useNavigate();
  const { addItemToCart, cartItems } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addedToCartMsg,   setAddedToCartMsg]   = useState('');

  /*
   * ── Fetch the specific product via the hook ──────────────────────────────
   *   GET /api/products/:productId
   *   Hook fires on mount and on productId change (navigating between products).
   *   Returns isNotFound=true when the API responds with 404.
   */
  const {
    product,
    isLoading,
    error,
    isNotFound,
    refetch,
  } = useProductById(productId);

  /*
   * ── Fetch all products for the "Related Products" section ──────────────
   *   GET /api/products (same hook, different usage)
   */
  const { products: allProducts } = useProducts();

  /* ── Derived state ──────────────────────────────────────────────────────── */
  const cartEntry  = cartItems.find((item) => item.id === productId);
  const qtyInCart  = cartEntry?.quantity || 0;
  const maxAddable = product ? product.stock - qtyInCart : 0;

  const relatedProducts = product
    ? allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3)
    : [];

  /* ── Cart actions ───────────────────────────────────────────────────────── */
  const handleAddToCart = () => {
    if (!product || maxAddable <= 0) return;
    const safeQty = Math.min(selectedQuantity, maxAddable);
    addItemToCart(product, safeQty);
    setAddedToCartMsg(`✓ ${safeQty} item${safeQty > 1 ? 's' : ''} added to your cart!`);
    setTimeout(() => setAddedToCartMsg(''), 3500);
  };

  const handleBuyNow = () => {
    if (!product || maxAddable <= 0) return;
    addItemToCart(product, Math.min(selectedQuantity, maxAddable));
    navigate('/cart');
  };

  /* ── Loading skeleton ───────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <main className="page-wrapper product-details-page" aria-busy="true">
        <div className="container">
          <div className="product-details__skeleton">
            <div className="skeleton product-details__skeleton-img" />
            <div className="product-details__skeleton-info">
              <div className="skeleton" style={{ height: '2rem',  width: '65%' }} />
              <div className="skeleton" style={{ height: '1rem',  width: '35%', marginTop: '1rem' }} />
              <div className="skeleton" style={{ height: '3rem',  width: '45%', marginTop: '1.5rem' }} />
              <div className="skeleton" style={{ height: '7rem',               marginTop: '1.5rem' }} />
              <div className="skeleton" style={{ height: '3.5rem',             marginTop: '2rem' }} />
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--color-stone-500)', fontSize: 'var(--text-sm)' }}>
            Fetching product details from the server...
          </p>
        </div>
      </main>
    );
  }

  /* ── Error: Product not found (404) ─────────────────────────────────────── */
  if (isNotFound) {
    return (
      <main className="page-wrapper product-details-page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">🔍</span>
            <h1>Product Not Found</h1>
            <p>
              The product ID <code style={{ background: 'var(--color-stone-100)', padding: '2px 8px', borderRadius: '4px' }}>
                {productId}
              </code> does not exist in our catalogue.
              It may have been removed or the link may be incorrect.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse All Products
              </Link>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── Error: API / network failure ───────────────────────────────────────── */
  if (error) {
    return (
      <main className="page-wrapper product-details-page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">⚠️</span>
            <h1>Could Not Load Product</h1>
            <p>{error}</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button className="btn btn-primary btn-lg" onClick={refetch}>
                🔄 Try Again
              </button>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── Main product view ──────────────────────────────────────────────────── */
  const categoryIcon = CATEGORY_ICONS[product.category] || '🪑';
  const gstAmount    = Math.round(product.price * 0.18);
  const totalPrice   = product.price + gstAmount;

  return (
    <main className="page-wrapper product-details-page">
      <div className="container">

        {/* Breadcrumb nav */}
        <nav className="breadcrumb" aria-label="Breadcrumb navigation">
          <Link to="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link to="/products">Products</Link>
          <span aria-hidden="true">›</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        {/* Main two-column layout */}
        <div className="product-details__layout">

          {/* ── Left: Visual panel ──────────────────────────────────────── */}
          <div className="product-details__visual-panel">
            <div className="product-details__image-box">
              <ProductImage
                className="product-details__image"
                image={product.image}
                alt={product.name}
                fallback={
                  <div className="product-details__image-placeholder" role="img" aria-label={product.name}>
                    <span className="product-details__big-icon">{categoryIcon}</span>
                  </div>
                }
              />
              <span className="product-details__category-chip">
                {categoryIcon} {product.category}
              </span>
            </div>

            <div className="product-details__trust-row">
              <div className="trust-item"><span>🔒</span><p>Secure Payment</p></div>
              <div className="trust-item"><span>🚚</span><p>Free Delivery ₹50k+</p></div>
              <div className="trust-item"><span>↩️</span><p>7-Day Returns</p></div>
            </div>
          </div>

          {/* ── Right: Info panel ───────────────────────────────────────── */}
          <div className="product-details__info-panel">

            {/* Product ID badge */}
            <p className="product-details__product-id" aria-label={`Product ID: ${product.id}`}>
              {product.id}
            </p>

            <h1 className="product-details__title">{product.name}</h1>

            {/* Stock status */}
            <div className="product-details__stock-row">
              {product.stock === 0 ? (
                <span className="badge badge-red" role="status">Out of Stock</span>
              ) : product.stock <= 5 ? (
                <span className="badge badge-saffron" role="status">
                  ⚡ Only {product.stock} left — Order soon!
                </span>
              ) : (
                <span className="badge badge-green" role="status">
                  ✓ In Stock ({product.stock} units available)
                </span>
              )}
            </div>

            {/* Price block — uses Intl.NumberFormat('en-IN') via formatRupees() */}
            <div className="product-details__pricing" aria-label="Pricing breakdown">
              <div
                className="product-details__price-main"
                aria-label={`Base price: ${formatRupees(product.price)}`}
              >
                {formatRupees(product.price)}
              </div>
              <div className="product-details__price-breakdown">
                {/*
                 * GST amount also formatted with the Indian Rupee formatter.
                 * All monetary values on this page use Intl.NumberFormat('en-IN').
                 */}
                <span>+ GST 18% ({formatRupees(gstAmount)})</span>
                <span className="product-details__price-total">
                  = Total Payable:{' '}
                  <strong aria-label={`Total including GST: ${formatRupees(totalPrice)}`}>
                    {formatRupees(totalPrice)}
                  </strong>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="product-details__description">
              <h2 className="product-details__description-heading">Product Details</h2>
              <p>{product.description}</p>
            </div>

            {/* Quantity selector */}
            {product.stock > 0 && (
              <div className="product-details__quantity-row">
                <label className="form-label" htmlFor="qty-input">
                  Select Quantity:
                </label>
                <div className="qty-stepper" role="group" aria-label="Quantity selector">
                  <button
                    className="qty-stepper__btn"
                    onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                    disabled={selectedQuantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span
                    className="qty-stepper__value"
                    id="qty-input"
                    aria-live="polite"
                    aria-label={`Quantity: ${selectedQuantity}`}
                  >
                    {selectedQuantity}
                  </span>
                  <button
                    className="qty-stepper__btn"
                    onClick={() => setSelectedQuantity((q) => Math.min(maxAddable, q + 1))}
                    disabled={selectedQuantity >= maxAddable}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {qtyInCart > 0 && (
                  <span className="product-details__cart-note" aria-live="polite">
                    ({qtyInCart} already in your cart)
                  </span>
                )}
              </div>
            )}

            {/* Success message after adding to cart */}
            {addedToCartMsg && (
              <div
                className="product-details__success-msg"
                role="status"
                aria-live="polite"
              >
                {addedToCartMsg}
              </div>
            )}

            {/* Action buttons */}
            <div className="product-details__actions">
              <button
                className="btn btn-primary btn-lg product-details__add-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || maxAddable <= 0}
                id="add-to-cart-btn"
              >
                {product.stock === 0
                  ? 'Out of Stock'
                  : maxAddable <= 0
                  ? '✓ Maximum Quantity in Cart'
                  : '🛒 Add to Cart'}
              </button>

              <button
                className="btn btn-secondary btn-lg"
                onClick={handleBuyNow}
                disabled={product.stock === 0 || maxAddable <= 0}
                id="buy-now-btn"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Shipping info */}
            <div className="product-details__shipping-info">
              {product.price >= 50000 ? (
                <p>🚚 <strong>Free Delivery!</strong> This product qualifies for free shipping.</p>
              ) : (
                <p>
                  🚚 Delivery: {formatRupees(999)} | Add{' '}
                  {formatRupees(50000 - product.price)} more for free delivery!
                </p>
              )}
              <p>📦 Estimated Delivery: 7–14 working days</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section
            className="product-details__related"
            aria-labelledby="related-heading"
          >
            <div className="ornamental-divider"><span>✦</span></div>
            <div className="section-header">
              <p className="label-tag">You May Also Like</p>
              <h2 className="section-title" id="related-heading">
                Related Products
              </h2>
            </div>
            {/*
             * ProductList renders related products.
             * These are filtered client-side from the same API response
             * already fetched by useProducts().
             */}
            <ProductList
              products={relatedProducts}
              isLoading={false}
              error={null}
              skeletonCount={3}
            />
          </section>
        )}
      </div>
    </main>
  );
}
