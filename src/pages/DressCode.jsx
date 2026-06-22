import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function DressCode() {
  return (
    <ComingSoon
      eyebrow="Dress Code"
      title={config.dressCode.label}
      blurb={config.dressCode.subtitle}
      summary={
        <ul>
          {config.dressCode.paletteNames.map((n) => <li key={n}>{n}</li>)}
        </ul>
      }
    />
  )
}
