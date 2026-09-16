import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Cart() {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const shipping = cartTotal > 5000 ? 0 : 499;
  const tax = Math.round(cartTotal * 0.18);
  const grandTotal = cartTotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page animate-fade-in">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't found anything yet. Let's change that.</p>
            <Link to="/shop" className="btn btn-primary">
              Browse Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page animate-fade-in">
      <div className="container">
        <h1>Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <div className="item-category">{item.category}</div>

                  <div className="cart-item-controls">
                    <div className="cart-quantity">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <span className="cart-item-price">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span className="label">Subtotal ({cartCount} items)</span>
              <span className="value">₹{cartTotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span className="label">Shipping</span>
              <span className="value">
                {shipping === 0 ? (
                  <span style={{ color: 'var(--sage)' }}>Free</span>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>

            <div className="summary-row">
              <span className="label">GST (18%)</span>
              <span className="value">₹{tax.toLocaleString()}</span>
            </div>

            {shipping === 0 && (
              <div className="summary-row discount">
                <span className="label">Free shipping applied!</span>
                <span className="value">-₹499 saved</span>
              </div>
            )}

            <div className="summary-total">
              <span className="label">Total</span>
              <span className="value">₹{grandTotal.toLocaleString()}</span>
            </div>

            <button className="btn btn-primary" onClick={() => alert('Checkout coming soon!')}>
              Proceed to Checkout
            </button>

            <div className="promo-input">
              <input type="text" placeholder="Promo code" />
              <button className="btn btn-secondary btn-small">Apply</button>
            </div>

            <button
              className="btn btn-ghost"
              style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
