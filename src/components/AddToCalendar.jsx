import { useEffect, useRef, useState } from 'react'
import config from '../config.js'
import './AddToCalendar.css'

function pad(n) { return String(n).padStart(2, '0') }

/** Build the start/end Date objects in UTC from the config's local time + offset. */
function getEventTimes() {
  const { date, startHour = 16, startMinute = 0, durationHours = 6, utcOffsetHours = 0 } = config.wedding
  const sign = utcOffsetHours >= 0 ? '+' : '-'
  const off = `${sign}${pad(Math.abs(utcOffsetHours))}:00`
  const startLocal = `${date}T${pad(startHour)}:${pad(startMinute)}:00${off}`
  const start = new Date(startLocal)
  const end = new Date(start.getTime() + durationHours * 3600 * 1000)
  return { start, end }
}

/** Format a Date as the iCalendar/Google "YYYYMMDDTHHmmssZ" string. */
function toCalString(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function buildGoogleUrl({ title, details, location, start, end }) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toCalString(start)}/${toCalString(end)}`,
    details,
    location,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/** iCalendar (.ics) requires CRLF line breaks and certain field escaping. */
function escapeIcs(text = '') {
  return String(text).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function buildIcs({ title, details, location, start, end }) {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tam & Jenn//Wedding Website//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${Math.random().toString(36).slice(2, 8)}@tamandjenn`,
    `DTSTAMP:${toCalString(new Date())}`,
    `DTSTART:${toCalString(start)}`,
    `DTEND:${toCalString(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(details)}`,
    `LOCATION:${escapeIcs(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

function downloadIcs(content, filename) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function AddToCalendar({ variant = 'ghost' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const { start, end } = getEventTimes()
  const event = {
    title: config.calendar?.eventTitle || `${config.couple.displayName}'s Wedding`,
    details: config.calendar?.description || '',
    location: `${config.venue.name}, ${config.venue.address}`,
    start,
    end,
  }

  const handleGoogle = () => {
    window.open(buildGoogleUrl(event), '_blank', 'noopener,noreferrer')
    setOpen(false)
  }

  const handleApple = () => {
    downloadIcs(buildIcs(event), 'tam-jenn-wedding.ics')
    setOpen(false)
  }

  return (
    <div className="atc" ref={ref}>
      <button
        type="button"
        className={`btn btn--${variant} atc__trigger`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Add to Calendar
        <svg className="atc__caret" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1 L 6 6 L 11 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="atc__menu" role="menu">
          <button type="button" role="menuitem" className="atc__item" onClick={handleGoogle}>
            <svg className="atc__icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="1.4"/>
              <rect x="3" y="5" width="18" height="4" fill="#4285F4"/>
              <text x="12" y="18" textAnchor="middle" fontSize="9" fontFamily="Arial" fontWeight="700" fill="#4285F4">31</text>
            </svg>
            Google Calendar
          </button>
          <button type="button" role="menuitem" className="atc__item" onClick={handleApple}>
            <svg className="atc__icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" fill="#FFFFFF" stroke="#1E3A5F" strokeWidth="1.4"/>
              <rect x="3" y="5" width="18" height="4" fill="#1E3A5F"/>
              <text x="12" y="18" textAnchor="middle" fontSize="9" fontFamily="Arial" fontWeight="700" fill="#1E3A5F">28</text>
            </svg>
            Apple Calendar
            <span className="atc__hint">.ics</span>
          </button>
        </div>
      )}
    </div>
  )
}
