import { Link } from 'react-router-dom'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import Countdown from '../components/Countdown.jsx'
import Placeholder from '../components/Placeholder.jsx'
import AddToCalendar from '../components/AddToCalendar.jsx'
import './Home.css'

export default function Home() {
  const ceremonyTime = config.wedding.time
  const glance = config.timeline.slice(0, 3)

  return (
    <div className="page home">
      {/* ─── HERO / SAVE THE DATE ─────────────────────────── */}
      <section className="home-hero">
        <div
          className={`home-hero__bg ${config.images.heroBackground ? 'home-hero__bg--photo' : ''}`}
          style={config.images.heroBackground ? { backgroundImage: `url("${config.images.heroBackground}")` } : undefined}
          aria-hidden="true"
        />
        <div className="container home-hero__inner">
          <span className="home-hero__eyebrow">Save the Date</span>
          <h1 className="home-hero__names">{config.couple.displayName}</h1>
          <p className="home-hero__date">
            {config.wedding.displayDay}, {config.wedding.displayDate} · {ceremonyTime}
          </p>
          <p className="home-hero__venue">{config.venue.name} · Đà Nẵng, Vietnam</p>

          <Countdown targetIso={config.wedding.date} />

          <div className="home-hero__actions">
            <Link to="/rsvp" className="btn btn--primary">RSVP</Link>
            <AddToCalendar variant="ghost" />
          </div>
        </div>

        {/* Scroll cue sits at the bottom of the full hero section (not the
            centered inner block) so it never overlaps the buttons. */}
        <a href="#welcome" className="home-hero__scroll" aria-label="Scroll to learn more">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 10 L 12 16 L 18 10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </section>

      {/* ─── WELCOME ───────────────────────────────────────── */}
      <section id="welcome" className="section section--beige">
        <div className="container home-welcome">
          {config.images.welcomeImage && (
            <Reveal className="home-welcome__media">
              <img src={config.images.welcomeImage} alt="The couple" loading="lazy" />
            </Reveal>
          )}
          <Reveal>
            <span className="home-welcome__eyebrow">Welcome</span>
            <h2 className="home-welcome__title">A celebration of love by the sea</h2>
            <p className="home-welcome__body">{config.ourStory.text}</p>
            <p className="home-welcome__intro">
              We are so excited to celebrate with you in Đà Nẵng. This site is your guide — explore each section
              to learn about the day, the venue, travel, and everything in between.
            </p>
            <Link to="/gallery" className="home-link">Read our story →</Link>
          </Reveal>
        </div>
      </section>

      {/* ─── VENUE ─────────────────────────────────────────── */}
      <section className="section section--sage">
        <div className="container home-two-col">
          <Reveal className="home-two-col__media">
            <Link to="/venue" className="home-two-col__media-link" aria-label={`See more about ${config.venue.name}`}>
              <Placeholder label="Mikazuki Resorts" ratio="4/3" tone="sage" image={config.images.venueCardImage} alt={config.venue.name} />
              <span className="home-two-col__media-hint" aria-hidden="true">See the venue →</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="home-two-col__copy">
            <span className="home-eyebrow">The Venue</span>
            <h2>{config.venue.name}</h2>
            <p className="home-muted">{config.venue.address}</p>
            <p>{config.venue.description}</p>
            <Link to="/venue" className="btn btn--primary">See the venue →</Link>
          </Reveal>
        </div>
      </section>

      {/* ─── TRAVEL & STAY ─────────────────────────────────── */}
      <section className="section section--beige">
        <div className="container home-two-col home-two-col--reverse">
          <Reveal className="home-two-col__media">
            <Link to="/travel" className="home-two-col__media-link" aria-label="Plan your trip — travel info">
              <Placeholder label="Da Nang, Vietnam" ratio="4/3" tone="sky" image={config.images.travelCardImage} alt="Da Nang, Vietnam" />
              <span className="home-two-col__media-hint" aria-hidden="true">Plan your trip →</span>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="home-two-col__copy">
            <span className="home-eyebrow">Travel & Stay</span>
            <h2>Plan your trip</h2>
            <ul className="home-list">
              <li><strong>Fly into:</strong> {config.travel.nearestAirport}</li>
              <li><strong>Distance to venue:</strong> {config.travel.airportDistance}</li>
              <li><strong>Recommended check-in:</strong> {config.accommodations?.[0]?.checkInDisplay}</li>
              <li><strong>Recommended check-out:</strong> {config.accommodations?.[0]?.checkOutDisplay}</li>
            </ul>
            <Link to="/travel" className="btn btn--primary">Plan your trip →</Link>
          </Reveal>
        </div>
      </section>

      {/* ─── WEDDING DAY AT A GLANCE ───────────────────────── */}
      <section className="section section--sky">
        <div className="container">
          <Reveal>
            <div className="home-section-head">
              <span className="home-eyebrow">The Big Day</span>
              <h2>Wedding day at a glance</h2>
              <p className="home-muted">A few moments to look forward to. The full timeline lives on its own page.</p>
            </div>
          </Reveal>
          <div className="home-glance">
            {glance.map((item, i) => (
              <Reveal key={item.event} delay={i * 0.08}>
                <article className="home-glance__card">
                  <span className="home-glance__icon" aria-hidden="true">{item.icon}</span>
                  <p className="home-glance__time">{item.time}</p>
                  <h3 className="home-glance__title">{item.event}</h3>
                  <p className="home-glance__desc">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="home-section-cta">
            <Link to="/timeline" className="btn btn--ghost">See full timeline →</Link>
          </div>
        </div>
      </section>

      {/* ─── DRESS CODE ─────────────────────────────────────── */}
      <section className="section section--beige">
        <div className="container home-two-col">
          <Reveal className="home-two-col__copy">
            <span className="home-eyebrow">Dress Code</span>
            <h2>{config.dressCode.label}</h2>
            <p className="home-muted">{config.dressCode.subtitle}</p>
            <p>{config.dressCode.notes}</p>
            <Link to="/dress-code" className="btn btn--primary">Dress code details →</Link>
          </Reveal>
          <Reveal delay={0.1} className="home-palette">
            {config.dressCode.palette.map((hex, i) => (
              <div className="home-palette__swatch" key={hex} style={{ background: hex }}>
                <span>{config.dressCode.paletteNames[i]}</span>
                <code>{hex}</code>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ─── RSVP CTA ───────────────────────────────────────── */}
      <section
        className={`section section--navy ${config.images.rsvpBackground ? 'section--photo' : ''}`}
        style={config.images.rsvpBackground ? { backgroundImage: `url("${config.images.rsvpBackground}")` } : undefined}
      >
        <div className="container">
          <Reveal>
            <div className="home-rsvp">
              <span className="home-eyebrow home-eyebrow--light">RSVP</span>
              <h2>Will you join us?</h2>
              <p className="home-rsvp__deadline">Please RSVP by <strong>{config.wedding.rsvpDeadlineDisplay}</strong></p>
              <Link to="/rsvp" className="btn btn--gold">Reply with love →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── REMINDERS TEASER ───────────────────────────────── */}
      <section className="section section--beige">
        <div className="container">
          <Reveal>
            <div className="home-section-head">
              <span className="home-eyebrow">Good to Know</span>
              <h2>A few gentle reminders</h2>
            </div>
          </Reveal>
          <div className="home-reminders">
            {config.reminders.slice(0, 3).map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <article className="home-reminders__card">
                  <span className="home-reminders__icon" aria-hidden="true">{r.icon}</span>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="home-section-cta">
            <Link to="/reminders" className="btn btn--ghost">All reminders →</Link>
          </div>
        </div>
      </section>

      {/* ─── SET THE MOOD / SPOTIFY ─────────────────────────── */}
      {(config.music?.spotifyEmbed || config.music?.spotifyUrl) && (
        <section className="section section--sage">
          <div className="container home-music">
            <Reveal>
              <div className="home-section-head">
                <span className="home-eyebrow">Set the Mood</span>
                <h2>Press play</h2>
                <p className="home-muted">Get in the spirit with our wedding playlist — before, during, and after the celebration.</p>
              </div>
            </Reveal>
            {config.music.spotifyEmbed && (
              <Reveal delay={0.1}>
                <div className="home-spotify">
                  <iframe
                    src={config.music.spotifyEmbed}
                    title="Wedding playlist on Spotify"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            )}
            {config.music.spotifyUrl && (
              <Reveal delay={0.15}>
                <div className="home-section-cta">
                  <a
                    href={config.music.spotifyUrl}
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
