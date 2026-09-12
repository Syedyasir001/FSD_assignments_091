/**
 * ProductsPage.jsx
 * -----------------
 * Lists all furniture products fetched from GET /api/products.
 *
 * Data flow:
 *   1. On mount, `useProducts()` fires a real HTTP request to the backend.
 *   2. The response array is stored in state via `useState` inside the hook.
 *   3. A second `useEffect` applies search / category / sort filters client-side.
 *   4. Every browser refresh triggers a fresh mount → fresh API call (no cache).
 *   5. The `ProductList` component handles loading skeletons, errors, and the grid.
 *   6. `ProductCard` renders each individual product, including the ₹ price.
 *
 * URL query params (?category=Bedroom, ?search=teak) are read on mount to
 * pre-fill filters — useful when navigating here from the homepage.
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts }  from '../../hooks/useProducts';
import ProductList      from '../../components/ProductList/ProductList';
import './ProductsPage.css';

const ALL_CATEGORIES = [
  'Bedroom', 'Living Room', 'Dining Room', 'Outdoor', 'Study', 'Hallway',
];

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default'            },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc',   label: 'Name: A → Z'        },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ── Filter / Sort State ───────────────────────────────────────────────── */
  const [searchQuery,    setSearchQuery]    = useState(searchParams.get('search')   || '');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [sortOrder,      setSortOrder]      = useState('default');

  /*
   * ── API Fetch via custom hook ────────────────────────────────────────────
   * useProducts() internally calls:
   *   useEffect(() => { fetch(GET /api/products); }, []);
   *
   * Because the hook has an empty dependency array for mount, every time the
   * user refreshes the Products page the component re-mounts and triggers a
   * fresh HTTP request to the backend. Data is NEVER read from a local cache.
   *
   * The hook returns:
   *   products  – raw Array from the API response
   *   isLoading – true while the network request is in-flight
   *   error     – human-readable error string, or null on success
   *   refetch   – function to manually re-trigger the API call
   */
  const { products: allProducts, isLoading, error, refetch } = useProducts();

  /* ── Derived: filtered + sorted product list ────────────────────────────── */
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let result = [...allProducts];

    // 1. Filter by category
    if (activeCategory) {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // 2. Filter by search query (name or description)
    if (searchQuery.trim()) {
      const term = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // 3. Sort
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // Keep original API order
    }

    setFilteredProducts(result);
  }, [allProducts, activeCategory, searchQuery, sortOrder]);

  /* ── Event Handlers ─────────────────────────────────────────────────────── */
  const handleCategorySelect = (category) => {
    const newCategory = activeCategory === category ? '' : category;
    setActiveCategory(newCategory);
    setSearchParams(newCategory ? { category: newCategory } : {});
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('');
    setSortOrder('default');
    setSearchParams({});
    refetch(); // Re-fetch from API to reset to the canonical list
  };

  const hasActiveFilters =
    searchQuery.trim() || activeCategory || sortOrder !== 'default';

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <main className="products-page page-wrapper">
      <div className="container">

        {/* Page Header */}
        <div className="products-page__header">
          <div>
            <p className="label-tag">Full Collection</p>
            <h1 className="section-title">All Products</h1>
            <p className="section-subtitle">
              {isLoading
                ? 'Fetching products from the server...'
                : error
                ? 'An error occurred while loading products.'
                : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="products-filters">
          <div className="products-filters__search-row">
            <div className="products-filters__search-wrapper">
              <span className="products-filters__search-icon">🔍</span>
              <input
                type="search"
                id="product-search"
                className="form-input products-filters__search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products by name or description"
              />
            </div>

            <select
              id="sort-select"
              className="form-input products-filters__sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                className="btn btn-ghost btn-sm products-filters__clear"
                onClick={clearAllFilters}
                aria-label="Clear all active filters"
              >
                ✕ Clear Filters
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div
            className="products-filters__categories"
            role="group"
            aria-label="Filter by room category"
          >
            <button
              className={`category-pill ${!activeCategory ? 'category-pill--active' : ''}`}
              onClick={() => handleCategorySelect('')}
              aria-pressed={!activeCategory}
            >
              All
            </button>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'category-pill--active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/*
         * ── ProductList ─────────────────────────────────────────────────────
         * This reusable component handles three states:
         *   1. isLoading → skeleton placeholders
         *   2. error     → error panel with retry button
         *   3. data      → grid of ProductCard components
         *
         * Each ProductCard renders a product and formats its price using
         * Intl.NumberFormat('en-IN') with currency: 'INR' → ₹1,50,000
         */}
        <ProductList
          products={filteredProducts}
          isLoading={isLoading}
          error={error}
          onRetry={hasActiveFilters ? clearAllFilters : refetch}
          emptyMessage={
            hasActiveFilters
              ? 'No products match your current filters. Try adjusting or clearing them.'
              : 'No products are available at the moment. Please check back later.'
          }
          skeletonCount={8}
        />

      </div>
    </main>
  );
}
