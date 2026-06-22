import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function Reminders() {
  return (
    <ComingSoon
      eyebrow="Good to Know"
      title="Gentle reminders"
      blurb="Helpful things to remember before, during, and after the day."
      summary={
        <ul>
          {config.reminders.map((r) => <li key={r.title}>{r.icon} {r.title}</li>)}
        </ul>
      }
    />
  )
}
