import { Link } from 'react-router-dom'
import config from '../config.js'
import './Footer.css'

const quickLinks = [
  { to: '/home', label: 'Home' },
  { to: '/venue', label: 'Venue' },
  { to: '/travel', label: 'Travel' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/dress-code', label: 'Dress Code' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/entourage', label: 'Entourage' },
  { to: '/registry', label: 'Registry' },
  { to: '/rsvp', label: 'RSVP' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__script">{config.couple.displayName}</span>
            <span className="footer__date">{config.wedding.displayDay} · {config.wedding.displayDate}</span>
            <span className="footer__venue">{config.venue.name}</span>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            <ul>
              {quickLinks.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="footer__hashtag">{config.couple.hashtag}</p>
        <p className="footer__love">With love, {config.couple.displayName} 💛</p>
        <p className="footer__legal">© {year} · A private celebration</p>
      </div>
    </footer>
  )
}
