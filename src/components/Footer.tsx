import { useLanguage } from '../i18n/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>{t.footer.tagline}</p>
        </div>

        <nav aria-labelledby="footer-nav-title">
          <h2 id="footer-nav-title" className="footer-title">
            {t.footer.navTitle}
          </h2>
          <ul>
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer-title">{t.footer.contactTitle}</h2>
          <ul>
            <li>
              <span dir="ltr" className="ltr-inline">
                {t.footer.email}
              </span>
            </li>
            <li>{t.footer.location}</li>
          </ul>
          <h2 className="footer-title spaced">{t.footer.socialTitle}</h2>
          <ul>
            {t.footer.social.map((s) => (
              <li key={s.label}>
                {s.label} <span className="muted">({s.note})</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-title">{t.footer.langTitle}</h2>
          <LanguageSwitcher idPrefix="footer-lang" />
        </div>
      </div>
      <div className="container footer-base">
        <p id="disclaimer" tabIndex={-1}>
          {t.footer.disclaimer}
        </p>
        <p>{t.footer.rights}</p>
      </div>
    </footer>
  )
}
