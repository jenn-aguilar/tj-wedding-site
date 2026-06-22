import { useEffect, useState } from 'react'

/**
 * Live countdown to a target ISO date string.
 * Returns { days, hours, minutes, seconds, isComplete }.
 */
export default function useCountdown(targetIso) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const target = new Date(targetIso).getTime()
  const diff = Math.max(0, target - now)

  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  return { days, hours, minutes, seconds, isComplete: diff === 0 }
}
