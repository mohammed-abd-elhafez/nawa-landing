import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { ChevronIcon } from './Icons'

/** Disclosure pattern: each button controls its own panel. Multiple panels may be open. */
export function Faq() {
  const { t } = useLanguage()
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set())

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container narrow-wide">
        <p className="eyebrow">{t.faq.eyebrow}</p>
        <h2 id="faq-title" className="h2">
          {t.faq.title}
        </h2>
        <div className="faq">
          {t.faq.items.map((item, i) => {
            const isOpen = open.has(i)
            return (
              <div key={item.q} className="faq-item">
                <h3 className="faq-q">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.q}</span>
                    <ChevronIcon />
                  </button>
                </h3>
                <div id={`faq-panel-${i}`} className="faq-panel" hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
