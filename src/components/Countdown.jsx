import useCountdown from '../hooks/useCountdown.js'
import './Countdown.css'

export default function Countdown({ targetIso, tone = 'dark' }) {
  const { days, hours, minutes, seconds, isComplete } = useCountdown(targetIso)

  if (isComplete) {
    return (
      <div className={`countdown countdown--${tone} countdown--complete`}>
        <p>Today is the day! 💍</p>
      </div>
    )
  }

  const items = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <ul className={`countdown countdown--${tone}`} aria-label="Countdown to the wedding">
      {items.map((item) => (
        <li key={item.label} className="countdown__cell">
          <span className="countdown__value">{String(item.value).padStart(2, '0')}</span>
          <span className="countdown__label">{item.label}</span>
        </li>
      ))}
    </ul>
  )
}
