import React from 'react'
import config from '../config.js'
import Reveal from '../components/Reveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import PageGate from '../components/PageGate.jsx'
import './Timeline.css'

export default function Timeline() {
  const timeline = config.timeline || []
  const preEvents = config.preWeddingEvents || []

  return (
    <PageGate show={config.pages?.timeline !== false} eyebrow="The Big Day" title="Wedding day timeline">
    <div className="page timeline-page">
      {/* ─── HERO ─── */}
      <section className="section section--beige">
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="The Big Day"
              title="Wedding day timeline"
              subtitle={`A full walkthrough of every moment on ${config.wedding.displayDate}.`}
            />
          </Reveal>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section className="section section--beige timeline-section">
        <div className="container">
          <ol className="timeline" role="list">
            {timeline.map((item, i) => (
              <TimelineItem
                key={`${item.time}-${item.event}-${i}`}
                item={item}
                index={i}
                isLast={i === timeline.length - 1}
              />
            ))}
          </ol>
        </div>
      </section>

      {/* ─── PRE-WEDDING EVENTS ─── */}
      {preEvents.length > 0 && (
        <section className="section section--sage">
          <div className="container">
            <Reveal>
              <div className="timeline-pre-head">
                <span className="timeline-eyebrow">Before the Big Day</span>
                <h2>Pre-wedding events</h2>
                <p className="timeline-pre-head__sub">A few moments leading up to the celebration.</p>
              </div>
            </Reveal>
            <ul className="timeline-pre-list" role="list">
              {preEvents.map((event, i) => (
                <Reveal as="li" key={event.name} delay={Math.min(i * 0.05, 0.2)}>
                  <article className="timeline-pre-card">
                    <div className="timeline-pre-card__head">
                      <h3>{event.name}</h3>
                      <span className="timeline-pre-card__tag">Invite-only</span>
                    </div>
                    <dl className="timeline-pre-card__meta">
                      {event.date && <><dt>Date</dt><dd>{event.date}</dd></>}
                      {event.time && <><dt>Time</dt><dd>{event.time}</dd></>}
                      {event.location && <><dt>Location</dt><dd>{event.location}</dd></>}
                    </dl>
                    {event.invitedGroups?.length > 0 && (
                      <div className="timeline-pre-card__groups">
                        <span className="timeline-pre-card__groups-label">Invited:</span>
                        {event.invitedGroups.map((g) => (
                          <span key={g} className="timeline-pre-card__group">{g}</span>
                        ))}
                      </div>
                    )}
                    {event.notes && <p className="timeline-pre-card__notes">{event.notes}</p>}
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
    </PageGate>
  )
}

function TimelineItem({ item, index, isLast }) {
  const side = index % 2 === 0 ? 'left' : 'right'
  return (
    <Reveal as="li" delay={Math.min(index * 0.04, 0.25)}>
      <div className={`timeline-item timeline-item--${side} ${item.featured ? 'is-featured' : ''} ${isLast ? 'is-last' : ''}`}>
        <div className="timeline-item__rail" aria-hidden="true">
          <span className="timeline-item__dot" />
          {!isLast && <span className="timeline-item__line" />}
        </div>
        <article className="timeline-item__card">
          <header className="timeline-item__head">
            <span className="timeline-item__icon" aria-hidden="true">{item.icon}</span>
            <span className="timeline-item__time">{item.time}</span>
            {item.featured && <span className="timeline-item__badge">Ceremony</span>}
          </header>
          <h3 className="timeline-item__title">{item.event}</h3>
          {item.description && <p className="timeline-item__desc">{item.description}</p>}
        </article>
      </div>
    </Reveal>
  )
}
