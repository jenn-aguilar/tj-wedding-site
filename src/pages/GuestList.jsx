import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import './GuestList.css'

const UNLOCK_KEY = 'tj-guests-unlocked'

export default function GuestList() {
  const [unlocked, setUnlocked] = useState(() => {
    try { return sessionStorage.getItem(UNLOCK_KEY) === '1' } catch { return false }
  })

  const unlock = () => {
    try { sessionStorage.setItem(UNLOCK_KEY, '1') } catch { /* ignore */ }
    setUnlocked(true)
  }

  return (
    <div className="page guest-page">
      {unlocked ? <ListContent onLock={() => { sessionStorage.removeItem(UNLOCK_KEY); setUnlocked(false) }} /> : <PasswordGate onUnlock={unlock} />}
    </div>
  )
}

function PasswordGate({ onUnlock }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pw.trim() === (config.guestListPassword || '')) {
      onUnlock()
    } else {
      setError('That doesn\'t look right. Please try again.')
    }
  }

  return (
    <section className="section section--beige">
      <div className="container guest-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Guest List"
            title="A private gathering"
            subtitle="This page is just for our guests. Please enter the password we shared with your invitation."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <form className="guest-gate" onSubmit={handleSubmit} noValidate>
            <label htmlFor="guest-pw" className="guest-gate__label">Password</label>
            <div className="guest-gate__input-row">
              <input
                id="guest-pw"
                ref={inputRef}
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={(e) => { setPw(e.target.value); if (error) setError('') }}
                autoComplete="off"
                placeholder="Enter the password"
                aria-invalid={!!error}
                aria-describedby={error ? 'guest-pw-error' : undefined}
              />
              <button
                type="button"
                className="guest-gate__toggle"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? 'Hide password' : 'Show password'}
                aria-pressed={show}
              >
                {show ? '🙈' : '👁️'}
              </button>
            </div>
            {error && <p id="guest-pw-error" className="guest-gate__error">{error}</p>}
            <button type="submit" className="btn btn--primary guest-gate__submit">Unlock guest list →</button>
            <Link to="/home" className="guest-gate__back">← Back to home</Link>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function ListContent({ onLock }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const allGuests = config.guests || []
  const sections = config.guestSections || []

  /** Counts by section + by RSVP status — recomputed only when guest list changes. */
  const stats = useMemo(() => {
    const total = allGuests.length
    const confirmed = allGuests.filter((g) => g.rsvpStatus === 'confirmed').length
    const declined = allGuests.filter((g) => g.rsvpStatus === 'declined').length
    const pending = total - confirmed - declined
    const bySection = Object.fromEntries(sections.map((s) => [s.id, 0]))
    allGuests.forEach((g) => { if (g.section in bySection) bySection[g.section] += 1 })
    return { total, confirmed, declined, pending, bySection }
  }, [allGuests, sections])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allGuests.filter((g) => {
      if (filter !== 'all' && g.section !== filter) return false
      if (q && !g.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [allGuests, search, filter])

  return (
    <section className="section section--beige">
      <div className="container guest-shell guest-shell--wide">
        <Reveal>
          <header className="guest-header">
            <span className="guest-header__eyebrow">Guest List</span>
            <h1 className="guest-header__title">Our cherished guests</h1>
            <p className="guest-header__counter">
              <strong>{stats.confirmed}</strong> of {stats.total} confirmed
              {stats.declined > 0 && <> · {stats.declined} can't make it</>}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="guest-toolbar">
            <label className="guest-search" htmlFor="guest-search">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13.5 13.5 L 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                id="guest-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name…"
              />
            </label>
            <button type="button" className="guest-toolbar__lock" onClick={onLock} aria-label="Re-lock the guest list">
              🔒 Lock
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <nav className="guest-tabs" aria-label="Filter by section">
            <button
              type="button"
              className={`guest-tab ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
              style={{ '--accent': 'var(--color-navy)' }}
              aria-pressed={filter === 'all'}
            >
              <span className="guest-tab__icon">✨</span>
              All
              <span className="guest-tab__count">{stats.total}</span>
            </button>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`guest-tab ${filter === s.id ? 'is-active' : ''}`}
                onClick={() => setFilter(s.id)}
                style={{ '--accent': s.color }}
                aria-pressed={filter === s.id}
              >
                <span className="guest-tab__icon" aria-hidden="true">{s.icon}</span>
                {s.label}
                <span className="guest-tab__count">{stats.bySection[s.id] || 0}</span>
              </button>
            ))}
          </nav>
        </Reveal>

        {filtered.length === 0 ? (
          <Reveal delay={0.15}>
            <div className="guest-empty">
              {search ? (
                <>
                  <p>No guests match <strong>"{search}"</strong>.</p>
                  <button type="button" className="btn btn--ghost" onClick={() => setSearch('')}>Clear search</button>
                </>
              ) : (
                <p>No guests in this section yet.</p>
              )}
            </div>
          </Reveal>
        ) : (
          <ul className="guest-list" role="list">
            {filtered.map((g, i) => (
              <GuestCard key={`${g.name}-${i}`} guest={g} sections={sections} delay={Math.min(i * 0.02, 0.3)} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function GuestCard({ guest, sections, delay }) {
  const section = sections.find((s) => s.id === guest.section)
  const status = guest.rsvpStatus || 'pending'
  return (
    <Reveal as="li" delay={delay}>
      <article className={`guest-card guest-card--${status}`}>
        <div className="guest-card__main">
          <h3 className="guest-card__name">{guest.name}</h3>
          {section && (
            <span className="guest-card__section" style={{ '--badge': section.color }}>
              <span aria-hidden="true">{section.icon}</span> {section.label}
            </span>
          )}
        </div>
        <span className={`guest-card__status guest-card__status--${status}`} aria-label={`RSVP ${status}`}>
          <span className="guest-card__dot" aria-hidden="true" />
          {status === 'confirmed' ? 'Confirmed' : status === 'declined' ? 'Declined' : 'Pending'}
        </span>
      </article>
    </Reveal>
  )
}
