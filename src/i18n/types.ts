export type Lang = 'en' | 'ar'

export interface TitledText {
  title: string
  body: string
}

export interface Dictionary {
  meta: { title: string; description: string; ogLocale: string; ogAltLocale: string }
  skip: string
  announcement: { label: string; text: string; cta: string; dismiss: string }
  nav: {
    label: string
    items: { id: string; label: string }[]
    openMenu: string
    closeMenu: string
    drawerTitle: string
  }
  lang: { groupLabel: string; en: string; ar: string; enName: string; arName: string }
  cta: string
  hero: {
    eyebrow: string
    title: string
    body: string
    primary: string
    secondary: string
    illustration: string
  }
  strip: { label: string; items: TitledText[] }
  services: { eyebrow: string; title: string; intro: string; items: TitledText[] }
  process: { eyebrow: string; title: string; stepLabel: string; steps: TitledText[] }
  work: {
    eyebrow: string
    title: string
    intro: string
    badge: string
    items: { tag: string; title: string; body: string; outcome: string }[]
  }
  testimonial: {
    eyebrow: string
    quote: string
    name: string
    role: string
    disclaimer: string
  }
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] }
  contact: {
    eyebrow: string
    title: string
    body: string
    demoNote: string
    fields: { name: string; email: string; topic: string; message: string }
    topicPlaceholder: string
    topics: { id: 'brand' | 'web' | 'build' | 'content'; label: string }[]
    submit: string
    errors: { required: string; email: string; short: string }
    errorSummary: string
    successTitle: string
    successBody: string
    reset: string
  }
  footer: {
    tagline: string
    navTitle: string
    contactTitle: string
    email: string
    location: string
    socialTitle: string
    social: { label: string; note: string }[]
    disclaimer: string
    rights: string
    langTitle: string
  }
}
