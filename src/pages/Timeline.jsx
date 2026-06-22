import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function Timeline() {
  return (
    <ComingSoon
      eyebrow="The Big Day"
      title="Wedding day timeline"
      blurb="A full walkthrough of every moment on 28th March 2027."
      summary={
        <ul>
          {config.timeline.slice(0, 5).map((t) => (
            <li key={t.event}>{t.icon} {t.time} · {t.event}</li>
          ))}
        </ul>
      }
    />
  )
}
