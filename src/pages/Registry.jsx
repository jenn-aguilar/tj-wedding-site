import React from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import PageGate from '../components/PageGate.jsx'
import './Registry.css'

export default function Registry() {
  const r = config.registry || {}

  return (
    <PageGate show={config.pages?.registry !== false} eyebrow="Registry" title="A note on gifts">
      <div className="page registry-page">
        {/* ─── HERO + GRATITUDE MESSAGE ─── */}
        <section className="section section--beige">
          <div className="container registry-shell">
            <Reveal>
              <SectionHeader
                eyebrow="Registry"
                title="A note on gifts"
                subtitle="Your presence is the greatest gift of all."
              />
            </Reveal>

            {r.message && (
              <Reveal delay={0.1}>
                <p className="registry-message">
                  <span className="registry-message__quote" aria-hidden="true">“</span>
                  {r.message}
                  <span className="registry-message__quote registry-message__quote--end" aria-hidden="true">”</span>
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* ─── LUCKY MONEY + QR ─── */}
        <section className="section section--sage">
          <div className="container">
            <Reveal>
              <div className="registry-section-head">
                <span className="registry-eyebrow">If you'd like to give</span>
                <h2>Two easy ways</h2>
              </div>
            </Reveal>

            <ul className="registry-cards" role="list">
              {/* Lucky money box */}
              <Reveal as="li" delay={0.05}>
                <article className="registry-card">
                  <span className="registry-card__icon" aria-hidden="true">🧧</span>
                  <h3>Lucky money box</h3>
                  <p>
                    {r.luckyMoneyNote ||
                      'There will be a lucky money box at the venue on the day — feel free to drop a card in if you prefer.'}
                  </p>
                  <span className="registry-card__tag">On the day · At the venue</span>
                </article>
              </Reveal>

              {/* QR code (or placeholder) */}
              <Reveal as="li" delay={0.1}>
                <article className="registry-card">
                  <span className="registry-card__icon" aria-hidden="true">📱</span>
                  <h3>Scan to send a gift</h3>
                  <div className="registry-qr">
                    {r.qrCodeImage ? (
                      <img
                        src={r.qrCodeImage}
                        alt={r.qrCodeLabel || 'QR code for monetary gifts'}
                        loading="lazy"
                      />
                    ) : (
                      <div className="registry-qr__placeholder" aria-hidden="true">
                        <svg viewBox="0 0 60 60">
                          <rect x="2" y="2" width="56" height="56" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4"/>
                          {/* Stylised QR corners */}
                          <rect x="8"  y="8"  width="12" height="12" rx="2" fill="currentColor" opacity="0.35"/>
                          <rect x="40" y="8"  width="12" height="12" rx="2" fill="currentColor" opacity="0.35"/>
                          <rect x="8"  y="40" width="12" height="12" rx="2" fill="currentColor" opacity="0.35"/>
                          {/* Inner dots */}
                          <rect x="26" y="26" width="3" height="3" fill="currentColor" opacity="0.35"/>
                          <rect x="32" y="26" width="3" height="3" fill="currentColor" opacity="0.35"/>
                          <rect x="26" y="32" width="3" height="3" fill="currentColor" opacity="0.35"/>
                          <rect x="38" y="32" width="3" height="3" fill="currentColor" opacity="0.35"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  {r.qrCodeImage ? (
                    <p className="registry-card__caption">{r.qrCodeLabel || 'Scan to send a monetary gift'}</p>
                  ) : (
                    <p className="registry-card__caption">
                      <em>{r.qrCodeNote || 'QR code to follow — check back soon.'}</em>
                    </p>
                  )}
                </article>
              </Reveal>
            </ul>

            <Reveal delay={0.2}>
              <p className="registry-footnote">
                Either way, your love and presence already mean the world to us. 💛
              </p>
            </Reveal>
          </div>
        </section>
      </div>
    </PageGate>
  )
}
