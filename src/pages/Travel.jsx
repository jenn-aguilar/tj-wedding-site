import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function Travel() {
  return (
    <ComingSoon
      eyebrow="Travel & Stay"
      title="Getting to Da Nang"
      blurb="Flights, accommodation, and tips for international guests."
      summary={
        <>
          <p>Fly into <strong>{config.travel.nearestAirport}</strong> — {config.travel.airportDistance}.</p>
          <p>Stay at <strong>{config.accommodation.hotelName}</strong> from {config.accommodation.checkInDisplay} to {config.accommodation.checkOutDisplay}.</p>
        </>
      }
    />
  )
}
