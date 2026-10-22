import { useLanguage } from '../i18n/LanguageContext'
import { LANGS, type Lang } from '../i18n'

/** Two toggle buttons in a labelled group. The pressed state shows the current language. */
export function LanguageSwitcher({ idPrefix = 'lang' }: { idPrefix?: string }) {
  const { lang, setLang, t } = useLanguage()
  const labels: Record<Lang, { short: string; name: string }> = {
    en: { short: t.lang.en, name: t.lang.enName },
    ar: { short: t.lang.ar, name: t.lang.arName },
  }
  return (
    <div className="lang-switch" role="group" aria-label={t.lang.groupLabel}>
      {LANGS.map((code) => (
        <button
          key={code}
          id={`${idPrefix}-${code}`}
          type="button"
          lang={code}
          className="lang-btn"
          aria-pressed={lang === code}
          aria-label={labels[code].name}
          onClick={() => setLang(code)}
        >
          <span aria-hidden="true">{labels[code].short}</span>
        </button>
      ))}
    </div>
  )
}
