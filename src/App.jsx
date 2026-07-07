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
import Registry from './pages/Registry.jsx'
import config from './config.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/** Set a <meta> tag's content by name or property attribute, if it exists. */
function setMeta(selector, content) {
  const el = document.querySelector(selector)
  if (el && content) el.setAttribute('content', content)
}

function DocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = config.seo.title
    setMeta('meta[name="description"]', config.seo.description)
    // Social share crawlers (Messenger, Instagram, etc.) read index.html directly
    // and never run this — it only keeps the live DOM consistent with config.seo.
    setMeta('meta[property="og:title"]', config.seo.title)
    setMeta('meta[property="og:description"]', config.seo.description)
    setMeta('meta[property="og:image"]', config.seo.ogImage)
    setMeta('meta[name="twitter:title"]', config.seo.title)
    setMeta('meta[name="twitter:description"]', config.seo.description)
    setMeta('meta[name="twitter:image"]', config.seo.ogImage)
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
        <Route path="/registry" element={<Registry />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {showBackToTop && <BackToTop />}
      {!isLanding && <Footer />}
    </>
  )
}
