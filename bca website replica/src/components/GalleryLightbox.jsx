import React from 'react';

export default function GalleryLightbox({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="lightbox active" id="galleryLightbox" onClick={onClose}>
      <span className="lightbox-close" onClick={onClose}>
        &times;
      </span>
      <img
        id="lightboxImage"
        src={image}
        alt="Enlarged Gallery"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
