import React, { useCallback, useEffect, useRef } from 'react'
import './Lightbox.css'

/**
 * Modal lightbox for browsing a list of photos.
 *
 * Props:
 *   photos  – [{ src, caption?, alt? }, …]
 *   index   – currently-open photo index (null/undefined = closed)
 *   onClose – called when user dismisses (Escape, backdrop, close button)
 *   onPrev / onNext – called when user navigates
 */
export default function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const closeBtnRef = useRef(null)
  const isOpen = typeof index === 'number' && photos?.[index]
  const photo = isOpen ? photos[index] : null

  // Lock body scroll + capture Escape / arrow keys
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      else if (e.key === 'ArrowLeft' && onPrev) { e.preventDefault(); onPrev() }
      else if (e.key === 'ArrowRight' && onNext) { e.preventDefault(); onNext() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose, onPrev, onNext])

  // Swipe handling for touch devices
  const touchStartX = useRef(null)
  const onTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX }, [])
  const onTouchEnd = useCallback((e) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 50) {
      if (dx < 0 && onNext) onNext()
      else if (dx > 0 && onPrev) onPrev()
    }
    touchStartX.current = null
  }, [onNext, onPrev])

  if (!isOpen) return null

  const hasMultiple = photos.length > 1

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || photo.alt || 'Photo'}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <button
        ref={closeBtnRef}
        type="button"
        className="lightbox__close"
        aria-label="Close (Esc)"
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6 L 18 18 M 18 6 L 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {hasMultiple && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          aria-label="Previous photo (←)"
          onClick={onPrev}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6 L 9 12 L 15 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <figure
        className="lightbox__figure"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt || photo.caption || 'Photo'}
          className="lightbox__img"
        />
        {photo.caption && (
          <figcaption className="lightbox__caption">{photo.caption}</figcaption>
        )}
        {hasMultiple && (
          <p className="lightbox__counter">{index + 1} / {photos.length}</p>
        )}
      </figure>

      {hasMultiple && (
        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          aria-label="Next photo (→)"
          onClick={onNext}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6 L 15 12 L 9 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}
