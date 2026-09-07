import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Atelier.</div>
            <p>
              Curated artisan goods for the modern home. Every piece tells a story
              of craftsmanship and care.
            </p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop">New Arrivals</Link></li>
              <li><Link to="/shop">Best Sellers</Link></li>
              <li><Link to="/shop">Gift Cards</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li><Link to="/">Our Story</Link></li>
              <li><Link to="/">Artisans</Link></li>
              <li><Link to="/">Sustainability</Link></li>
              <li><Link to="/">Press</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/">Shipping & Returns</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Size Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 Atelier. All rights reserved.</span>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
