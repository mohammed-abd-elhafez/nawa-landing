import { useLanguage } from '../i18n/LanguageContext'

export function Testimonial() {
  const { t } = useLanguage()
  return (
    <section className="section section-sand" aria-labelledby="testimonial-title">
      <div className="container narrow-wide">
        <h2 id="testimonial-title" className="eyebrow">
          {t.testimonial.eyebrow}
        </h2>
        <figure className="quote">
          <blockquote>
            <p>{t.testimonial.quote}</p>
          </blockquote>
          <figcaption>
            <strong>{t.testimonial.name}</strong>
            <span>{t.testimonial.role}</span>
          </figcaption>
        </figure>
        <p className="disclaimer-note" role="note">
          {t.testimonial.disclaimer}
        </p>
      </div>
    </section>
  )
}
