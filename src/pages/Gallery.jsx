import React, { useCallback, useState } from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Lightbox from '../components/Lightbox.jsx'
import PageGate from '../components/PageGate.jsx'
import './Gallery.css'

export default function Gallery() {
  const photos = config.preweddingPhotos || []
  const story = config.ourStory || {}
  const [openIdx, setOpenIdx] = useState(null)

  const close = useCallback(() => setOpenIdx(null), [])
  const prev = useCallback(() => setOpenIdx((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)), [photos.length])
  const next = useCallback(() => setOpenIdx((i) => (i === null ? null : (i + 1) % photos.length)), [photos.length])

  return (
    <PageGate show={config.pages?.gallery !== false} eyebrow="Our Story" title="A few moments along the way">
    <div className="page gallery-page">
      {/* ─── HERO + OUR STORY ─── */}
      <section className="section section--beige">
        <div className="container gallery-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Our Story"
              title="A few moments along the way"
              subtitle={story.text}
            />
          </Reveal>
        </div>
      </section>

      {/* ─── PHOTOS ─── */}
      <section className="section section--beige gallery-photos-section">
        <div className="container">
          <Reveal>
            <div className="gallery-section-head">
              <span className="gallery-eyebrow">Pre-Wedding Photos</span>
              <h2>Browse our album</h2>
            </div>
          </Reveal>

          {photos.length > 0 ? (
            <div className="gallery-masonry">
              {photos.map((photo, i) => (
                <Reveal key={photo.src || i} delay={Math.min(i * 0.03, 0.3)}>
                  <button
                    type="button"
                    className="gallery-tile"
                    onClick={() => setOpenIdx(i)}
                    aria-label={`Open photo: ${photo.caption || photo.alt || `${i + 1}`}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt || photo.caption || `Pre-wedding photo ${i + 1}`}
                      loading="lazy"
                    />
                    {photo.caption && (
                      <span className="gallery-tile__caption">{photo.caption}</span>
                    )}
                    <span className="gallery-tile__zoom" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M11 4 a 7 7 0 1 0 0 14 a 7 7 0 1 0 0 -14 M 16 16 L 21 21 M 8 11 L 14 11 M 11 8 L 11 14" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="gallery-empty">
                <span className="gallery-empty__icon" aria-hidden="true">📸</span>
                <p>Photos coming soon — stay tuned!</p>
                <small>The album will appear here once we've added our pre-wedding photos.</small>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Lightbox
        photos={photos}
        index={openIdx}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </div>
    </PageGate>
  )
}
