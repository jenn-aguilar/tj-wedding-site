import config from '../config.js'
import ComingSoon from '../components/ComingSoon.jsx'

export default function Gallery() {
  return (
    <ComingSoon
      eyebrow="Pre-Wedding"
      title="Our story in pictures"
      blurb={config.ourStory.text}
      summary={<p>Photos coming soon — stay tuned! 📸</p>}
    />
  )
}
