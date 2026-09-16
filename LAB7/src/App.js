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
          <li><a className="active" href="#home">Home</a></li>
          <li><a href="#products">Shop</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header id="home" className="hero-section container animate-fade-in">
        <div className="hero-grid">
          <div className="hero-content">
            <span className="hero-badge">
              <span className="hero-badge-dot"></span>
              New Collection 2026
            </span>

            <h1 className="hero-title">
              Experience Sound in its <span className="text-accent">Purest Form</span>
            </h1>

            <p className="hero-subtitle">
              Discover our new collection of premium, minimalist audio gear designed for audiophiles and aesthetics.
            </p>

            <div className="hero-actions">
              <a href="#products" className="btn-primary">Shop Collection</a>
              <a href="#about" className="btn-secondary">Our Philosophy</a>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-value">24-bit</span>
                <span className="trust-label">Hi-Res Certified</span>
              </div>
              <div className="trust-item">
                <span className="trust-value">30-day</span>
                <span className="trust-label">Free Returns</span>
              </div>
              <div className="trust-item">
                <span className="trust-value">2-yr</span>
                <span className="trust-label">Warranty</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow"></div>
            <div className="hero-image-frame">
              <img src="/images/headphone_anc.jpg" alt="Studio Pro ANC headphones" />
            </div>
            <div className="hero-float-card">
              <span className="float-card-tag">Flagship</span>
              <strong>Studio Pro ANC</strong>
              <span className="float-card-price">₹16,999</span>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Strip */}
      <section className="feature-strip container animate-fade-in">
        <div className="feature-item">
          <span className="feature-icon">♪</span>
          <div>
            <h4>Reference-Grade Tuning</h4>
            <p>Studio-calibrated drivers with a flat, neutral signature.</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">◐</span>
          <div>
            <h4>All-Day Battery</h4>
            <p>Up to 40 hours of playback on a single charge.</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">✚</span>
          <div>
            <h4>Built to Last</h4>
            <p>Aluminium construction backed by a 2-year warranty.</p>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <main id="products" className="product-section container">
        <div className="section-header">
          <span className="section-tag">The Collection</span>
          <h2 className="section-title">Featured Products</h2>
        </div>
        <ProductList />
      </main>

      {/* CTA Band */}
      <section id="about" className="cta-band">
        <div className="container cta-band-inner">
          <h2>Need help choosing your setup?</h2>
          <p>Talk to our audio specialists for a personalized recommendation.</p>
          <a href="#products" className="btn-primary">Browse the Collection</a>
        </div>
      </section>

      {/* Footer */}
      <EcommerceFooter />
    </div>
  );
}

export default App;