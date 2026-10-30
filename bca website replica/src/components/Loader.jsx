import React, { useState, useEffect } from 'react';

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setVisible(false), 800);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      id="loader"
      style={{
        opacity: loading ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
        transition: 'opacity 0.8s ease, visibility 0.8s ease'
      }}
    >
      <div className="loader-content">
        <div className="spinner-border text-warning" style={{ width: '70px', height: '70px' }}></div>
        <h3 className="mt-4">Department of Computer Applications</h3>
        <p>Loading Official Website...</p>
      </div>
    </div>
  );
}
