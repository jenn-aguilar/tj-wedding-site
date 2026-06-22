import './SectionHeader.css'

/**
 * Standard section header pair: script eyebrow + serif title + optional subtitle.
 */
export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', tone = 'dark' }) {
  return (
    <header className={`section-header section-header--${align} section-header--${tone}`}>
      {eyebrow && <span className="section-header__eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-header__title">{title}</h2>}
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
    </header>
  )
}
