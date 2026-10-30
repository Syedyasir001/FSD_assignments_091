import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      id="backToTop"
      className={`btn btn-warning rounded-circle shadow ${visible ? 'd-block' : 'd-none'}`}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        zIndex: 999,
        transition: 'all 0.3s ease'
      }}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}
