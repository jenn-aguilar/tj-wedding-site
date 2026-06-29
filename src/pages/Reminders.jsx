import React from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import PageGate from '../components/PageGate.jsx'
import './Reminders.css'

export default function Reminders() {
  const reminders = config.reminders || []
  return (
    <PageGate show={config.pages?.reminders !== false} eyebrow="Good to Know" title="A few gentle reminders">
    <div className="page reminders-page">
      <section className="section section--beige">
        <div className="container reminders-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Good to Know"
              title="A few gentle reminders"
              subtitle="The little things that'll make the day smoother for everyone."
            />
          </Reveal>

          <ul className="reminders-grid" role="list">
            {reminders.map((r, i) => (
              <Reveal as="li" key={r.title} delay={Math.min(i * 0.05, 0.3)}>
                <article className="reminder-card">
                  <span className="reminder-card__icon" aria-hidden="true">{r.icon}</span>
                  <h2 className="reminder-card__title">{r.title}</h2>
                  <p className="reminder-card__body">{r.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>

          {reminders.length === 0 && (
            <Reveal>
              <p className="reminders-empty">More reminders coming soon — check back later. 💛</p>
            </Reveal>
          )}
        </div>
      </section>
    </div>
    </PageGate>
  )
}
