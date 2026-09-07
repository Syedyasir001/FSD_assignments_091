import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  // useEffect: update document title when product changes
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Atelier`;
    }
    // cleanup: reset title when component unmounts
    return () => {
      document.title = 'Atelier | Curated Artisan Goods';
    };
  }, [product]);

  // useEffect: reset quantity when product id changes
  useEffect(() => {
    setQuantity(1);
    setAdded(false);
  }, [id]);

  // useEffect: scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <p style={{ color: 'var(--warm-gray)', margin: '16px 0 32px' }}>
          The item you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail animate-fade-in">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-detail-image animate-slide-in-left">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info animate-fade-in-up stagger-1">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span className="separator">/</span>
              <Link to="/shop">Shop</Link>
              <span className="separator">/</span>
              <span>{product.name}</span>
            </div>

            <span className="category-tag">{product.category}</span>

            <h1>{product.name}</h1>

            <div className="detail-rating">
              <span className="stars">
                {'★'.repeat(Math.floor(product.rating))}
              </span>
              <span>{product.rating} rating</span>
            </div>

            <div className="detail-price">₹{product.price.toLocaleString()}</div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-actions">
              <div className="quantity-control">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>

              <button
                className={`btn btn-primary ${added ? '' : ''}`}
                onClick={handleAddToCart}
                style={added ? { background: 'var(--sage)' } : {}}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            {product.features && (
              <div className="detail-features">
                <h3>Product Details</h3>
                <ul>
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
