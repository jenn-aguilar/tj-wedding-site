import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function Venue() {
  return (
    <ComingSoon
      eyebrow="The Venue"
      title={config.venue.name}
      blurb={config.venue.description}
      summary={
        <ul>
          {config.venue.amenities.map((a) => <li key={a.label}>{a.icon} {a.label}</li>)}
        </ul>
      }
    />
  )
}
