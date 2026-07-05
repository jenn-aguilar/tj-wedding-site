import { useState } from 'react'
import './LazyImage.css'

/**
 * <img> with a shimmering skeleton shown until the photo finishes loading
 * (or a small "unavailable" icon if it fails).
 *
 * Two layout modes:
 *   fill    – wrapper fills its parent's fixed box (e.g. a carousel slide
 *             with a forced aspect-ratio); the skeleton covers that box.
 *   natural – wrapper has no parent-imposed height (e.g. a masonry grid);
 *             `placeholderRatio` reserves space while loading, then the
 *             image settles into its own natural aspect ratio once loaded.
 */
export default function LazyImage({
  src,
  alt,
  loading = 'lazy',
  fetchpriority,
  className = '',
  fill = false,
  placeholderRatio = '4/3',
}) {
  const [status, setStatus] = useState('loading')
  const loaded = status === 'loaded'

  return (
    <span
      className={`lazy-img ${fill ? 'lazy-img--fill' : 'lazy-img--natural'}`}
      style={!fill && !loaded ? { aspectRatio: placeholderRatio } : undefined}
    >
      {!loaded && (
        <span className={`lazy-img__skeleton ${status === 'error' ? 'lazy-img__skeleton--error' : ''}`} aria-hidden="true">
          {status === 'error' && (
            <svg className="lazy-img__error-icon" viewBox="0 0 24 24">
              <path d="M4 5h16v14H4z" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <circle cx="9" cy="10" r="1.4" fill="currentColor" stroke="none" />
              <path d="M5 16l4.5-4.5 3 3L18 9" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          )}
        </span>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchpriority={fetchpriority}
        draggable="false"
        className={`lazy-img__img ${className} ${loaded ? 'is-loaded' : 'is-loading'}`}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </span>
  )
}
