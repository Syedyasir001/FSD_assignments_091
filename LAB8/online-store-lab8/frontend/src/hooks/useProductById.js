/**
 * useProductById.js
 * ------------------
 * Custom React hook that fetches a single product from the backend API
 * (GET /api/products/:productId) every time the component mounts or
 * when the productId changes.
 *
 * Error handling distinguishes between:
 *   - 404  → product genuinely does not exist
 *   - 5xx  → server-side failure
 *   - Network errors → backend unreachable
 *
 * @param {string} productId  – the product ID from the URL (e.g. "PROD-001")
 *
 * @returns {{
 *   product: Object|null,  – the product object, or null while loading / on error
 *   isLoading: boolean,
 *   error: string|null,    – human-readable error, or null on success
 *   isNotFound: boolean,   – true specifically when the API returns 404
 *   refetch: Function      – trigger a fresh API request manually
 * }}
 *
 * Usage:
 *   const { product, isLoading, error, isNotFound, refetch } = useProductById('PROD-001');
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchProductByIdApi } from '../services/api';

export function useProductById(productId) {
  const [product,    setProduct]    = useState(null);
  const [isLoading,  setIsLoading]  = useState(true);
  const [error,      setError]      = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  /**
   * fetchProduct — hits GET /api/products/:productId and updates state.
   */
  const fetchProduct = useCallback(async () => {
    if (!productId) return; // Guard against undefined route param

    setIsLoading(true);
    setError(null);
    setIsNotFound(false);
    setProduct(null);

    try {
      const response = await fetchProductByIdApi(productId);
      /*
       * The backend response shape is:
       *   { success: true, data: { id, name, category, price, stock, description } }
       */
      setProduct(response.data.data);
    } catch (requestError) {
      const statusCode    = requestError.response?.status;
      const serverMessage = requestError.response?.data?.message;

      if (statusCode === 404) {
        // Product does not exist in the catalogue
        setIsNotFound(true);
        setError(
          `Product "${productId}" was not found. It may have been removed or the ID is incorrect.`
        );
      } else if (statusCode === 500) {
        setError('The server encountered an error. Please try again later.');
      } else if (requestError.code === 'ERR_NETWORK' || requestError.code === 'ECONNREFUSED') {
        setError(
          'Cannot connect to the server. Make sure the backend is running on port 5000.'
        );
      } else {
        setError(serverMessage || 'Failed to load product details. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  /**
   * Re-run whenever the productId changes or the component mounts.
   * Refreshing the browser window causes a fresh mount → fresh API call.
   */
  useEffect(() => {
    fetchProduct();
    // Scroll to the top whenever a new product is loaded
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchProduct]);

  return {
    product,
    isLoading,
    error,
    isNotFound,
    refetch: fetchProduct,
  };
}
