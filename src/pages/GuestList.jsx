import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import PageGate from '../components/PageGate.jsx'
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
    <PageGate show={config.pages?.guestList !== false} eyebrow="Entourage" title="A private gathering">
      <div className="page guest-page">
        {unlocked
          ? <Entourage onLock={() => { sessionStorage.removeItem(UNLOCK_KEY); setUnlocked(false) }} />
          : <PasswordGate onUnlock={unlock} />}
      </div>
    </PageGate>
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
            eyebrow="Entourage"
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
            <button type="submit" className="btn btn--primary guest-gate__submit">Unlock entourage →</button>
            <Link to="/home" className="guest-gate__back">← Back to home</Link>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Renders the elegant printed-program layout. Each row is either 1 or 2 roles.
 * On mobile, 2-col rows automatically stack to 1 col for readability.
 */
function Entourage({ onLock }) {
  const rows = config.entourage || []

  return (
    <section className="section section--beige">
      <div className="container guest-shell guest-shell--wide">
        <Reveal>
          <header className="entourage-header">
            <span className="entourage-header__eyebrow">Entourage</span>
            <h1 className="entourage-header__couple">{config.couple.displayName}</h1>
            <p className="entourage-header__sub">The wedding party</p>
            <div className="entourage-header__divider" aria-hidden="true">
              <span /><svg viewBox="0 0 24 24"><path d="M12 4 L 14 10 L 20 12 L 14 14 L 12 20 L 10 14 L 4 12 L 10 10 Z" fill="currentColor"/></svg><span />
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="entourage-toolbar">
            <button type="button" className="guest-toolbar__lock" onClick={onLock} aria-label="Re-lock the entourage">
              🔒 Lock
            </button>
          </div>
        </Reveal>

        {rows.length > 0 ? (
          <ol className="entourage" role="list">
            {rows.map((row, i) => {
              const cols = (row?.length === 1) ? 'one' : 'two'
              return (
                <Reveal as="li" key={i} delay={Math.min(i * 0.04, 0.25)}>
                  <div className={`entourage-row entourage-row--${cols}`}>
                    {row.map((role, j) => (
                      <div className="entourage-role" key={`${role.label}-${j}`}>
                        <h2 className="entourage-role__label">{role.label}</h2>
                        <ul className="entourage-role__names" role="list">
                          {(role.names || []).map((name, k) => (
                            <li key={k}>{name}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )
            })}
          </ol>
        ) : (
          <Reveal>
            <p className="entourage-empty">The entourage will be shared here soon. 💛</p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
