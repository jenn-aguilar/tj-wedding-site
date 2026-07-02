import React, { useCallback, useState } from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Placeholder from '../components/Placeholder.jsx'
import Lightbox from '../components/Lightbox.jsx'
import PageGate from '../components/PageGate.jsx'
import './DressCode.css'

export default function DressCode() {
  const dress = config.dressCode || {}
  const palette = dress.palette || []
  const paletteNames = dress.paletteNames || []
  const samples = dress.samples
  const samplePhotos = (samples?.photos || []).filter((p) => p?.src)

  const [openIdx, setOpenIdx] = useState(null)
  const closeLightbox = useCallback(() => setOpenIdx(null), [])
  const prevPhoto = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + samplePhotos.length) % samplePhotos.length)),
    [samplePhotos.length]
  )
  const nextPhoto = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % samplePhotos.length)),
    [samplePhotos.length]
  )

  /** Maps a photo's position in the FULL list to its position in the
   *  src-only list (which is what Lightbox sees). Returns -1 if no src. */
  const lightboxIdxFor = (fullIdx) => {
    const p = samples?.photos?.[fullIdx]
    if (!p?.src) return -1
    return samplePhotos.findIndex((sp) => sp.src === p.src)
  }

  return (
    <PageGate show={config.pages?.dressCode !== false} eyebrow="Dress Code" title={dress.label}>
    <div className="page dress-page">
      {/* ─── HERO ─── */}
      <section className="section section--beige">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Dress Code"
              title={dress.label || 'Cocktail · Semi-Formal · Formal'}
              subtitle={dress.subtitle}
            />
          </Reveal>
          {dress.notes && (
            <Reveal delay={0.1}>
              <p className="dress-notes">{dress.notes}</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* ─── PALETTE (circles) ─── */}
      <section className="section section--sage">
        <div className="container dress-palette-section">
          <Reveal>
            <div className="dress-section-head">
              <span className="dress-eyebrow">Our Palette</span>
              <h2>Sea, sky, and earth tones</h2>
            </div>
          </Reveal>
          <ul className="dress-palette" role="list">
            {palette.map((hex, i) => {
              const name = paletteNames[i] || `Color ${i + 1}`
              return (
                <Reveal as="li" key={hex + i} delay={Math.min(i * 0.05, 0.25)}>
                  <article className="dress-swatch" style={{ '--swatch': hex }}>
                    <div className="dress-swatch__circle" aria-hidden="true" />
                    <div className="dress-swatch__meta">
                      <h3>{name}</h3>
                      <code>{String(hex).toUpperCase()}</code>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </ul>
          <Reveal delay={0.2}>
            <p className="dress-palette__note">
              You're not required to match our palette, but we'd love it if you did! 💛
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── SAMPLE LOOKS (positive examples) ─── */}
      {samples && (
        <section className="section section--beige dress-samples">
          <div className="container">
            <Reveal>
              <div className="dress-section-head">
                <span className="dress-eyebrow">Style Inspiration</span>
                <h2>{samples.title || 'Sample looks'}</h2>
                {samples.description && (
                  <p className="dress-section-head__sub">{samples.description}</p>
                )}
              </div>
            </Reveal>
            <ul className="dress-samples-grid" role="list">
              {(samples.photos || []).map((p, i) => {
                const lbIdx = lightboxIdxFor(i)
                return (
                  <Reveal as="li" key={(p.src || p.caption || i)} delay={Math.min(i * 0.05, 0.2)}>
                    <figure className="dress-sample-card">
                      {p.src ? (
                        <button
                          type="button"
                          className="dress-sample-card__photo-btn"
                          onClick={() => setOpenIdx(lbIdx)}
                          aria-label={`Open photo${p.caption ? `: ${p.caption}` : ''}`}
                        >
                          <img
                            src={p.src}
                            alt={p.alt || p.caption || 'Outfit inspiration'}
                            loading="lazy"
                          />
                          <span className="dress-sample-card__zoom" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                              <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.6"/>
                              <path d="M16 16 L 21 21 M 8 11 L 14 11 M 11 8 L 11 14" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                            </svg>
                          </span>
                        </button>
                      ) : (
                        <Placeholder ratio="3/4" tone="sage" label="Photo coming soon" />
                      )}
                      {p.caption && <figcaption>{p.caption}</figcaption>}
                    </figure>
                  </Reveal>
                )
              })}
            </ul>

            {samples.avoidNote && (
              <Reveal delay={0.2}>
                <p className="dress-samples__avoid">
                  <span className="dress-samples__avoid-label" aria-hidden="true">💡 A small note —</span>{' '}
                  {samples.avoidNote}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <Lightbox
        photos={samplePhotos}
        index={openIdx}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </div>
    </PageGate>
  )
}
