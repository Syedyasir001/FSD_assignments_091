import React, { useState, useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

function Shop() {
  const { products } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // useMemo: only recompute filtered products when search or filter changes
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === 'All' || product.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [products, search, activeFilter]);

  return (
    <div className="shop-page animate-fade-in">
      <div className="container">
        <div className="shop-header">
          <h1>Our Collection</h1>
          <p>Each piece is thoughtfully made by independent artisans worldwide.</p>
        </div>

        <div className="shop-controls">
          <SearchBar value={search} onChange={setSearch} />
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
