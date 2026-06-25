import React from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import Placeholder from '../components/Placeholder.jsx'
import './Venue.css'

export default function Venue() {
  const venue = config.venue
  const hero = venue.heroImage || config.images?.venueHeroImage || ''

  return (
    <div className="page venue-page">
      {/* ─── HERO ───────────────────────────────────────── */}
      <section className={`venue-hero ${hero ? 'venue-hero--photo' : ''}`}>
        {hero ? (
          <img className="venue-hero__img" src={hero} alt={venue.name} />
        ) : (
          <div className="venue-hero__gradient" aria-hidden="true" />
        )}
        <div className="venue-hero__overlay" aria-hidden="true" />
        <div className="container venue-hero__content">
          <span className="venue-hero__eyebrow">The Venue</span>
          <h1 className="venue-hero__name">{venue.name}</h1>
          <p className="venue-hero__address">{venue.address}</p>
        </div>
      </section>

      {/* ─── ABOUT + CTAs ───────────────────────────────── */}
      <section className="section section--beige">
        <div className="container venue-about">
          <Reveal>
            <p className="venue-about__lead">{venue.description}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="venue-about__actions">
              {venue.googleMapsUrl && (
                <a
                  href={venue.googleMapsUrl}
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps ↗
                </a>
              )}
              {venue.websiteUrl && (
                <a
                  href={venue.websiteUrl}
                  className="btn btn--ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit resort website ↗
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── AMENITIES ──────────────────────────────────── */}
      {venue.amenities?.length > 0 && (
        <section className="section section--sage">
          <div className="container">
            <Reveal>
              <div className="venue-section-head">
                <span className="venue-eyebrow">Amenities</span>
                <h2>What you'll find here</h2>
              </div>
            </Reveal>
            <ul className="venue-amenities" role="list">
              {venue.amenities.map((a, i) => (
                <Reveal as="li" delay={Math.min(i * 0.05, 0.25)} key={a.label}>
                  <span className="venue-amenities__icon" aria-hidden="true">{a.icon}</span>
                  <span className="venue-amenities__label">{a.label}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ─── PHOTO GALLERY ──────────────────────────────── */}
      <section className="section section--beige">
        <div className="container">
          <Reveal>
            <div className="venue-section-head">
              <span className="venue-eyebrow">A look around</span>
              <h2>Photos of the resort</h2>
            </div>
          </Reveal>
          <div className="venue-photos">
            {venue.photos?.length > 0 ? (
              venue.photos.map((photo, i) => (
                <Reveal key={photo.src || i} delay={Math.min(i * 0.05, 0.3)}>
                  <figure className="venue-photo">
                    <img
                      src={photo.src}
                      alt={photo.alt || `${venue.name} photo`}
                      loading="lazy"
                    />
                    {photo.caption && <figcaption>{photo.caption}</figcaption>}
                  </figure>
                </Reveal>
              ))
            ) : (
              // Empty-state placeholders so the section never looks broken
              Array.from({ length: 4 }).map((_, i) => (
                <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                  <Placeholder ratio="4/3" tone={i % 2 === 0 ? 'sage' : 'sky'} label="Photo coming soon" />
                </Reveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ─── MAP ────────────────────────────────────────── */}
      <section className="section section--beige venue-map-section">
        <div className="container">
          <Reveal>
            <div className="venue-section-head">
              <span className="venue-eyebrow">Find us here</span>
              <h2>On the map</h2>
              <p className="venue-section-head__sub">{venue.address}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {venue.googleMapsEmbed ? (
              <div className="venue-map">
                <iframe
                  src={venue.googleMapsEmbed}
                  title={`Map showing ${venue.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="venue-map venue-map--placeholder" role="img" aria-label="Map placeholder">
                <svg viewBox="0 0 200 120" aria-hidden="true">
                  <rect width="200" height="120" fill="#ECF3F8"/>
                  <path d="M 0 80 Q 50 60 100 75 T 200 70" stroke="#8FAF8B" strokeWidth="1.5" fill="none" opacity="0.4"/>
                  <path d="M 0 100 Q 50 85 100 95 T 200 90" stroke="#8FAF8B" strokeWidth="1.5" fill="none" opacity="0.3"/>
                  <circle cx="100" cy="60" r="6" fill="#1E3A5F"/>
                  <path d="M 100 60 L 100 75 L 94 70 Z M 100 60 L 100 75 L 106 70 Z" fill="#1E3A5F"/>
                </svg>
                <p>
                  Map preview will appear here once <code>venue.googleMapsEmbed</code> is filled in.
                  {venue.googleMapsUrl && <> Until then, use the link below.</>}
                </p>
              </div>
            )}
          </Reveal>
          {venue.googleMapsUrl && (
            <Reveal delay={0.15}>
              <div className="venue-map__cta">
                <a
                  href={venue.googleMapsUrl}
                  className="btn btn--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions ↗
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  )
}
