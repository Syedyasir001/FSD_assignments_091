/**
 * CartPage.jsx
 * -------------
 * Shopping cart with item list, quantity controls, GST breakdown, and checkout.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { placeOrderApi, fetchProductByIdApi } from '../../services/api';
import { formatPriceWithSymbol } from '../../utils/formatters';
import ProductImage from '../../components/ProductImage/ProductImage';
import './CartPage.css';

const SHIPPING_THRESHOLD = 50000;
const SHIPPING_CHARGE    = 999;
const GST_RATE           = 0.18;

/** Default blank shipping form */
const BLANK_SHIPPING_FORM = {
  fullName: '', street: '', city: '', state: '', pincode: '', phone: '',
};

export default function CartPage() {
  const { cartItems, cartSubtotal, updateItemQuantity, removeItemFromCart, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isCheckoutOpen,  setIsCheckoutOpen]  = useState(false);
  const [shippingAddress, setShippingAddress] = useState(BLANK_SHIPPING_FORM);
  const [formErrors,      setFormErrors]      = useState({});
  const [isPlacingOrder,  setIsPlacingOrder]  = useState(false);
  const [orderSuccess,    setOrderSuccess]    = useState(null);
  const [orderError,      setOrderError]      = useState('');

  /*
   * ── Live stock re-validation ──────────────────────────────────────────────
   * The stock stored in each cart item is a snapshot taken when the product
   * was first added. Re-fetch the current stock from GET /api/products/:id for
   * every cart item so checkout catches products whose stock has since dropped
   * below the quantity in the cart.
   */
  const [liveStockById, setLiveStockById] = useState({});

  useEffect(() => {
    if (cartItems.length === 0) return undefined;

    let isCancelled = false;

    Promise.all(
      cartItems.map((cartItem) =>
        fetchProductByIdApi(cartItem.id).catch(() => null)
      )
    ).then((responses) => {
      if (isCancelled) return;
      const stockResults = {};
      responses.forEach((response, index) => {
        if (response) {
          stockResults[cartItems[index].id] = response.data.data.stock;
        }
      });
      setLiveStockById((prev) => ({ ...prev, ...stockResults }));
    });

    return () => { isCancelled = true; };
  }, [cartItems]);

  /* ── Dynamically computed order totals (never hard-coded) ──────────────── */
  const gstAmount    = Math.round(cartSubtotal * GST_RATE);
  const shippingCost = cartSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const grandTotal   = cartSubtotal + gstAmount + shippingCost;

  /* Items whose cart quantity is above the current backend stock */
  const stockIssues = cartItems
    .filter((cartItem) => {
      const liveStock = liveStockById[cartItem.id];
      return typeof liveStock === 'number' && cartItem.quantity > liveStock;
    })
    .map((cartItem) => ({
      ...cartItem,
      availableStock: liveStockById[cartItem.id],
    }));

  const stockWarningMessage = stockIssues.length > 0
    ? `One or more items exceed the available stock. ${stockIssues
        .map((issue) =>
          `"${issue.name}" has only ${issue.availableStock} unit(s) left but you have ${issue.quantity} in the cart`
        )
        .join('; ')}.`
    : '';

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateShippingForm = () => {
    const errors = {};
    if (!shippingAddress.fullName.trim()) errors.fullName = 'Full name is required';
    if (!shippingAddress.street.trim())   errors.street   = 'Street address is required';
    if (!shippingAddress.city.trim())     errors.city     = 'City is required';
    if (!shippingAddress.state.trim())    errors.state    = 'State is required';
    if (!/^\d{6}$/.test(shippingAddress.pincode)) errors.pincode = 'Enter a valid 6-digit PIN code';
    if (!/^\d{10}$/.test(shippingAddress.phone))  errors.phone   = 'Enter a valid 10-digit phone number';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty. Add some products before checking out.');
      return;
    }
    if (stockIssues.length > 0) {
      setOrderError(`Cannot place order — ${stockWarningMessage}`);
      return;
    }
    if (!validateShippingForm()) return;
    setIsPlacingOrder(true);
    setOrderError('');
    try {
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity:  item.quantity,
        })),
        shippingAddress,
      };
      const response = await placeOrderApi(orderPayload);
      clearCart();
      setOrderSuccess(response.data.data);
    } catch (error) {
      const backendDetails = error.response?.data?.details;
      setOrderError(
        Array.isArray(backendDetails) && backendDetails.length > 0
          ? `Insufficient stock: ${backendDetails.join(' ')}`
          : error.response?.data?.message || 'Order could not be placed. Please try again.'
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  /** Block checkout when the cart is empty or stock has gone insufficient. */
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty. Add some products before checking out.');
      return;
    }
    if (stockIssues.length > 0) {
      setOrderError(`Cannot check out — ${stockWarningMessage}`);
      return;
    }
    setOrderError('');
    setIsCheckoutOpen(true);
  };

  /* ── Order Success Screen ─────────────────────────────────────────────── */
  if (orderSuccess) {
    return (
      <main className="page-wrapper cart-page">
        <div className="container">
          <div className="order-success">
            <div className="order-success__icon">🎉</div>
            <h1 className="order-success__title">Order Placed Successfully!</h1>
            <p className="order-success__id">Order ID: <strong>{orderSuccess.orderId}</strong></p>
            <p className="order-success__msg">
              Thank you! Your order has been confirmed. Delivery is expected within 7–14 working days.
            </p>
            <div className="order-success__summary">
              <div className="order-success__summary-row">
                <span>Grand Total</span>
                <strong>{formatPriceWithSymbol(orderSuccess.pricing.grandTotal)}</strong>
              </div>
              <div className="order-success__summary-row">
                <span>Status</span>
                <span className="badge badge-green">{orderSuccess.status}</span>
              </div>
            </div>
            <div className="order-success__actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/orders')}>
                View My Orders
              </button>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── Empty Cart ───────────────────────────────────────────────────────── */
  if (cartItems.length === 0) {
    return (
      <main className="page-wrapper cart-page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">🛒</span>
            <h1>Your Cart is Empty</h1>
            <p>You haven't added any products yet. Explore our beautiful furniture collection!</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrapper cart-page">
      <div className="container">
        <div className="cart-page__header">
          <h1 className="section-title">My Cart</h1>
          <p className="section-subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} selected</p>
        </div>

        <div className="cart-page__layout">

          {/* Cart Items */}
          <div className="cart-items-panel">
            {cartItems.map((cartItem) => {
              const liveStock       = liveStockById[cartItem.id];
              const isLiveStockKnown = typeof liveStock === 'number';
              const maxQuantity     = isLiveStockKnown ? liveStock : cartItem.stock;
              const exceedsStock    = isLiveStockKnown && cartItem.quantity > liveStock;
              const atMaxStock      = !exceedsStock && cartItem.quantity >= maxQuantity;

              return (
                <article key={cartItem.id} className="cart-item">
                  <div className="cart-item__icon-box">
                    <ProductImage
                      className="cart-item__thumbnail"
                      image={cartItem.image}
                      alt={cartItem.name}
                      fallback={<span>🪑</span>}
                    />
                  </div>

                  <div className="cart-item__details">
                    <Link to={`/products/${cartItem.id}`} className="cart-item__name">
                      {cartItem.name}
                    </Link>
                    <p className="cart-item__category">{cartItem.category}</p>
                    <p className="cart-item__unit-price">
                      {formatPriceWithSymbol(cartItem.price)} each
                    </p>
                  </div>

                  <div className="cart-item__controls">
                    <div className="qty-stepper">
                      <button
                        className="qty-stepper__btn"
                        onClick={() => updateItemQuantity(cartItem.id, cartItem.quantity - 1)}
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="qty-stepper__value">{cartItem.quantity}</span>
                      <button
                        className="qty-stepper__btn"
                        onClick={() => updateItemQuantity(cartItem.id, cartItem.quantity + 1)}
                        disabled={exceedsStock || cartItem.quantity >= maxQuantity}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    {exceedsStock && (
                      <p className="cart-item__stock-error" role="alert">
                        ⚠️ Only {liveStock} unit(s) left in stock — quantity is capped. Please reduce it to check out.
                      </p>
                    )}
                    {atMaxStock && (
                      <p className="cart-item__stock-note">✓ Maximum available stock in cart</p>
                    )}

                    <p className="cart-item__line-total">
                      {formatPriceWithSymbol(cartItem.price * cartItem.quantity)}
                    </p>
                    <button
                      className="cart-item__remove-btn"
                      onClick={() => removeItemFromCart(cartItem.id)}
                      aria-label={`Remove ${cartItem.name} from cart`}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Order Summary + Checkout */}
          <aside className="cart-summary-panel">
            <div className="cart-summary">
              <h2 className="cart-summary__title">Order Summary</h2>

              <div className="cart-summary__rows">
                <div className="cart-summary__row">
                  <span>Product Price</span>
                  <span>{formatPriceWithSymbol(cartSubtotal)}</span>
                </div>
                <div className="cart-summary__row">
                  <span>GST (18%)</span>
                  <span>{formatPriceWithSymbol(gstAmount)}</span>
                </div>
                <div className="cart-summary__row">
                  <span>Delivery Charge</span>
                  <span className={shippingCost === 0 ? 'cart-summary__free' : ''}>
                    {shippingCost === 0 ? 'Free!' : formatPriceWithSymbol(SHIPPING_CHARGE)}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="cart-summary__shipping-hint">
                    Add ₹{(SHIPPING_THRESHOLD - cartSubtotal).toLocaleString('en-IN')} more for free delivery!
                  </p>
                )}
              </div>

              <div className="cart-summary__total">
                <span>Grand Total</span>
                <strong>{formatPriceWithSymbol(grandTotal)}</strong>
              </div>

              {stockWarningMessage && (
                <div className="cart-summary__notice" role="alert">
                  <strong>⚠️ Cannot Check Out</strong>
                  <p>{stockWarningMessage}</p>
                  <p className="cart-summary__notice-hint">
                    Reduce the quantity (or remove the item) above to continue.
                  </p>
                </div>
              )}

              {!isLoggedIn ? (
                <div className="cart-summary__auth-cta">
                  <p>Please log in to proceed to checkout.</p>
                  <Link to="/account?redirect=%2Fcart" className="btn btn-primary" style={{ width: '100%' }}>
                    Login to Continue
                  </Link>
                </div>
              ) : !isCheckoutOpen ? (
                <button
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout →
                </button>
              ) : (
                <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
                  <h3 className="checkout-form__title">Delivery Address</h3>

                  {[
                    { name: 'fullName', label: 'Full Name',            placeholder: 'Rajan Kumar Sharma' },
                    { name: 'street',   label: 'Street / Area / Colony', placeholder: '12, MG Road, Sector 4' },
                    { name: 'city',     label: 'City',                 placeholder: 'Jaipur' },
                    { name: 'state',    label: 'State',                placeholder: 'Rajasthan' },
                    { name: 'pincode',  label: 'PIN Code',             placeholder: '302001' },
                    { name: 'phone',    label: 'Mobile Number',        placeholder: '9876543210' },
                  ].map((field) => (
                    <div key={field.name} className="form-group">
                      <label className="form-label" htmlFor={`checkout-${field.name}`}>
                        {field.label}
                      </label>
                      <input
                        id={`checkout-${field.name}`}
                        name={field.name}
                        className={`form-input ${formErrors[field.name] ? 'error' : ''}`}
                        placeholder={field.placeholder}
                        value={shippingAddress[field.name]}
                        onChange={handleShippingChange}
                      />
                      {formErrors[field.name] && (
                        <span className="form-error">{formErrors[field.name]}</span>
                      )}
                    </div>
                  ))}

                  {orderError && (
                    <div className="checkout-form__error">{orderError}</div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%' }}
                    disabled={isPlacingOrder}
                    id="place-order-btn"
                  >
                    {isPlacingOrder ? '⏳ Placing Order...' : '✓ Place Order'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{ width: '100%' }}
                    onClick={() => setIsCheckoutOpen(false)}
                  >
                    Go Back
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
