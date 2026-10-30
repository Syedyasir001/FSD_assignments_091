import React, { useState } from 'react';
import GalleryLightbox from './GalleryLightbox';

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    '/assets/gallery/gallery1.jpg',
    '/assets/gallery/gallery2.jpg',
    '/assets/gallery/gallery3.jpg',
    '/assets/gallery/gallery4.jpg',
    '/assets/gallery/gallery5.jpg',
    '/assets/gallery/gallery6.jpg'
  ];

  return (
    <section id="gallery" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="section-subtitle">CAMPUS LIFE</span>
          <h2 className="section-title">Department Gallery</h2>
          <p>Explore our classrooms, laboratories, events, workshops, and student activities.</p>
        </div>

        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div className="gallery-item" key={idx} onClick={() => setActiveImage(img)}>
              <img src={img} alt={`Gallery Image ${idx + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <GalleryLightbox image={activeImage} onClose={() => setActiveImage(null)} />
    </section>
  );
}
