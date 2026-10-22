import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, dirFor, isLang, type Dictionary, type Lang } from './index'

const STORAGE_KEY = 'nawa-lang'

interface LanguageValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Dictionary
  setLang: (lang: Lang) => void
}

const LanguageContext = createContext<LanguageValue | null>(null)

function readStoredLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromUrl)) return fromUrl
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    // storage unavailable: fall back to the default
  }
  return 'en'
}

function setMeta(selector: string, attr: string, value: string, create?: () => HTMLElement) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el && create) {
    el = create()
    document.head.appendChild(el)
  }
  el?.setAttribute(attr, value)
}

function meta(key: 'name' | 'property', name: string, content: string) {
  setMeta(`meta[${key}="${name}"]`, 'content', content, () => {
    const el = document.createElement('meta')
    el.setAttribute(key, name)
    return el
  })
}

/** Applies lang, dir, title and SEO tags for the active language. */
function syncDocument(lang: Lang, t: Dictionary) {
  const root = document.documentElement
  root.lang = lang
  root.dir = dirFor(lang)
  document.title = t.meta.title
  meta('name', 'description', t.meta.description)
  meta('property', 'og:title', t.meta.title)
  meta('property', 'og:description', t.meta.description)
  meta('property', 'og:type', 'website')
  meta('property', 'og:locale', t.meta.ogLocale)
  meta('property', 'og:locale:alternate', t.meta.ogAltLocale)

  const base = `${window.location.origin}${window.location.pathname}`
  const canonical = `${base}${lang === 'ar' ? '?lang=ar' : ''}`
  setMeta('link[rel="canonical"]', 'href', canonical, () => {
    const el = document.createElement('link')
    el.rel = 'canonical'
    return el
  })
  meta('property', 'og:url', canonical)

  const alternates: [string, string][] = [
    ['en', base],
    ['ar', `${base}?lang=ar`],
    ['x-default', base],
  ]
  for (const [hreflang, href] of alternates) {
    setMeta(`link[rel="alternate"][hreflang="${hreflang}"]`, 'href', href, () => {
      const el = document.createElement('link')
      el.rel = 'alternate'
      el.setAttribute('hreflang', hreflang)
      return el
    })
  }

  const image = new URL('og-image.png', document.baseURI).href
  meta('property', 'og:image', image)
  meta('property', 'og:image:alt', t.hero.illustration)
  meta('name', 'twitter:card', 'summary_large_image')
}

export function LanguageProvider({ children, initial }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLangState] = useState<Lang>(() => initial ?? readStoredLang())

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore: preference simply will not persist
    }
    // Keep the address bar in step with the canonical URL so a reload honours the new choice.
    try {
      const url = new URL(window.location.href)
      if (next === 'ar') url.searchParams.set('lang', 'ar')
      else url.searchParams.delete('lang')
      window.history.replaceState(null, '', url)
    } catch {
      // ignore: history API unavailable
    }
  }, [])

  const t = dictionaries[lang]

  useLayoutEffect(() => {
    syncDocument(lang, t)
  }, [lang, t])

  const value = useMemo(() => ({ lang, dir: dirFor(lang), t, setLang }), [lang, t, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
