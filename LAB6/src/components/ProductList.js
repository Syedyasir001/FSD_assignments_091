import React from 'react';
import ProductCard from './ProductCard';

// Component demonstrating list rendering using .map()
function ProductList() {
  const products = [
    { id: 1, name: 'Aero One Wireless', price: 10999, category: 'Wireless', inStock: true, image: '/images/earbud_wireless.jpg' },
    { id: 2, name: 'Studio Pro ANC', price: 16999, category: 'ANC', inStock: true, image: '/images/headphone_anc.jpg' },
    { id: 3, name: 'Motion X Neckband', price: 6499, category: 'Sports', inStock: false, image: '/images/neckband_sport.jpg' },
    { id: 4, name: 'Fidelity IEM-X', price: 20999, category: 'Professional', inStock: true, image: '/images/iem_pro.jpg' }
  ];

  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          category={product.category}
          inStock={product.inStock}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default ProductList;
