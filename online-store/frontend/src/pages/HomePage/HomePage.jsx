/**
 * HomePage.jsx
 * -------------
 * Landing page: Hero banner → Feature strip → Category grid → Featured products.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllProductsApi } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './HomePage.css';

const CATEGORIES = [
  { name: 'Bedroom',     displayName: 'Bedroom',     icon: '🛏️', color: '#8B5E3C' },
  { name: 'Living Room', displayName: 'Living Room',  icon: '🛋️', color: '#6B3F1F' },
  { name: 'Dining Room', displayName: 'Dining Room',  icon: '🍽️', color: '#9C6139' },
  { name: 'Outdoor',     displayName: 'Outdoor',      icon: '🌿', color: '#4A7C59' },
  { name: 'Study',       displayName: 'Study Room',   icon: '📚', color: '#5C5349' },
  { name: 'Hallway',     displayName: 'Hallway',      icon: '🚪', color: '#7A6245' },
];

const FEATURE_STRIPS = [
  { icon: '🚚', title: 'Free Delivery',       subtitle: 'On all orders above ₹50,000' },
  { icon: '🔒', title: 'Secure Shopping',     subtitle: 'Safe payments via UPI & cards' },
  { icon: '🌳', title: 'Authentic Wood',      subtitle: '100% genuine solid wood' },
  { icon: '🤝', title: '5-Year Warranty',     subtitle: 'Full craftsmanship guarantee' },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [heroSearchQuery, setHeroSearchQuery]   = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const response = await fetchAllProductsApi();
        // Show 4 featured products on the home page
        setFeaturedProducts(response.data.data.slice(0, 4));
      } catch {
        setFeaturedProducts([]);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    loadFeaturedProducts();
  }, []);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(heroSearchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <main className="home-page page-wrapper">

      {/* ── Hero Banner ───────────────────────────────────────────────── */}
      <section className="hero" aria-label="Hero section">
        <div className="hero__background">
          <div className="hero__pattern" />
          <div className="hero__gradient-overlay" />
        </div>

        <div className="container hero__content">
          <p className="label-tag hero__eyebrow">🇮🇳 Proudly Made in India</p>

          <h1 className="display-title hero__title">
            Transform Your Home With<br />
            <span className="hero__title-accent">Indian Craftsmanship</span>
          </h1>

          <p className="hero__subtitle">
            Premium handcrafted furniture rooted in Indian tradition — Sheesham, Teak,
            Cane, and Mango wood artisanship, delivered across India.
          </p>

          <form className="hero__search-form" onSubmit={handleHeroSearch} role="search">
            <input
              type="search"
              id="hero-search"
              className="hero__search-input"
              placeholder="Search furniture... Sheesham bed, teak diwan..."
              value={heroSearchQuery}
              onChange={(e) => setHeroSearchQuery(e.target.value)}
              aria-label="Search furniture"
            />
            <button type="submit" className="btn btn-primary hero__search-btn">
              🔍 Search
            </button>
          </form>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>500+</strong>
              <span>Products</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>50,000+</strong>
              <span>Happy Customers</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <strong>25+</strong>
              <span>Years of Experience</span>
            </div>
          </div>
        </div>

        {/* Floating decorative cards */}
        <div className="hero__decor-card hero__decor-card--1" aria-hidden="true">
          <span>🪑</span>
          <div>
            <p>Sheesham Bed</p>
            <p>₹42,000</p>
          </div>
        </div>
        <div className="hero__decor-card hero__decor-card--2" aria-hidden="true">
          <span>✨</span>
          <div>
            <p>Handcrafted</p>
            <p>Every Piece Unique</p>
          </div>
        </div>
      </section>

      {/* ── Feature Strip ─────────────────────────────────────────────── */}
      <section className="feature-strip" aria-label="Store features">
        <div className="container feature-strip__grid">
          {FEATURE_STRIPS.map((feature) => (
            <div key={feature.title} className="feature-strip__item">
              <span className="feature-strip__icon">{feature.icon}</span>
              <div>
                <p className="feature-strip__title">{feature.title}</p>
                <p className="feature-strip__subtitle">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories Grid ───────────────────────────────────────────── */}
      <section className="section categories-section" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section-header">
            <p className="label-tag">Our Collection</p>
            <h2 className="section-title" id="categories-heading">Browse by Category</h2>
            <p className="section-subtitle">
              Premium furniture for every room — choose your space and find your style.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
                style={{ '--cat-color': cat.color }}
                aria-label={`Browse ${cat.name} furniture`}
              >
                <span className="category-card__icon">{cat.icon}</span>
                <div className="category-card__text">
                  <p className="category-card__name">{cat.displayName}</p>
                </div>
                <span className="category-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────── */}
      <section className="section featured-section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="section-header">
            <p className="label-tag">Featured Selection</p>
            <h2 className="section-title" id="featured-heading">Our Most Loved Pieces</h2>
            <p className="section-subtitle">
              Discover our most popular handcrafted furniture, chosen by thousands of customers.
            </p>
          </div>

          {isLoadingProducts ? (
            <div className="products-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton" style={{ height: '420px', borderRadius: 'var(--radius-xl)' }} />
              ))}
            </div>
          ) : (
            <div className="products-grid fade-in">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="featured-section__cta">
            <Link to="/products" className="btn btn-secondary btn-lg">
              View Full Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Craftsmanship Banner ──────────────────────────────────────── */}
      <section className="craft-banner" aria-label="Craftsmanship section">
        <div className="container craft-banner__inner">
          <div className="craft-banner__text">
            <p className="label-tag">Our Story</p>
            <h2 className="craft-banner__title display-title">
              Every Piece Tells<br />a Story
            </h2>
            <p className="craft-banner__desc">
              From the forests of Kerala to the workshops of Rajasthan — our artisans
              blend centuries-old joinery techniques with contemporary design sensibilities
              to create furniture that lasts generations.
            </p>
            <Link to="/products" className="btn btn-dark btn-lg">
              Explore Our Collection
            </Link>
          </div>
          <div className="craft-banner__visual" aria-hidden="true">
            <div className="craft-banner__icon-grid">
              <div className="craft-icon">🪵<p>Sheesham</p></div>
              <div className="craft-icon">🌳<p>Teak</p></div>
              <div className="craft-icon">🎋<p>Bamboo</p></div>
              <div className="craft-icon">🌿<p>Cane</p></div>
              <div className="craft-icon">⚒️<p>Mango</p></div>
              <div className="craft-icon">✨<p>Rosewood</p></div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
