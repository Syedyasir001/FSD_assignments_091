import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content animate-slide-in-left">
              <div className="hero-badge">
                <span className="dot"></span>
                New Collection 2026
              </div>

              <h1>
                Objects that <br />
                tell a <span className="text-accent">story</span>
              </h1>

              <p className="hero-description">
                Discover handcrafted pieces from independent artisans around the world.
                Every object in our collection is made with intention, designed to bring
                warmth and character to your space.
              </p>

              <div className="hero-actions">
                <Link to="/shop" className="btn btn-primary">
                  Explore the Collection
                </Link>
                <Link to="/shop" className="btn btn-secondary">
                  View All Products
                </Link>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <h3>200+</h3>
                  <p>Artisan Products</p>
                </div>
                <div className="hero-stat">
                  <h3>50+</h3>
                  <p>Global Artisans</p>
                </div>
                <div className="hero-stat">
                  <h3>4.8</h3>
                  <p>Average Rating</p>
                </div>
              </div>
            </div>

            <div className="hero-visual animate-scale-in stagger-2">
              <div className="hero-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80"
                  alt="Curated artisan home decor"
                />
              </div>
              <div className="hero-floating-card">
                <div>
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Ethically<br />Sourced</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <span className="section-tag">Why Atelier</span>
            <h2>Crafted with intention</h2>
            <p>We partner directly with artisans who share our commitment to quality, sustainability, and timeless design.</p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: '◈',
                iconClass: 'terracotta',
                title: 'Handcrafted Quality',
                desc: 'Every piece is made by hand using time-honored techniques passed down through generations of skilled artisans.'
              },
              {
                icon: '❋',
                iconClass: 'sage',
                title: 'Sustainable Materials',
                desc: 'We source only natural, renewable, and responsibly harvested materials that respect the environment.'
              },
              {
                icon: '◎',
                iconClass: 'sand',
                title: 'Direct from Artisans',
                desc: 'Fair partnerships mean artisans receive equitable compensation. No middlemen, just genuine human connection.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`feature-card animate-fade-in-up stagger-${idx + 1}`}
              >
                <div className={`feature-icon ${feature.iconClass}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content animate-fade-in-up">
            <h2>Ready to find your next favorite piece?</h2>
            <p>Browse our full collection of handcrafted goods, each with its own story to tell.</p>
            <Link to="/shop" className="btn btn-primary">
              Shop Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
