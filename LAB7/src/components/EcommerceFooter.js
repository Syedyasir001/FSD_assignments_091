import React from 'react';

function EcommerceFooter() {
  return (
    <footer className="store-footer container">
      <div className="footer-top-grid">
        <div className="footer-brand-col">
          <div className="brand-title">Audio Minimal</div>
          <p className="brand-desc">
            Next-generation acoustic monitors and connected wearables curated for high-performance audio.
          </p>
        </div>

        <div className="footer-links-col">
          <h6>Shop</h6>
          <ul>
            <li><a href="#earbuds">True Wireless</a></li>
            <li><a href="#headphones">Over-Ear</a></li>
            <li><a href="#sports">Sports & Active</a></li>
            <li><a href="#accessories">Accessories</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h6>Support</h6>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#shipping">Shipping & Returns</a></li>
            <li><a href="#warranty">Warranty</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© 2026 Audio Minimal. All rights reserved.</span>
        <span>Designed with minimal aesthetics.</span>
      </div>
    </footer>
  );
}

export default EcommerceFooter;
