import React from 'react'
import './BackToTop.css'

/**
 * In-flow "Back to top" link that sits at the bottom of a page (just above
 * the footer). Not a floating button — a deliberate end-of-page affordance.
 *
 * Respects prefers-reduced-motion (jumps instead of smooth-scrolls).
 */
export default function BackToTop({ label = 'Back to top' }) {
  const handleClick = (e) => {
    e.preventDefault()
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: prefersReduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="back-to-top">
      <a href="#top" className="back-to-top__btn" onClick={handleClick}>
        <span className="back-to-top__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 14 L 12 9 L 17 14" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="back-to-top__label">{label}</span>
      </a>
    </div>
  )
}
