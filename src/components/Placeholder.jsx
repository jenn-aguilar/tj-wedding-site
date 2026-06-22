import './Placeholder.css'

/**
 * Renders one of two states:
 *   1. A real photo when `image` is provided (path from /public).
 *   2. A soft beige/sage gradient with a leaf watermark when `image` is empty.
 */
export default function Placeholder({ label = 'Photo coming soon', ratio = '16/10', tone = 'sage', image, alt }) {
  if (image) {
    return (
      <div className="placeholder placeholder--has-image" style={{ aspectRatio: ratio }}>
        <img src={image} alt={alt || label} loading="lazy" />
      </div>
    )
  }
  return (
    <div
      className={`placeholder placeholder--${tone}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <svg className="placeholder__leaf" viewBox="0 0 120 120" aria-hidden="true">
        <path
          d="M60 8 C 30 30, 18 60, 18 92 C 18 105, 28 112, 40 112 C 70 112, 102 84, 102 50 C 102 28, 90 14, 78 10 C 72 8, 66 8, 60 8 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M60 14 L 60 108" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M60 30 L 36 56 M60 50 L 32 78 M60 70 L 38 94" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M60 30 L 84 56 M60 50 L 88 78 M60 70 L 82 94" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      <span className="placeholder__label">{label}</span>
    </div>
  )
}
