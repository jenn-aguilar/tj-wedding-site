import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import './RSVP.css'

const STATE = { idle: 'idle', sending: 'sending', success: 'success', error: 'error' }

function emailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export default function RSVP() {
  const deadlinePast = useMemo(() => {
    const d = new Date(config.wedding.rsvpDeadline)
    // Give until end of day in the wedding's timezone
    d.setHours(23, 59, 59, 999)
    return Date.now() > d.getTime()
  }, [])

  if (deadlinePast) return <DeadlinePassed />

  return <RsvpForm />
}

function RsvpForm() {
  const [status, setStatus] = useState(STATE.idle)
  const [errors, setErrors] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '1',
    dietary: '',
    song: '',
    message: '',
  })

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.'
    if (!emailValid(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.attending) next.attending = 'Let us know if you can join us.'
    if (form.attending === 'yes') {
      const n = Number(form.guests)
      if (!Number.isInteger(n) || n < 1 || n > 2) next.guests = 'Pick 1 or 2 guests.'
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
      guests: form.attending === 'yes' ? form.guests : '0',
      dietary: form.dietary.trim() || '—',
      song: form.song.trim() || '—',
      message: form.message.trim() || '—',
      to_email: recipientEmail || '',
    }

    try {
      if (hasEmailJS) {
        await emailjs.send(emailjsServiceId, emailjsTemplateId, params, { publicKey: emailjsPublicKey })
      } else {
        // Demo mode: simulate a network round-trip so the form is testable
        // before EmailJS credentials are added to config.rsvp.
        await new Promise((resolve) => setTimeout(resolve, 900))
      }
      setStatus(STATE.success)
    } catch (err) {
      setStatus(STATE.error)
      setErrorMsg(err?.text || err?.message || 'Something went wrong. Please try again.')
    }
  }

  if (status === STATE.success) {
    return <SuccessState attending={form.attending} name={form.name.trim()} onReset={() => { setStatus(STATE.idle); setForm((f) => ({ ...f, attending: '', guests: '1', dietary: '', song: '', message: '' })) }} />
  }

  return (
    <div className="page rsvp-page">
      <section className="section section--beige">
        <div className="container rsvp-shell">
          <Reveal>
            <SectionHeader eyebrow="RSVP" title="Reply with love" subtitle={`Please let us know by ${config.wedding.rsvpDeadlineDisplay}.`} />
          </Reveal>

          <Reveal delay={0.1}>
            <form className="rsvp-card" onSubmit={onSubmit} noValidate>
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

                <Field label="Email address" htmlFor="rsvp-email" error={errors.email} required>
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
                  <Field label="Number of guests (including you)" htmlFor="rsvp-guests" error={errors.guests} hint="1 or 2 — let us know if you're bringing a plus-one">
                    <input
                      id="rsvp-guests"
                      type="number"
                      min="1"
                      max="2"
                      step="1"
                      value={form.guests}
                      onChange={setField('guests')}
                      aria-invalid={!!errors.guests}
                    />
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

                  <Field label="Song request" htmlFor="rsvp-song" hint="What will get you on the dance floor?">
                    <input
                      id="rsvp-song"
                      type="text"
                      value={form.song}
                      onChange={setField('song')}
                      placeholder="Artist — Song title"
                    />
                  </Field>
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
                  {status === STATE.sending ? 'Sending…' : 'Send my RSVP →'}
                </button>
                <p className="rsvp-actions__deadline">
                  Deadline: <strong>{config.wedding.rsvpDeadlineDisplay}</strong>
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  )
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

function SuccessState({ attending, name, onReset }) {
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
              <h1>{isYes ? 'Yay! We can\'t wait.' : 'Thank you for letting us know.'}</h1>
              <p className="rsvp-success__lead">
                {isYes
                  ? `Thanks, ${name.split(' ')[0]}! Your RSVP is in. We'll be in touch with more details closer to the day.`
                  : `Thanks, ${name.split(' ')[0]}. We'll miss you in Đà Nẵng, but we appreciate you taking the time to reply. 💛`}
              </p>
              <div className="rsvp-success__actions">
                <Link to="/home" className="btn btn--primary">← Back to home</Link>
                <button type="button" className="btn btn--ghost" onClick={onReset}>Update my RSVP</button>
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
