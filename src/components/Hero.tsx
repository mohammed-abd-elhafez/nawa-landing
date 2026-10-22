import { useLanguage } from '../i18n/LanguageContext'
import { ArrowIcon } from './Icons'

/** Decorative "connected routes" motif. Drawn in LTR coordinates and mirrored by CSS in RTL. */
function RoutesIllustration({ label }: { label: string }) {
  return (
    <svg className="routes dir-mirror" viewBox="0 0 400 360" role="img" aria-label={label}>
      <rect x="0" y="0" width="400" height="360" rx="28" fill="var(--ink-2)" />
      <g fill="none" stroke="var(--sand)" strokeWidth="2" strokeLinecap="round" opacity="0.9">
        <path d="M70 280C70 180 130 140 200 140S330 110 330 70" />
        <path className="route-b" d="M70 280C150 280 160 220 230 220S330 200 330 150" stroke="var(--accent)" />
        <path d="M200 140C200 200 140 220 130 300" opacity="0.5" strokeDasharray="4 8" />
      </g>
      <g>
        <circle cx="70" cy="280" r="14" fill="var(--accent)" />
        <circle cx="200" cy="140" r="10" fill="var(--sand)" />
        <circle cx="330" cy="70" r="14" fill="var(--sand)" />
        <circle cx="330" cy="150" r="8" fill="var(--accent)" />
        <circle cx="230" cy="220" r="6" fill="var(--sand)" opacity="0.7" />
      </g>
    </svg>
  )
}

export function Hero() {
  const { t } = useLanguage()
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="display">
            {t.hero.title}
          </h1>
          <p className="lead">{t.hero.body}</p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#contact">
              {t.hero.primary}
              <ArrowIcon />
            </a>
            <a className="btn btn-ghost" href="#services">
              {t.hero.secondary}
            </a>
          </div>
        </div>
        <div className="hero-art">
          <RoutesIllustration label={t.hero.illustration} />
        </div>
      </div>
    </section>
  )
}
