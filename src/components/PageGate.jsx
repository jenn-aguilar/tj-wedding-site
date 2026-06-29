import React from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import SectionHeader from './SectionHeader.jsx'
import './PageGate.css'

/**
 * Renders `children` when `show` is true; otherwise shows a soft "Coming soon"
 * panel so guests know the page is being prepared.
 *
 * `eyebrow` and `title` preserve the page's identity in the placeholder state
 * (e.g. "The Venue · Mikazuki Resorts Da Nang").
 */
export default function PageGate({ show = true, eyebrow, title, children }) {
  if (show) return children

  return (
    <div className="page page-gate-page">
      <section className="section section--beige">
        <div className="container page-gate">
          <Reveal>
            <SectionHeader
              eyebrow={eyebrow}
              title={title || 'Coming soon'}
              subtitle="This page is being prepared with love — please check back closer to the day."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="page-gate__panel">
              <span className="page-gate__icon" aria-hidden="true">⏳</span>
              <p>We're still putting the finishing touches on this section. Thanks for your patience!</p>
              <Link to="/home" className="btn btn--primary">← Back to home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
