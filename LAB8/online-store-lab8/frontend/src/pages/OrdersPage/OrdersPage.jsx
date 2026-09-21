/**
 * OrdersPage.jsx
 * ---------------
 * Protected page showing the logged-in user's order history.
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyOrdersApi } from '../../services/api';
import { formatIndianDateTime, formatPriceWithSymbol, getOrderStatusBadgeClass } from '../../utils/formatters';
import ProductImage from '../../components/ProductImage/ProductImage';
import './OrdersPage.css';

export default function OrdersPage() {
  const [orders,         setOrders]         = useState([]);
  const [isLoading,      setIsLoading]      = useState(true);
  const [fetchError,     setFetchError]     = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const loadMyOrders = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetchMyOrdersApi();
        // Most recent orders first
        setOrders(response.data.data.reverse());
      } catch {
        setFetchError('Could not load your orders. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadMyOrders();
  }, []);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (isLoading) {
    return (
      <main className="page-wrapper orders-page">
        <div className="container">
          <div className="loading-screen">
            <div className="spinner" />
            <p>Loading your orders...</p>
          </div>
        </div>
      </main>
    );
  }

  if (fetchError) {
    return (
      <main className="page-wrapper orders-page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">⚠️</span>
            <h3>Something Went Wrong</h3>
            <p>{fetchError}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="page-wrapper orders-page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">📦</span>
            <h1>No Orders Yet</h1>
            <p>You haven't placed any orders yet. Explore our beautiful furniture collection!</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrapper orders-page">
      <div className="container">
        <div className="orders-page__header">
          <div>
            <p className="label-tag">Purchase History</p>
            <h1 className="section-title">My Orders</h1>
            <p className="section-subtitle">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
          </div>
        </div>

        <div className="orders-list">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.orderId;
            const badgeClass = getOrderStatusBadgeClass(order.status);

            return (
              <article key={order.orderId} className="order-card">
                {/* Order Header */}
                <div
                  className="order-card__header"
                  onClick={() => toggleOrderExpansion(order.orderId)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  onKeyDown={(e) => e.key === 'Enter' && toggleOrderExpansion(order.orderId)}
                >
                  <div className="order-card__header-left">
                    <p className="order-card__id">{order.orderId}</p>
                    <p className="order-card__date">{formatIndianDateTime(order.placedAt)}</p>
                  </div>

                  <div className="order-card__header-right">
                    <span className={`badge ${badgeClass}`}>{order.status}</span>
                    <p className="order-card__total">
                      {formatPriceWithSymbol(order.pricing.grandTotal)}
                    </p>
                    <span className="order-card__toggle">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Items Preview (always visible) */}
                <div className="order-card__items-preview">
                  {order.items.map((item) => (
                    <span key={item.productId} className="order-card__item-chip">
                      {item.productName} × {item.quantity}
                    </span>
                  ))}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="order-card__details fade-in">
                    {/* Items Table */}
                    <div className="order-card__items-table">
                      <div className="order-card__table-header">
                        <span>Product</span>
                        <span>Qty</span>
                        <span>Unit Price</span>
                        <span>Total</span>
                      </div>
                      {order.items.map((item) => (
                        <div key={item.productId} className="order-card__table-row">
                          <div className="order-card__item-product">
                            <ProductImage
                              className="order-card__item-thumb"
                              image={item.image}
                              alt={item.productName}
                              fallback={
                                <span className="order-card__item-thumb-placeholder">🪑</span>
                              }
                            />
                            <div>
                              <p className="order-card__item-name">{item.productName}</p>
                              <p className="order-card__item-cat">{item.category}</p>
                            </div>
                          </div>
                          <span>× {item.quantity}</span>
                          <span>{formatPriceWithSymbol(item.unitPrice)}</span>
                          <span className="order-card__item-total">
                            {formatPriceWithSymbol(item.lineTotal)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card__footer-grid">
                      {/* Pricing Breakdown */}
                      <div className="order-card__pricing">
                        <h4 className="order-card__section-title">Bill Summary</h4>
                        <div className="order-card__pricing-row">
                          <span>Product Price</span>
                          <span>{formatPriceWithSymbol(order.pricing.subtotal)}</span>
                        </div>
                        <div className="order-card__pricing-row">
                          <span>GST (18%)</span>
                          <span>{formatPriceWithSymbol(order.pricing.gst)}</span>
                        </div>
                        <div className="order-card__pricing-row">
                          <span>Delivery Charge</span>
                          <span>{order.pricing.shippingCharge === 0 ? 'Free' : formatPriceWithSymbol(order.pricing.shippingCharge)}</span>
                        </div>
                        <div className="order-card__pricing-row order-card__pricing-row--total">
                          <span>Grand Total</span>
                          <strong>{formatPriceWithSymbol(order.pricing.grandTotal)}</strong>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="order-card__address">
                        <h4 className="order-card__section-title">Delivery Address</h4>
                        <address className="order-card__address-body">
                          <p><strong>{order.shippingAddress.fullName}</strong></p>
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                          <p>PIN: {order.shippingAddress.pincode}</p>
                          <p>📞 {order.shippingAddress.phone}</p>
                        </address>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
