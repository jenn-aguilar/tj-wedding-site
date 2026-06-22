import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function RSVP() {
  return (
    <ComingSoon
      eyebrow="RSVP"
      title="Reply with love"
      blurb={`Please RSVP by ${config.wedding.rsvpDeadlineDisplay}.`}
      summary={
        <p>
          The RSVP form is being prepared. We can't wait to celebrate with you in {config.venue.name.split(' ').slice(-2).join(' ')}!
        </p>
      }
    />
  )
}
