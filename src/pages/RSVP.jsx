import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import PageGate from '../components/PageGate.jsx'
import './RSVP.css'

const STATE = { idle: 'idle', sending: 'sending', success: 'success', error: 'error' }
const STORAGE_KEY = 'tj-rsvps'

function emailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** Read the map of all previously-submitted RSVPs from this browser. */
function getStoredRsvps() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function getStoredRsvp(email) {
  const key = email.trim().toLowerCase()
  if (!key) return null
  return getStoredRsvps()[key] || null
}

function saveStoredRsvp(email, data) {
  try {
    const key = email.trim().toLowerCase()
    const all = getStoredRsvps()
    all[key] = { ...data, submittedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch { /* localStorage unavailable — fail quietly */ }
}

const EMPTY_FORM = {
  name: '',
  email: '',
  attending: '',
  kids: '0',
  dietary: '',
  song: '',
  message: '',
}

export default function RSVP() {
  const deadlinePast = useMemo(() => {
    const d = new Date(config.wedding.rsvpDeadline)
    d.setHours(23, 59, 59, 999)
    return Date.now() > d.getTime()
  }, [])

  const isExternal = config.rsvp?.mode === 'external'

  return (
    <PageGate
      show={config.pages?.rsvp !== false}
      eyebrow="RSVP"
      title="Reply with love"
      note={`Please note our RSVP deadline is ${config.wedding.rsvpDeadlineDisplay}.`}
    >
      {isExternal ? <ExternalRsvp /> : deadlinePast ? <DeadlinePassed /> : <RsvpForm />}
    </PageGate>
  )
}

/** Shown under the "Reply with love" hero when `config.rsvp.description` is set. */
function RsvpDescription() {
  const description = config.rsvp?.description
  if (!description) return null
  return <p className="rsvp-description">{description}</p>
}

/** `config.rsvp.mode === 'external'` — sends guests to an outside RSVP manager
    (The Knot, Zola, With Joy, etc) instead of the built-in form. */
function ExternalRsvp() {
  const { externalUrl, externalLabel } = config.rsvp || {}

  return (
    <div className="page rsvp-page">
      <section className="section section--beige">
        <div className="container rsvp-shell">
          <Reveal>
            <SectionHeader eyebrow="RSVP" title="Reply with love" subtitle={`Please let us know by ${config.wedding.rsvpDeadlineDisplay}.`} />
          </Reveal>
          <Reveal delay={0.05}>
            <RsvpDescription />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rsvp-card rsvp-card--external">
              {externalUrl ? (
                <a href={externalUrl} className="btn btn--primary rsvp-submit" target="_blank" rel="noopener noreferrer">
                  {externalLabel || 'RSVP ↗'}
                </a>
              ) : (
                <button type="button" className="btn btn--primary rsvp-submit" disabled aria-disabled="true">
                  RSVP link coming soon
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function RsvpForm() {
  const [status, setStatus] = useState(STATE.idle)
  const [errors, setErrors] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  /** Set true once we load a prior RSVP — flagged in the EmailJS payload so the
      couple knows this submission is an edit, not a new guest. */
  const [isUpdate, setIsUpdate] = useState(false)
  /** When the email field matches a previous reply, show a banner offering load. */
  const [foundPrior, setFoundPrior] = useState(null)

  // Watch the email field — debounced — and check localStorage for a prior reply
  useEffect(() => {
    const handle = setTimeout(() => {
      if (!emailValid(form.email)) { setFoundPrior(null); return }
      // If we've already loaded a prior reply for this same email, no need to
      // re-prompt (the form already contains the loaded data).
      if (isUpdate && form.email.trim().toLowerCase() === (foundPrior?.email || '').trim().toLowerCase()) return
      const prior = getStoredRsvp(form.email)
      setFoundPrior(prior ? { ...prior, email: form.email } : null)
    }, 350)
    return () => clearTimeout(handle)
  }, [form.email, isUpdate]) // eslint-disable-line react-hooks/exhaustive-deps

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const loadPrior = () => {
    if (!foundPrior) return
    setForm({
      name: foundPrior.name || '',
      email: foundPrior.email || form.email,
      attending: foundPrior.attending || '',
      kids: foundPrior.kids || '0',
      dietary: foundPrior.dietary || '',
      song: foundPrior.song || '',
      message: foundPrior.message || '',
    })
    setIsUpdate(true)
    setFoundPrior(null)
    setErrors({})
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!emailValid(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.attending) next.attending = 'Let us know if you can join us.'
    if (form.attending === 'yes') {
      const n = Number(form.kids)
      if (!Number.isInteger(n) || n < 0 || n > 2) next.kids = 'Pick between 0 and 2 kids.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus(STATE.sending)
    setErrorMsg('')

    const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey, recipientEmail } = config.rsvp || {}
    const hasEmailJS = emailjsServiceId && emailjsTemplateId && emailjsPublicKey

    const params = {
      user_name: form.name.trim(),
      user_email: form.email.trim(),
      reply_to: form.email.trim(),
      attending: form.attending === 'yes' ? 'YES — joining the celebration 🎉' : 'No — unable to attend 😢',
      kids: form.attending === 'yes' ? form.kids : '0',
      dietary: form.dietary.trim() || '—',
      song: form.song.trim() || '—',
      message: form.message.trim() || '—',
      is_update: isUpdate ? 'Yes — this replaces an earlier reply' : 'No — new RSVP',
      to_email: recipientEmail || '',
    }

    try {
      if (hasEmailJS) {
        await emailjs.send(emailjsServiceId, emailjsTemplateId, params, { publicKey: emailjsPublicKey })
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900))
      }
      // Save to localStorage so the guest can return and update on this device
      saveStoredRsvp(form.email, form)
      setStatus(STATE.success)
    } catch (err) {
      setStatus(STATE.error)
      setErrorMsg(err?.text || err?.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === STATE.success) {
    return (
      <SuccessState
        attending={form.attending}
        name={form.name.trim()}
        wasUpdate={isUpdate}
        onReset={() => { setStatus(STATE.idle); /* keep form contents so they can fine-tune */ }}
      />
    )
  }

  return (
    <div className="page rsvp-page">
      <section className="section section--beige">
        <div className="container rsvp-shell">
          <Reveal>
            <SectionHeader eyebrow="RSVP" title="Reply with love" subtitle={`Please let us know by ${config.wedding.rsvpDeadlineDisplay}.`} />
          </Reveal>

          <Reveal delay={0.05}>
            <RsvpDescription />
          </Reveal>

          <Reveal delay={0.1}>
            <form className="rsvp-card" onSubmit={onSubmit} noValidate>

              {isUpdate && (
                <div className="rsvp-banner rsvp-banner--info" role="status">
                  ✏️ Editing your previous RSVP — make any changes below and resubmit.
                </div>
              )}

              <div className="rsvp-row rsvp-row--two">
                <Field label="Full name" htmlFor="rsvp-name" error={errors.name} required>
                  <input
                    id="rsvp-name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={setField('name')}
                    placeholder="Your name as you'd like it on the seating chart"
                    aria-invalid={!!errors.name}
                    required
                  />
                </Field>

                <Field label="Email address" htmlFor="rsvp-email" error={errors.email} required hint="Use the same email if you've replied before">
                  <input
                    id="rsvp-email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={setField('email')}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    required
                  />
                </Field>
              </div>

              {foundPrior && !isUpdate && (
                <div className="rsvp-banner rsvp-banner--found" role="status">
                  <span aria-hidden="true">💛</span>
                  <div>
                    <strong>We found a previous reply from this email</strong>
                    <small>Submitted {formatPrior(foundPrior.submittedAt)} — load it and pick up where you left off.</small>
                  </div>
                  <button type="button" className="btn btn--ghost rsvp-banner__cta" onClick={loadPrior}>
                    Load my reply
                  </button>
                </div>
              )}

              <p className="rsvp-couples-note">
                <span aria-hidden="true">💡</span>
                <span>
                  <strong>Attending as a couple?</strong> Please have <em>each adult</em> submit their own RSVP — one form
                  per person. (Kids you bring along go in the "kids" field below.)
                </span>
              </p>

              <fieldset className={`rsvp-radio-group ${errors.attending ? 'has-error' : ''}`} aria-invalid={!!errors.attending}>
                <legend>Will you join us? <span className="rsvp-req">*</span></legend>
                <div className="rsvp-radios">
                  <label className={`rsvp-radio ${form.attending === 'yes' ? 'is-selected' : ''}`}>
                    <input type="radio" name="attending" value="yes" checked={form.attending === 'yes'} onChange={setField('attending')} />
                    <span className="rsvp-radio__icon">🎉</span>
                    <span className="rsvp-radio__text">
                      <strong>Yes, I'll be there</strong>
                      <small>Can't wait to celebrate</small>
                    </span>
                  </label>
                  <label className={`rsvp-radio ${form.attending === 'no' ? 'is-selected' : ''}`}>
                    <input type="radio" name="attending" value="no" checked={form.attending === 'no'} onChange={setField('attending')} />
                    <span className="rsvp-radio__icon">💛</span>
                    <span className="rsvp-radio__text">
                      <strong>Regretfully unable</strong>
                      <small>Sending love from afar</small>
                    </span>
                  </label>
                </div>
                {errors.attending && <p className="rsvp-error">{errors.attending}</p>}
              </fieldset>

              {form.attending === 'yes' && (
                <>
                  <Field label="Kids you're bringing" htmlFor="rsvp-kids" error={errors.kids} hint="Maximum 2 kids per adult">
                    <select
                      id="rsvp-kids"
                      value={form.kids}
                      onChange={setField('kids')}
                      aria-invalid={!!errors.kids}
                    >
                      <option value="0">No kids</option>
                      <option value="1">1 child</option>
                      <option value="2">2 children</option>
                    </select>
                  </Field>

                  <Field label="Dietary requirements or allergies" htmlFor="rsvp-dietary" hint="Optional — we'll let the kitchen know">
                    <textarea
                      id="rsvp-dietary"
                      rows="2"
                      value={form.dietary}
                      onChange={setField('dietary')}
                      placeholder="Vegetarian, gluten-free, nut allergy…"
                    />
                  </Field>

                  {/* <Field label="Song request" htmlFor="rsvp-song" hint="What will get you on the dance floor?">
                    <input
                      id="rsvp-song"
                      type="text"
                      value={form.song}
                      onChange={setField('song')}
                      placeholder="Artist — Song title"
                    />
                  </Field> */}
                </>
              )}

              <Field label={form.attending === 'no' ? 'A message for the couple' : 'A note for the couple'} htmlFor="rsvp-message" hint="Optional">
                <textarea
                  id="rsvp-message"
                  rows="4"
                  value={form.message}
                  onChange={setField('message')}
                  placeholder={form.attending === 'no' ? "We'll miss you — leave us a note if you'd like" : "Any well wishes, advice, or notes you'd like to share"}
                />
              </Field>

              {status === STATE.error && (
                <div className="rsvp-banner rsvp-banner--error" role="alert">
                  {errorMsg || "We couldn't send your RSVP. Please try again, or email us directly."}
                </div>
              )}

              <div className="rsvp-actions">
                <button type="submit" className="btn btn--primary rsvp-submit" disabled={status === STATE.sending}>
                  {status === STATE.sending ? 'Sending…' : isUpdate ? 'Update my RSVP →' : 'Send my RSVP →'}
                </button>
                <p className="rsvp-actions__deadline">
                  Deadline: <strong>{config.wedding.rsvpDeadlineDisplay}</strong>
                </p>
              </div>

              <p className="rsvp-edit-hint">
                <span aria-hidden="true">💛</span>
                <span>
                  <strong>Made a mistake or need to change something?</strong> Come back to this page anytime and resubmit your RSVP using the
                  same email.
                </span>
              </p>

            </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

/** Friendly relative-ish timestamp for the "found prior reply" banner. */
function formatPrior(iso) {
  if (!iso) return 'earlier'
  const d = new Date(iso)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  const days = Math.floor(diff / 86400)
  if (days < 30) return `${days}d ago`
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function Field({ label, htmlFor, error, hint, required, children }) {
  return (
    <div className={`rsvp-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={htmlFor}>
        {label}{required && <span className="rsvp-req"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="rsvp-hint">{hint}</p>}
      {error && <p className="rsvp-error">{error}</p>}
    </div>
  )
}

function SuccessState({ attending, name, wasUpdate, onReset }) {
  const isYes = attending === 'yes'
  return (
    <div className="page rsvp-page">
      <section className="section section--beige rsvp-success">
        <div className="container rsvp-shell">
          {isYes && (
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} className={`confetti__piece confetti__piece--${i % 4}`} style={{ left: `${(i / 18) * 100}%`, animationDelay: `${(i * 0.07).toFixed(2)}s` }} />
              ))}
            </div>
          )}
          <Reveal>
            <div className="rsvp-success__card">
              <span className="rsvp-success__icon" aria-hidden="true">{isYes ? '🎉' : '💛'}</span>
              <h1>{wasUpdate ? 'Updated! Thanks for letting us know.' : isYes ? 'Yay! We can\'t wait.' : 'Thank you for letting us know.'}</h1>
              <p className="rsvp-success__lead">
                {wasUpdate
                  ? `Thanks, ${name.split(' ')[0]}. We've got your latest reply on file.`
                  : isYes
                  ? `Thanks, ${name.split(' ')[0]}! Your RSVP is in. We'll be in touch with more details closer to the day.`
                  : `Thanks, ${name.split(' ')[0]}. We'll miss you in Đà Nẵng, but we appreciate you taking the time to reply. 💛`}
              </p>
              <div className="rsvp-success__actions">
                <Link to="/home" className="btn btn--primary">← Back to home</Link>
                <button type="button" className="btn btn--ghost" onClick={onReset}>Edit again</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

function DeadlinePassed() {
  return (
    <div className="page rsvp-page">
      <section className="section section--beige">
        <div className="container rsvp-shell">
          <Reveal>
            <SectionHeader eyebrow="RSVP" title="The RSVP window has closed" subtitle={`We needed to give the venue final numbers by ${config.wedding.rsvpDeadlineDisplay}.`} />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rsvp-card rsvp-card--closed">
              <p>
                If you still need to get in touch about attending, please reach out to {config.couple.displayName} directly — we'd love to hear from you.
              </p>
              <Link to="/home" className="btn btn--primary">← Back to home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
