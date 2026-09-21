/**
 * formatters.js
 * --------------
 * Utility functions for consistent display formatting.
 */

import { API_ORIGIN } from '../services/api';

/**
 * Builds an absolute URL for a product image served by the backend.
 * Falls back to null when no image path is provided (callers then render
 * their own placeholder).
 *
 * @param {string} imagePath  e.g. "/images/products/PROD-001.svg"
 * @returns {string|null}
 */
export function getProductImageUrl(imagePath) {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return `${API_ORIGIN}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}

/**
 * Formats a number as Indian currency (₹) with Indian number formatting.
 * e.g. 42000 → "42,000"  |  150000 → "1,50,000"
 *
 * @param {number} amountInRupees
 * @returns {string} Formatted price string (without ₹ symbol — CSS ::before handles it)
 */
export function formatIndianPrice(amountInRupees) {
  return new Intl.NumberFormat('en-IN').format(amountInRupees);
}

/**
 * Formats a price as a full string with the ₹ symbol.
 * @param {number} amountInRupees
 * @returns {string}  e.g. "₹42,000"
 */
export function formatPriceWithSymbol(amountInRupees) {
  return `₹${formatIndianPrice(amountInRupees)}`;
}

/**
 * Formats an ISO date string to Indian-style readable date.
 * e.g. "2026-09-12T10:30:00Z" → "12 Sep 2026, 10:30 AM"
 *
 * @param {string} isoDateString
 * @returns {string}
 */
export function formatIndianDateTime(isoDateString) {
  return new Intl.DateTimeFormat('en-IN', {
    day:    '2-digit',
    month:  'short',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(new Date(isoDateString));
}

/**
 * Returns a CSS class name for an order status badge.
 * @param {string} status
 * @returns {string}
 */
export function getOrderStatusBadgeClass(status) {
  const statusMap = {
    Confirmed: 'badge-green',
    Shipped:   'badge-gold',
    Delivered: 'badge-green',
    Cancelled: 'badge-red',
    Pending:   'badge-saffron',
  };
  return statusMap[status] || 'badge-saffron';
}
