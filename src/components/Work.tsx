import { useLanguage } from '../i18n/LanguageContext'

export function Work() {
  const { t } = useLanguage()
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <p className="eyebrow">{t.work.eyebrow}</p>
        <h2 id="work-title" className="h2">
          {t.work.title}
        </h2>
        <p className="lead narrow">{t.work.intro}</p>
        <ul className="cards cards-3">
          {t.work.items.map((item, i) => (
            <li key={item.title} className="card work-card">
              <div className={`work-thumb thumb-${i}`} aria-hidden="true" />
              <p className="badge">{t.work.badge}</p>
              <p className="tag">{item.tag}</p>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
              <p className="outcome">{item.outcome}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
