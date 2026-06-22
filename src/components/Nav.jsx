import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import config from '../config.js'
import './Nav.css'

const links = [
  { to: '/home', label: 'Home' },
  { to: '/venue', label: 'Venue' },
  { to: '/travel', label: 'Travel' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/dress-code', label: 'Dress Code' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/guest-list', label: 'Guest List' },
  { to: '/rsvp', label: 'RSVP' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Primary">
        <div className="nav__inner container">
          <Link to="/home" className="nav__brand" aria-label={`${config.couple.displayName} home`}>
            <span className="nav__monogram">T<span className="nav__amp">&amp;</span>J</span>
          </Link>

          <ul className="nav__links" role="list">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                  end
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            className={`nav__burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Overlay must live OUTSIDE <nav> — the nav has backdrop-filter which
          would otherwise become the overlay's containing block and collapse
          its height to 0. As a sibling, it positions against the viewport. */}
      <div className={`nav__overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <ul className="nav__overlay-links" role="list">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => `nav__overlay-link ${isActive ? 'is-active' : ''}`}
                end
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <p className="nav__overlay-foot">{config.couple.hashtag}</p>
      </div>
    </>
  )
}
