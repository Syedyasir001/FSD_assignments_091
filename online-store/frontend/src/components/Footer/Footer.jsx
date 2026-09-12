/**
 * Footer.jsx
 * -----------
 * Site-wide footer with brand info, nav links, and contact details.
 */

import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* Brand Column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span>🪑</span>
            <span className="footer__logo-name">Kaarya Griha</span>
          </Link>
          <p className="footer__tagline">
            Premium handcrafted furniture from the heart of India, delivered to your doorstep.
            Every piece is built by skilled artisans with centuries of tradition.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook"  className="footer__social-link">📘</a>
            <a href="#" aria-label="Instagram" className="footer__social-link">📸</a>
            <a href="#" aria-label="Pinterest" className="footer__social-link">📌</a>
            <a href="#" aria-label="YouTube"   className="footer__social-link">▶️</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__column">
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/account">My Account</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer__column">
          <h4 className="footer__heading">Categories</h4>
          <ul className="footer__nav">
            <li><Link to="/products?category=Bedroom">Bedroom</Link></li>
            <li><Link to="/products?category=Living Room">Living Room</Link></li>
            <li><Link to="/products?category=Dining Room">Dining Room</Link></li>
            <li><Link to="/products?category=Outdoor">Outdoor</Link></li>
            <li><Link to="/products?category=Study">Study</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__column">
          <h4 className="footer__heading">Contact Us</h4>
          <ul className="footer__contact">
            <li>📍 12, Craft Marg, Jodhpur, Rajasthan — 342001</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ namaste@kaaryagriha.in</li>
            <li>🕐 Mon–Sat: 10:00 AM – 7:00 PM</li>
          </ul>
          <div className="footer__trust">
            <span className="footer__trust-badge">🔒 Secure Payment</span>
            <span className="footer__trust-badge">🚚 Free Delivery ₹50k+</span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {currentYear} Kaarya Griha. All Rights Reserved.</p>
          <div className="footer__payment-icons">
            <span title="UPI">UPI</span>
            <span title="Visa">VISA</span>
            <span title="Mastercard">MC</span>
            <span title="Net Banking">NB</span>
            <span title="EMI">EMI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
