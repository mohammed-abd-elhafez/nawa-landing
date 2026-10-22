import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { CloseIcon } from './Icons'

const KEY = 'nawa-announcement-dismissed'

function wasDismissed(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function AnnouncementBar() {
  const { t } = useLanguage()
  const [hidden, setHidden] = useState(wasDismissed)

  if (hidden) return null

  const dismiss = () => {
    setHidden(true)
    try {
      window.sessionStorage.setItem(KEY, '1')
    } catch {
      // ignore
    }
    // The button disappears, so hand focus to the logo link to avoid losing it.
    requestAnimationFrame(() => document.getElementById('site-logo')?.focus())
  }

  return (
    <div className="announcement" role="region" aria-label={t.announcement.label}>
      <div className="container announcement-inner">
        <p>
          {t.announcement.text} <a href="#disclaimer">{t.announcement.cta}</a>
        </p>
        <button type="button" className="icon-btn" onClick={dismiss} aria-label={t.announcement.dismiss}>
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}
