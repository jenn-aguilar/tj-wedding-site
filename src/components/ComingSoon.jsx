import { Link } from 'react-router-dom'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import './ComingSoon.css'

export default function ComingSoon({ eyebrow, title, blurb, summary }) {
  return (
    <div className="page coming-soon">
      <section className="section section--beige">
        <div className="container">
          <Reveal>
            <SectionHeader eyebrow={eyebrow} title={title} subtitle={blurb} />
          </Reveal>
          {summary && (
            <Reveal delay={0.1}>
              <div className="coming-soon__summary">{summary}</div>
            </Reveal>
          )}
          <Reveal delay={0.2}>
            <div className="coming-soon__panel">
              <p className="coming-soon__pill">Coming soon</p>
              <p>This page is being prepared with love. Please check back closer to the day.</p>
              <Link to="/home" className="btn btn--ghost">← Back to home</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
