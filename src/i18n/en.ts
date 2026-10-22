import type { Dictionary } from './types'

export const en: Dictionary = {
  meta: {
    title: 'Nawa — A bilingual digital studio (independent concept)',
    description:
      'Nawa is a fictional bilingual studio concept that designs clear, modern websites for local businesses in Arabic and English. An independent portfolio piece.',
    ogLocale: 'en_US',
    ogAltLocale: 'ar_AR',
  },
  skip: 'Skip to main content',
  announcement: {
    label: 'Announcement',
    text: 'Independent portfolio concept: Nawa is not a real studio.',
    cta: 'Read the disclaimer',
    dismiss: 'Dismiss announcement',
  },
  nav: {
    label: 'Main navigation',
    items: [
      { id: 'services', label: 'Services' },
      { id: 'process', label: 'Process' },
      { id: 'work', label: 'Work' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' },
    ],
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    drawerTitle: 'Menu',
  },
  lang: {
    groupLabel: 'Language',
    en: 'EN',
    ar: 'ع',
    enName: 'English',
    arName: 'العربية',
  },
  cta: 'Start a project',
  hero: {
    eyebrow: 'Digital studio · Arabic & English',
    title: 'Websites that read right, in both directions.',
    body: 'We design and build clear online experiences for local businesses, with Arabic and English treated as equals from the first sketch.',
    primary: 'Start a project',
    secondary: 'See our services',
    illustration:
      'Abstract illustration of three connected points joined by curved routes.',
  },
  strip: {
    label: 'What we focus on',
    items: [
      { title: 'Two languages', body: 'Arabic and English, designed together.' },
      { title: 'True RTL', body: 'Layouts that mirror, not just translate.' },
      { title: 'Accessible', body: 'Keyboard, screen reader and contrast checked.' },
      { title: 'Fast and light', body: 'No heavy frameworks where plain code works.' },
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'Everything a clear launch needs.',
    intro: 'Four focused services, each built to work in right-to-left and left-to-right.',
    items: [
      {
        title: 'Brand and identity',
        body: 'A simple, flexible identity with an Arabic and Latin wordmark that sit well side by side.',
      },
      {
        title: 'Website design',
        body: 'Editorial layouts, responsive from small phones to wide desktops, with real RTL behavior.',
      },
      {
        title: 'Build and launch',
        body: 'Fast, accessible front-end code that your team can read, maintain and extend.',
      },
      {
        title: 'Content and localization',
        body: 'Natural Modern Standard Arabic and English copy, written for each reader rather than translated word for word.',
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'Four steps, no surprises.',
    stepLabel: 'Step',
    steps: [
      { title: 'Listen', body: 'We learn how your business works and who your customers are.' },
      { title: 'Map', body: 'We agree on pages, content and the tone of each language.' },
      { title: 'Design and build', body: 'We design in both directions and build alongside, reviewing often.' },
      { title: 'Launch and hand over', body: 'We test, publish and leave you with clear documentation.' },
    ],
  },
  work: {
    eyebrow: 'Featured work',
    title: 'Example concepts.',
    intro: 'These are invented scenarios made to show the approach. They are not client projects.',
    badge: 'Fictional concept',
    items: [
      {
        tag: 'Café',
        title: 'Qahwa Corner',
        body: 'A menu-first site for an imaginary neighborhood café, with a bilingual menu that reflows cleanly.',
        outcome: 'Shows: mirrored menu layout and mixed-script prices.',
      },
      {
        tag: 'Clinic',
        title: 'Sakina Dental',
        body: 'A calm booking-focused site for an imaginary dental clinic, with large touch targets and plain language.',
        outcome: 'Shows: accessible forms and localized validation.',
      },
      {
        tag: 'Workshop',
        title: 'Warsha Studio',
        body: 'A portfolio for an imaginary furniture workshop, built around large images and short captions.',
        outcome: 'Shows: gallery behavior in both directions.',
      },
    ],
  },
  testimonial: {
    eyebrow: 'Kind words',
    quote:
      '“The Arabic page felt written for us, not translated. Switching languages kept everything where we expected it.”',
    name: 'Layla Haddad',
    role: 'Owner of Qahwa Corner (fictional)',
    disclaimer:
      'Concept disclaimer: this person, business and quote are invented for this portfolio piece. They are not a real client or review.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered plainly.',
    items: [
      {
        q: 'Is Nawa a real studio?',
        a: 'No. Nawa is an independent portfolio concept created to demonstrate bilingual and right-to-left web design. There are no clients, prices or services for sale.',
      },
      {
        q: 'Is Arabic a translation of the English?',
        a: 'No. Both versions are written separately in natural language, then adjusted for length, tone and layout.',
      },
      {
        q: 'What changes in the right-to-left layout?',
        a: 'Reading order, navigation, cards, forms and the footer all mirror. Logos, phone numbers and code stay as they are, and only direction-bearing icons flip.',
      },
      {
        q: 'Does the contact form send my message?',
        a: 'No. It is a demo. Nothing is submitted or stored, and the success message is shown locally in your browser.',
      },
      {
        q: 'Is my language choice stored?',
        a: 'Only the language code (en or ar) is saved in your browser so the page remembers it. No personal data is stored.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Tell us about your project.',
    body: 'This is a demo form for the concept. Try it out, and see how validation behaves in each language.',
    demoNote: 'Demo only: nothing is sent or saved.',
    fields: { name: 'Your name', email: 'Email address', topic: 'What do you need?', message: 'Message' },
    topicPlaceholder: 'Choose one',
    topics: [
      { id: 'brand', label: 'Brand and identity' },
      { id: 'web', label: 'Website design' },
      { id: 'build', label: 'Build and launch' },
      { id: 'content', label: 'Content and localization' },
    ],
    submit: 'Send demo message',
    errors: {
      required: 'This field is required.',
      email: 'Enter a valid email address, like name@example.com.',
      short: 'Please write at least 10 characters.',
    },
    errorSummary: 'Please fix the following before sending:',
    successTitle: 'Thank you, that worked.',
    successBody: 'This was a demo, so nothing was sent. In a real project, we would reply within a few working days.',
    reset: 'Fill in the form again',
  },
  footer: {
    tagline: 'Bilingual websites for local businesses. An independent concept.',
    navTitle: 'Explore',
    contactTitle: 'Contact',
    email: 'hello@nawa.example',
    location: 'Placeholder address, nowhere in particular',
    socialTitle: 'Follow',
    social: [
      { label: 'Instagram', note: 'placeholder' },
      { label: 'LinkedIn', note: 'placeholder' },
      { label: 'Behance', note: 'placeholder' },
    ],
    disclaimer:
      'Nawa is a fictional studio and an independent portfolio concept. It is not a real client or commercial engagement.',
    rights: '© 2026 Nawa concept. Made for demonstration.',
    langTitle: 'Language',
  },
}
