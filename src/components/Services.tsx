import { useLanguage } from '../i18n/LanguageContext'
import { ServiceIcon } from './Icons'

export function Services() {
  const { t } = useLanguage()
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <p className="eyebrow">{t.services.eyebrow}</p>
        <h2 id="services-title" className="h2">
          {t.services.title}
        </h2>
        <p className="lead narrow">{t.services.intro}</p>
        <ul className="cards cards-4">
          {t.services.items.map((item, i) => (
            <li key={item.title} className="card">
              <span className="card-icon">
                <ServiceIcon index={i} />
              </span>
              <h3 className="h3">{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
