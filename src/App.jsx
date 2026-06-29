import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import useTheme from './hooks/useTheme.js'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import BackToTop from './components/BackToTop.jsx'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Travel from './pages/Travel.jsx'
import GuestList from './pages/GuestList.jsx'
import Timeline from './pages/Timeline.jsx'
import RSVP from './pages/RSVP.jsx'
import DressCode from './pages/DressCode.jsx'
import Reminders from './pages/Reminders.jsx'
import Gallery from './pages/Gallery.jsx'
import Venue from './pages/Venue.jsx'
import config from './config.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function DocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = config.seo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', config.seo.description)
  }, [pathname])
  return null
}

/** Pages where the "Back to top" arrow should NOT render (per user spec) */
const HIDE_BACK_TO_TOP = new Set(['/', '/entourage', '/rsvp', '/guest-list'])

export default function App() {
  useTheme()
  const { pathname } = useLocation()
  const isLanding = pathname === '/'
  const showBackToTop = !isLanding && !HIDE_BACK_TO_TOP.has(pathname)

  return (
    <>
      <ScrollToTop />
      <DocumentTitle />
      {!isLanding && <Nav />}
      {!isLanding && <ScrollProgress />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/entourage" element={<GuestList />} />
        {/* Legacy redirect — old bookmarks to /guest-list still land in the right place */}
        <Route path="/guest-list" element={<Navigate to="/entourage" replace />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/dress-code" element={<DressCode />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {showBackToTop && <BackToTop />}
      {!isLanding && <Footer />}
    </>
  )
}
