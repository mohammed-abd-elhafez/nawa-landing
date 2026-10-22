import { useLanguage } from '../i18n/LanguageContext'

export function Strip() {
  const { t } = useLanguage()
  return (
    <section className="strip" aria-label={t.strip.label}>
      <div className="container">
        <ul className="strip-list">
          {t.strip.items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
