import { useLanguage } from '../i18n/LanguageContext'

export function Process() {
  const { t } = useLanguage()
  return (
    <section id="process" className="section section-ink" aria-labelledby="process-title">
      <div className="container">
        <p className="eyebrow">{t.process.eyebrow}</p>
        <h2 id="process-title" className="h2">
          {t.process.title}
        </h2>
        <ol className="steps">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-num" aria-hidden="true" dir="ltr">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="h3">
                <span className="visually-hidden">
                  {t.process.stepLabel} {i + 1}:{' '}
                </span>
                {step.title}
              </h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
