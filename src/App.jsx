import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import useTheme from './hooks/useTheme.js'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
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

export default function App() {
  useTheme()
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

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
        <Route path="/guest-list" element={<GuestList />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/dress-code" element={<DressCode />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {!isLanding && <Footer />}
    </>
  )
}
