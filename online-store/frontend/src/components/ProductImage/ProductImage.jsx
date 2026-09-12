/**
 * ProductImage.jsx
 * -----------------
 * Reusable image renderer for product photographs/illustrations.
 *
 * - Builds the absolute image URL from the API origin.
 * - Shows the provided `fallback` node while the image is missing or fails
 *   to load (e.g. old cached cart/order snapshots without an image field).
 *
 * Props:
 *   image    {string|null}  relative (or absolute) image path from the API
 *   alt      {string}       accessible description
 *   className{string}       applied to the <img> element
 *   fallback {ReactNode}    rendered when there is no image or it errors
 */

import { useState } from 'react';
import { getProductImageUrl } from '../../utils/formatters';

export default function ProductImage({ image, alt = '', className = '', fallback = null, ...rest }) {
  const [errored, setErrored] = useState(false);

  const imageUrl = getProductImageUrl(image);
  if (!imageUrl || errored) return fallback;

  return (
    <img
      className={className}
      src={imageUrl}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}