/**
 * api.js
 * -------
 * Centralised Axios instance and API helper functions.
 * All calls target the backend running at http://localhost:5000.
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

/** Scheme + host of the backend (used to build absolute URLs for images). */
export const API_ORIGIN = BASE_URL.replace(/\/api\/?$/, '');

/** Axios instance with default base URL */
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Attach JWT token to every request if one exists in localStorage.
 */
apiClient.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('kaarya_griha_token');
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

// ── Auth Endpoints ─────────────────────────────────────────────────────────

/** POST /api/auth/login */
export const loginUserApi = (credentials) =>
  apiClient.post('/auth/login', credentials);

/** POST /api/auth/register */
export const registerUserApi = (userData) =>
  apiClient.post('/auth/register', userData);

/** GET /api/auth/profile */
export const getUserProfileApi = () =>
  apiClient.get('/auth/profile');

// ── Product Endpoints ──────────────────────────────────────────────────────

/** GET /api/products  (optionally with filters: category, search, minPrice, maxPrice) */
export const fetchAllProductsApi = (queryParams = {}) =>
  apiClient.get('/products', { params: queryParams });

/** GET /api/products/:id */
export const fetchProductByIdApi = (productId) =>
  apiClient.get(`/products/${productId}`);

// ── Order Endpoints ────────────────────────────────────────────────────────

/** POST /api/orders */
export const placeOrderApi = (orderPayload) =>
  apiClient.post('/orders', orderPayload);

/** GET /api/orders */
export const fetchMyOrdersApi = () =>
  apiClient.get('/orders');

export default apiClient;
