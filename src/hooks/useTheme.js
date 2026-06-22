import { useEffect } from 'react'
import config from '../config.js'

/**
 * Applies config.theme to the document:
 *   1. Sets CSS variables for every color (--color-beige, --color-sage, …)
 *   2. Injects a Google Fonts <link> based on config.theme.fonts, then sets
 *      --font-display, --font-body, --font-script CSS variables
 *
 * Runs once on mount. Safe to call from the app root.
 */
export default function useTheme() {
  useEffect(() => {
    const root = document.documentElement
    const { colors, fonts } = config.theme

    // ─── Colors ─────────────────────────────────────────
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // ─── Fonts ──────────────────────────────────────────
    // Build a single Google Fonts URL from all three families
    const familyParams = Object.values(fonts)
      .filter((f) => f && f.name)
      .map((f) => {
        const family = f.name.trim().replace(/\s+/g, '+')
        const weights = f.weights ? `:wght@${f.weights}` : ''
        return `family=${family}${weights}`
      })
      .join('&')

    if (familyParams) {
      const href = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`

      let link = document.getElementById('runtime-google-fonts')
      if (!link) {
        link = document.createElement('link')
        link.id = 'runtime-google-fonts'
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      }
      if (link.href !== href) link.href = href
    }

    // Set font-family CSS variables. Wrap font name in quotes for safety.
    const fontVar = (key, fallbacks) => {
      const f = fonts[key]
      if (!f || !f.name) return
      root.style.setProperty(`--font-${key}`, `'${f.name}', ${fallbacks}`)
    }
    fontVar('display', `'Georgia', serif`)
    fontVar('body',    `'Helvetica Neue', system-ui, sans-serif`)
    fontVar('script',  `'Brush Script MT', cursive`)
  }, [])
}
