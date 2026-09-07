import React from 'react';
import './App.css';

import ProductList from './components/ProductList';
import EcommerceFooter from './components/EcommerceFooter';

function App() {
  return (
    <div className="app-wrapper">
      {/* Navbar */}
      <nav className="navbar container">
        <div className="nav-brand">Audio Minimal</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#products">Shop</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section container animate-fade-in">
        <h1 className="hero-title">Experience Sound in its Purest Form</h1>
        <p className="hero-subtitle">
          Discover our new collection of premium, minimalist audio gear designed for audiophiles and aesthetics.
        </p>
        <a href="#products" className="btn-primary">Shop Collection</a>
      </header>

      {/* Product Section */}
      <main id="products" className="product-section container">
        <h2 className="section-title">Featured Products</h2>
        <ProductList />
      </main>

      {/* Footer */}
      <EcommerceFooter />
    </div>
  );
}

export default App;
