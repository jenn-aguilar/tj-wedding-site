import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function GuestList() {
  return (
    <ComingSoon
      eyebrow="Guest List"
      title="Our cherished guests"
      blurb="The full guest list will be available here closer to the day — protected with a shared password."
      summary={
        <ul>
          {config.guestSections.map((s) => (
            <li key={s.id}>{s.icon} {s.label}</li>
          ))}
        </ul>
      }
    />
  )
}
