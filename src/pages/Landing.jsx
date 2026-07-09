import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import config from '../config.js'
import './Landing.css'

const SKIP_KEY = 'tj-envelope-opened'

export default function Landing() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const [opened, setOpened] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const envelopeRef = useRef(null)

  // Returning visitors: auto-open with no animation
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(SKIP_KEY) === '1') {
      setOpened(true)
      setShowCta(true)
    }
  }, [])

  const open = () => {
    if (opened) return
    setOpened(true)
    if (typeof window !== 'undefined') localStorage.setItem(SKIP_KEY, '1')
    setTimeout(() => setShowCta(true), reduce ? 0 : 1500)
  }

  const enter = () => navigate('/home')

  return (
    <main className="landing">
      <a className="landing__skip" href="#enter" onClick={(e) => { e.preventDefault(); open(); setTimeout(enter, 50) }}>
        Skip animation →
      </a>

      <div
        className={`landing__bg ${config.images.envelopeBackground ? 'landing__bg--photo' : ''}`}
        style={config.images.envelopeBackground ? { backgroundImage: `url("${config.images.envelopeBackground}")` } : undefined}
        aria-hidden="true"
      />

      <motion.div
        ref={envelopeRef}
        className={`envelope ${opened ? 'is-open' : ''}`}
        role="button"
        tabIndex={0}
        aria-label={opened ? 'Invitation opened' : 'Open your invitation'}
        aria-pressed={opened}
        onClick={open}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } }}
        animate={opened || reduce ? {} : { y: [0, -6, 0, 6, 0], rotate: [0, -1, 0, 1, 0] }}
        transition={opened || reduce ? {} : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Card behind the flap — slides up when opened */}
        <div className={`envelope__card ${opened ? 'is-out' : ''}`}>
          <div className="envelope__card-inner">
            <span className="card__eyebrow">You're invited to celebrate</span>
            <h1 className="card__names">{config.couple.displayName}</h1>
            <div className="card__divider"><span /><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 L 14 10 L 20 12 L 14 14 L 12 20 L 10 14 L 4 12 L 10 10 Z" fill="currentColor"/></svg><span /></div>
            <p className="card__date">{config.wedding.displayDay}, {config.wedding.displayDate}</p>
            <p className="card__venue">{config.venue.name}</p>
            <p className="card__venue-city">Đà Nẵng · Vietnam</p>
            <p className="card__time">{config.wedding.time}</p>
          </div>
        </div>

        {/* Envelope body */}
        <div className="envelope__back" />
        <div className="envelope__front" />

        {/* Flap + wax seal rotate as a single group so the seal isn't clipped
            by the flap triangle and stays attached when opening. */}
        <div className="envelope__flap-group">
          <div className="envelope__flap" />
          <div className="wax-seal" aria-hidden="true">
            <div className="wax-seal__ring" />
            <span className="wax-seal__mono">T<span className="wax-seal__amp">&amp;</span>J</span>
          </div>
        </div>

        {/* Confetti petals */}
        {opened && !reduce && (
          <div className="petals" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className={`petal petal--${i % 4}`} style={{
                left: `${(i / 14) * 100}%`,
                animationDelay: `${i * 0.08}s`,
              }} />
            ))}
          </div>
        )}
      </motion.div>

      <p className={`landing__hint ${opened ? 'is-hidden' : ''}`} aria-hidden={opened}>
        Click the seal of the envelope to open.
      </p>

      <div className={`landing__cta ${showCta ? 'is-show' : ''}`}>
        <button id="enter" className="btn btn--primary" onClick={enter}>
          Enter the celebration →
        </button>
      </div>
    </main>
  )
}
