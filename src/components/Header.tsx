import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { MenuIcon } from './Icons'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileDrawer'

export function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a id="site-logo" className="logo-link" href="#top">
          <Logo />
        </a>
        <nav className="nav-desktop" aria-label={t.nav.label}>
          <ul>
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <div className="header-lang">
            <LanguageSwitcher idPrefix="header-lang" />
          </div>
          <a className="btn btn-primary btn-sm header-cta" href="#contact">
            {t.cta}
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="icon-btn menu-btn"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={t.nav.openMenu}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} returnFocusTo={menuBtn} />
    </header>
  )
}
