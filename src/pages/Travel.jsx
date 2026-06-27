import React from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import Placeholder from '../components/Placeholder.jsx'
import './Travel.css'

export default function Travel() {
  const travel = config.travel || {}
  const accommodation = config.accommodation || {}
  const venueMapsUrl = config.venue?.googleMapsUrl

  const tips = [
    travel.currency && { icon: '💵', title: 'Currency', body: travel.currency },
    travel.language && { icon: '🗣️', title: 'Language', body: travel.language },
    travel.timezone && { icon: '🕒', title: 'Time zone', body: travel.timezone },
    travel.emergencyContact && { icon: '📞', title: 'Emergency', body: travel.emergencyContact },
  ].filter(Boolean)

  return (
    <div className="page travel-page">
      {/* ─── HERO ───────────────────────────────────────── */}
      <section className="section section--beige travel-hero">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Travel & Stay"
              title="Getting to Đà Nẵng"
              subtitle="Everything you need to know to plan your trip to Vietnam — flights, accommodation, and a few tips for the road."
            />
          </Reveal>
        </div>
      </section>

      {/* ─── GETTING THERE ──────────────────────────────── */}
      <section className="section section--sage">
        <div className="container">
          <Reveal>
            <div className="travel-section-head">
              <span className="travel-eyebrow">Getting There</span>
              <h2>Flying into Đà Nẵng</h2>
            </div>
          </Reveal>
          <div className="travel-cards">
            <Reveal delay={0.05}>
              <article className="travel-card">
                <span className="travel-card__icon" aria-hidden="true">✈️</span>
                <h3>{travel.nearestAirport || 'Airport'}</h3>
                {travel.airportDistance && <p>{travel.airportDistance}</p>}
              </article>
            </Reveal>
            <Reveal delay={0.1}>
              <article className="travel-card">
                <span className="travel-card__icon" aria-hidden="true">📅</span>
                <h3>When to arrive</h3>
                {travel.flightNotes && <p>{travel.flightNotes}</p>}
              </article>
            </Reveal>
            <Reveal delay={0.15}>
              <article className="travel-card">
                <span className="travel-card__icon" aria-hidden="true">🛂</span>
                <h3>Visa</h3>
                {travel.visaInfo && <p>{travel.visaInfo}</p>}
                {travel.visaUrl && (
                  <a
                    href={travel.visaUrl}
                    className="travel-card__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Official Vietnam e-Visa site ↗
                  </a>
                )}
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── WHERE TO STAY ──────────────────────────────── */}
      <section className="section section--beige">
        <div className="container">
          <Reveal>
            <div className="travel-section-head">
              <span className="travel-eyebrow">Where to Stay</span>
              <h2>Recommended accommodation</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="travel-hotel">
              <div className="travel-hotel__media">
                <Placeholder
                  ratio="4/3"
                  tone="sage"
                  label="Hotel photo coming soon"
                  image={config.images?.venueCardImage || ''}
                  alt={accommodation.hotelName}
                />
              </div>
              <div className="travel-hotel__body">
                <span className="travel-hotel__featured">⭐ Featured · Wedding Venue</span>
                <h3 className="travel-hotel__name">{accommodation.hotelName || config.venue?.name}</h3>
                {(accommodation.checkInDisplay || accommodation.checkOutDisplay) && (
                  <ul className="travel-hotel__dates">
                    {accommodation.checkInDisplay && (
                      <li><strong>Check-in</strong><span>{accommodation.checkInDisplay}</span></li>
                    )}
                    {accommodation.checkOutDisplay && (
                      <li><strong>Check-out</strong><span>{accommodation.checkOutDisplay}</span></li>
                    )}
                  </ul>
                )}
                {accommodation.notes && <p className="travel-hotel__notes">{accommodation.notes}</p>}
                {accommodation.bookingDetails && (
                  <p className="travel-hotel__booking">{accommodation.bookingDetails}</p>
                )}
                <div className="travel-hotel__actions">
                  {accommodation.bookingUrl ? (
                    <a
                      href={accommodation.bookingUrl}
                      className="btn btn--primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book your room ↗
                    </a>
                  ) : (
                    <button type="button" className="btn btn--primary" disabled aria-disabled="true">
                      Booking link coming soon
                    </button>
                  )}
                  {venueMapsUrl && (
                    <a
                      href={venueMapsUrl}
                      className="btn btn--ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on map ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ─── LOCAL TRANSPORT ────────────────────────────── */}
      {travel.localTransport && (
        <section className="section section--sage">
          <div className="container">
            <Reveal>
              <div className="travel-section-head">
                <span className="travel-eyebrow">Local Transport</span>
                <h2>Getting around</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="travel-transport">
                <span className="travel-transport__icon" aria-hidden="true">🚖</span>
                <p>{travel.localTransport}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─── TIPS FOR INTERNATIONAL GUESTS ──────────────── */}
      {tips.length > 0 && (
        <section className="section section--beige">
          <div className="container">
            <Reveal>
              <div className="travel-section-head">
                <span className="travel-eyebrow">Good to Know</span>
                <h2>Tips for international guests</h2>
              </div>
            </Reveal>
            <ul className="travel-tips" role="list">
              {tips.map((t, i) => (
                <Reveal as="li" key={t.title} delay={Math.min(i * 0.05, 0.2)}>
                  <span className="travel-tips__icon" aria-hidden="true">{t.icon}</span>
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}
