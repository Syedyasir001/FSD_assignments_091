/**
 * useProducts.js
 * ---------------
 * Custom React hook that fetches the full product list from the backend API
 * (GET /api/products) every time the component that uses it mounts.
 *
 * This hook intentionally has NO cache — every mount triggers a fresh network
 * request, so refreshing the Products page always re-fetches from the server.
 *
 * @param {Object} queryParams - Optional filter params forwarded to the API
 *   e.g. { category: 'Bedroom', search: 'teak', minPrice: 10000 }
 *
 * @returns {{
 *   products: Array,       – the raw product array returned by the API
 *   isLoading: boolean,    – true while the request is in-flight
 *   error: string|null,    – human-readable error message, or null on success
 *   refetch: Function      – call to manually trigger another API request
 * }}
 *
 * Usage:
 *   const { products, isLoading, error, refetch } = useProducts();
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchAllProductsApi } from '../services/api';

export function useProducts(queryParams = {}) {
  const [products,  setProducts]  = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState(null);

  /**
   * fetchProducts — hits GET /api/products and updates state.
   * Wrapped in useCallback so the reference is stable across renders;
   * this lets consumers safely add it to their own dependency arrays.
   */
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchAllProductsApi(queryParams);
      /*
       * The backend response shape is:
       *   { success: true, totalCount: N, data: [ ...products ] }
       */
      setProducts(response.data.data);
    } catch (requestError) {
      const statusCode   = requestError.response?.status;
      const serverMessage = requestError.response?.data?.message;

      // Map common HTTP errors to user-friendly messages
      if (statusCode === 404) {
        setError('No products were found for the selected filters.');
      } else if (statusCode === 500) {
        setError('The server encountered an error. Please try again later.');
      } else if (requestError.code === 'ERR_NETWORK' || requestError.code === 'ECONNREFUSED') {
        setError(
          'Cannot connect to the server. Make sure the backend is running on port 5000.'
        );
      } else {
        setError(serverMessage || 'Failed to load products. Please try again.');
      }

      setProducts([]); // Reset to empty on error
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(queryParams)]); // Re-run if query params change

  /**
   * Run the fetch on every mount.
   * Because there is no caching, a page refresh always triggers a new API call.
   */
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts, // Expose so components can add a "Try Again" button
  };
}
