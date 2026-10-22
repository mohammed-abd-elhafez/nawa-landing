import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { validateContact, type ContactErrors, type ContactValues } from '../lib/validate'
import { AlertIcon, CheckIcon } from './Icons'

const EMPTY: ContactValues = { name: '', email: '', topic: '', message: '' }
const FIELD_ORDER: (keyof ContactValues)[] = ['name', 'email', 'topic', 'message']

export function ContactForm() {
  const { t } = useLanguage()
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (Object.keys(errors).length > 0) summaryRef.current?.focus()
  }, [errors])

  const update = (key: keyof ContactValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      return
    }
    setSubmitted(true)
    requestAnimationFrame(() => successRef.current?.focus())
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(false)
    requestAnimationFrame(() => document.getElementById('field-name')?.focus())
  }

  const errorText = (key: keyof ContactValues) => (errors[key] ? t.contact.errors[errors[key]!] : '')
  const errorKeys = FIELD_ORDER.filter((k) => errors[k])

  const field = (key: keyof ContactValues) => ({
    id: `field-${key}`,
    name: key,
    value: values[key],
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `error-${key}` : undefined,
    'aria-required': true,
    onChange: (e: { target: { value: string } }) => update(key, e.target.value),
  })

  const fieldError = (key: keyof ContactValues) =>
    errors[key] ? (
      <p className="field-error" id={`error-${key}`}>
        <AlertIcon />
        <span>{errorText(key)}</span>
      </p>
    ) : null

  return (
    <section id="contact" className="section section-sand" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title" className="h2">
            {t.contact.title}
          </h2>
          <p className="lead">{t.contact.body}</p>
          <p className="demo-pill" id="demo-pill">{t.contact.demoNote}</p>
        </div>

        {submitted ? (
          <div className="form-card success" ref={successRef} tabIndex={-1} aria-labelledby="success-title">
            <CheckIcon />
            <h3 className="h3" id="success-title">{t.contact.successTitle}</h3>
            <p>{t.contact.successBody}</p>
            <button type="button" className="btn btn-ghost" onClick={reset}>
              {t.contact.reset}
            </button>
          </div>
        ) : (
          <form className="form-card" onSubmit={onSubmit} noValidate aria-labelledby="contact-title" aria-describedby="demo-pill">
            {errorKeys.length > 0 && (
              <div className="error-summary" ref={summaryRef} tabIndex={-1}>
                <p>{t.contact.errorSummary}</p>
                <ul>
                  {errorKeys.map((k) => (
                    <li key={k}>
                      <a
                        href={`#field-${k}`}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(`field-${k}`)?.focus()
                        }}
                      >
                        {t.contact.fields[k]}: {errorText(k)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="field">
              <label htmlFor="field-name">{t.contact.fields.name}</label>
              <input type="text" autoComplete="name" maxLength={100} {...field('name')} />
              {fieldError('name')}
            </div>

            <div className="field">
              <label htmlFor="field-email">{t.contact.fields.email}</label>
              <input type="email" autoComplete="email" inputMode="email" spellCheck={false} dir="ltr" maxLength={254} className="ltr-input" {...field('email')} />
              {fieldError('email')}
            </div>

            <div className="field">
              <label htmlFor="field-topic">{t.contact.fields.topic}</label>
              <select {...field('topic')}>
                <option value="">{t.contact.topicPlaceholder}</option>
                {t.contact.topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.label}
                  </option>
                ))}
              </select>
              {fieldError('topic')}
            </div>

            <div className="field">
              <label htmlFor="field-message">{t.contact.fields.message}</label>
              <textarea rows={5} maxLength={2000} {...field('message')} />
              {fieldError('message')}
            </div>

            <button type="submit" className="btn btn-primary">
              {t.contact.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
