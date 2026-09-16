import React from 'react';

// Functional component demonstrating props
function ProductCard({ name, price, category, inStock, image }) {
  return (
    <div className="product-card">
      <div className="product-image-container">
        {image ? (
          <img src={image} alt={name} className="product-image" />
        ) : (
          <div className="product-image-placeholder"></div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-details">
          <span className="product-category">{category}</span>
          <h4 className="product-name">{name}</h4>
          <span className="stock-badge">
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className="product-price">₹{price.toLocaleString('en-IN')}</div>
      </div>
    </div>
  );
}

export default ProductCard;
