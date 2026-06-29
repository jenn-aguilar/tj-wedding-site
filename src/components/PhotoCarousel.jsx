import React, { useCallback, useEffect, useRef, useState } from 'react'
import './PhotoCarousel.css'

/**
 * Horizontal scroll-snap photo carousel.
 *
 * - Native horizontal scroll (touch-swipe on mobile, drag-or-click on desktop)
 * - Prev / Next buttons that programmatically scroll one slide at a time
 * - Pagination dots reflecting current slide
 * - Renders nothing when `photos` is empty (caller can decide what to show)
 *
 * Props:
 *   photos       – [{ src, caption?, alt? }, …]
 *   onPhotoClick – optional (index) => void; if provided, clicking a slide
 *                  fires this callback (useful for opening a Lightbox).
 *   ratio        – CSS aspect-ratio for each tile (default "4/3")
 *   ariaLabel    – the carousel's accessible name
 */
export default function PhotoCarousel({ photos = [], onPhotoClick, ratio = '4/3', ariaLabel = 'Photo gallery' }) {
  const trackRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  if (!photos.length) return null

  /** Scroll by one slide width. */
  const scrollByOne = useCallback((dir) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector('.carousel__slide')
    if (!slide) return
    const slideW = slide.getBoundingClientRect().width
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: dir * (slideW + gap), behavior: 'smooth' })
  }, [])

  /** Scroll directly to a specific slide. */
  const scrollTo = useCallback((idx) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelectorAll('.carousel__slide')[idx]
    if (slide) {
      // scrollIntoView with inline:'center' keeps the slide centered within the viewport
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [])

  // Track which slide is "most centered" via IntersectionObserver
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const slides = Array.from(track.querySelectorAll('.carousel__slide'))
    if (slides.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible slide as active
        const best = entries
          .filter((e) => e.isIntersecting)
          .reduce((max, e) => (e.intersectionRatio > (max?.intersectionRatio || 0) ? e : max), null)
        if (best) {
          const idx = slides.indexOf(best.target)
          if (idx !== -1) setActiveIdx(idx)
        }
      },
      { root: track, threshold: [0.5, 0.75, 1] }
    )
    slides.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [photos.length])

  const canPrev = activeIdx > 0
  const canNext = activeIdx < photos.length - 1

  return (
    <div className="carousel" role="region" aria-label={ariaLabel} aria-roledescription="carousel">
      <button
        type="button"
        className="carousel__btn carousel__btn--prev"
        onClick={() => scrollByOne(-1)}
        disabled={!canPrev}
        aria-label="Previous photo"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6 L 9 12 L 15 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <ul className="carousel__track" ref={trackRef} role="list">
        {photos.map((photo, i) => {
          const isInteractive = !!onPhotoClick
          const Wrap = isInteractive ? 'button' : 'div'
          return (
            <li className="carousel__slide" key={photo.src || i} aria-roledescription="slide" aria-label={`${i + 1} of ${photos.length}`}>
              <Wrap
                {...(isInteractive ? { type: 'button', onClick: () => onPhotoClick(i), 'aria-label': `Open photo: ${photo.caption || photo.alt || `${i + 1}`}` } : {})}
                className={`carousel__figure ${isInteractive ? 'is-interactive' : ''}`}
                style={{ aspectRatio: ratio }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt || photo.caption || `Photo ${i + 1}`}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  draggable="false"
                />
                {photo.caption && <span className="carousel__caption">{photo.caption}</span>}
              </Wrap>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="carousel__btn carousel__btn--next"
        onClick={() => scrollByOne(1)}
        disabled={!canNext}
        aria-label="Next photo"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6 L 15 12 L 9 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {photos.length > 1 && (
        <ol className="carousel__dots" role="tablist" aria-label="Choose photo">
          {photos.map((_, i) => (
            <li key={i}>
              <button
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Go to photo ${i + 1}`}
                className={`carousel__dot ${i === activeIdx ? 'is-active' : ''}`}
                onClick={() => scrollTo(i)}
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
