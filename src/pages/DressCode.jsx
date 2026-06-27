import React from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import './DressCode.css'

export default function DressCode() {
  const dress = config.dressCode || {}
  const music = config.music || {}
  const palette = dress.palette || []
  const paletteNames = dress.paletteNames || []

  return (
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

      {/* ─── PALETTE ─── */}
      <section className="section section--sage">
        <div className="container dress-palette-section">
          <Reveal>
            <div className="dress-section-head">
              <span className="dress-eyebrow">Our Palette</span>
              <h2>Inspired by the sea, sky, and sand</h2>
            </div>
          </Reveal>
          <ul className="dress-palette" role="list">
            {palette.map((hex, i) => {
              const name = paletteNames[i] || `Color ${i + 1}`
              return (
                <Reveal as="li" key={hex + i} delay={Math.min(i * 0.05, 0.2)}>
                  <article
                    className="dress-swatch"
                    style={{ '--swatch': hex }}
                  >
                    <div className="dress-swatch__color" aria-hidden="true" />
                    <div className="dress-swatch__meta">
                      <h3>{name}</h3>
                      <code>{hex.toUpperCase()}</code>
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

      {/* ─── MUSIC / SET THE MOOD ─── */}
      {(music.spotifyEmbed || music.spotifyUrl) && (
        <section className="section section--beige">
          <div className="container dress-music">
            <Reveal>
              <div className="dress-section-head">
                <span className="dress-eyebrow">Set the Mood</span>
                <h2>Get in the spirit</h2>
                <p className="dress-section-head__sub">
                  Listen to our wedding playlist — before, during, and after the celebration.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              {music.spotifyEmbed ? (
                <div className="dress-spotify">
                  <iframe
                    src={music.spotifyEmbed}
                    title="Wedding playlist on Spotify"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p className="dress-spotify__fallback">
                  Open the playlist in your Spotify app:
                </p>
              )}
            </Reveal>
            {music.spotifyUrl && (
              <Reveal delay={0.15}>
                <div className="dress-music__cta">
                  <a
                    href={music.spotifyUrl}
                    className="btn btn--primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Spotify ↗
                  </a>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
