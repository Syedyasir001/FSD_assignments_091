import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card-category">{product.category}</span>
      </div>

      <div className="product-card-body">
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 >= 0.5 ? '½' : ''}
          </span>
          <span>{product.rating}</span>
        </div>

        <h3>{product.name}</h3>
        <p className="product-desc">{product.description.slice(0, 80)}...</p>

        <div className="product-card-footer">
          <span className="product-price">₹{product.price.toLocaleString()}</span>

          <div className="product-card-actions">
            <button
              className={`btn-icon btn-add ${added ? 'added' : ''}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? '✓ Added' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
