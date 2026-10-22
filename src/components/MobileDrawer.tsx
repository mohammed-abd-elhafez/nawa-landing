import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { CloseIcon } from './Icons'
import { LanguageSwitcher } from './LanguageSwitcher'

interface Props {
  open: boolean
  onClose: () => void
  /** Element that opened the drawer; receives focus again on close. */
  returnFocusTo: React.RefObject<HTMLElement>
}

/**
 * Native modal <dialog>: gives focus trapping, Escape handling and an inert background.
 * The dialog's own `close` event is the single place where state is reset and focus is returned.
 */
export function MobileDrawer({ open, onClose, returnFocusTo }: Props) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDialogElement>(null)
  /** Section to focus after closing via a nav link, instead of returning to the menu button. */
  const focusTarget = useRef<string | null>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    }
  }, [open])

  const requestClose = (targetId?: string) => {
    focusTarget.current = targetId ?? null
    ref.current?.close()
  }

  const handleClosed = () => {
    onClose()
    const id = focusTarget.current
    focusTarget.current = null
    const section = id ? document.getElementById(id) : null
    if (section) {
      section.setAttribute('tabindex', '-1')
      section.focus({ preventScroll: true })
    } else {
      returnFocusTo.current?.focus()
    }
  }

  return (
    <dialog
      ref={ref}
      id="mobile-drawer"
      className="drawer"
      aria-labelledby="drawer-title"
      onClose={handleClosed}
      onClick={(e) => {
        // A click on the dialog element itself (not its panel) is a backdrop click.
        if (e.target === ref.current) requestClose()
      }}
    >
      <div className="drawer-panel">
        <div className="drawer-head">
          <h2 id="drawer-title" className="drawer-title">
            {t.nav.drawerTitle}
          </h2>
          <button type="button" className="icon-btn" onClick={() => requestClose()} aria-label={t.nav.closeMenu}>
            <CloseIcon />
          </button>
        </div>
        <nav aria-label={t.nav.label}>
          <ul className="drawer-links">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={() => requestClose(item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <LanguageSwitcher idPrefix="drawer-lang" />
        <a className="btn btn-primary" href="#contact" onClick={() => requestClose('contact')}>
          {t.cta}
        </a>
      </div>
    </dialog>
  )
}
