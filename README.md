# Nawa — Bilingual RTL/LTR Landing Page

> **Independent portfolio concept.** Nawa is a fictional studio. It is not a real client or commercial engagement. The work examples, the testimonial and the contact details are invented. The contact form is a demo: nothing is sent or stored.

A one-page site in Arabic and English, where Arabic is a real right-to-left layout and not translated text inside an LTR page.

## Setup

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check + production build
npm run preview      # serves dist on :4173
npm test             # unit tests (Vitest + Testing Library)
npx playwright install chromium   # once
npm run test:e2e     # overflow, RTL/LTR, keyboard and axe checks (Playwright, Chromium)
SCREENSHOTS=1 npx playwright test   # regenerate docs/screenshots/
FIREFOX=1 npx playwright test       # opt-in Firefox project
npx vitest run --coverage           # coverage report
```

## GitHub Pages deployment

The site is configured for `https://mohammed-abd-elhafez.github.io/nawa-landing/`.
Pushes to `main` run `.github/workflows/deploy.yml`, which installs dependencies, runs the unit suite, builds the site, and deploys `dist/` through GitHub Pages.

Stack: React 18, TypeScript, Vite, plain CSS with design tokens. Fonts are self-hosted through `@fontsource`. No backend, no paid APIs, no external requests.

## Architecture

```
src/
  i18n/          types.ts (Dictionary), en.ts, ar.ts, LanguageContext.tsx
  components/    one file per page section, plus Header, MobileDrawer, LanguageSwitcher
  lib/validate.ts  pure form validation (returns error codes; UI localizes them)
  styles/        tokens.css, base.css, layout.css, components.css
tests/           unit tests    e2e/  Playwright tests
docs/            CASE-STUDY.md, QA-CHECKLIST.md
```

## Localization decisions

- Language is application state in `LanguageProvider`. It sets `<html lang>` and `<html dir>`, the document title, the description, Open Graph tags and the canonical link.
- Both dictionaries implement the same `Dictionary` type, so a missing key is a compile error. A unit test also checks that both have the same shape.
- The Arabic copy is written directly in Modern Standard Arabic, not translated from English. **A native-speaker review is recommended before any real use.**
- Persistence: only the code `en` or `ar` is saved in `localStorage` (key `nawa-lang`). Switching also updates `?lang=ar` in the address bar (via `history.replaceState`), so a reload keeps the choice. No personal data is stored.
- No flash of wrong direction: `public/init-lang.js` sets `lang` and `dir` before first paint. It is an external file so the CSP can stay `script-src 'self'`.
- SEO: localized title and description, canonical, `hreflang` alternates (`en`, `ar`, `x-default`), Open Graph tags and `public/og-image.png`. The canonical, hreflang and `og:image` URLs are built from `window.location` at runtime, so set a fixed site URL before deploying (crawlers that do not run JavaScript only see the static English Open Graph defaults in `index.html`).
- Contact-form topics use stable ids (`brand`, `web`, `build`, `content`), so a chosen topic survives a language switch.
- Numerals are Western digits in both languages, chosen for consistency. The footer year and step numbers use them.
- Layout uses logical properties only (`margin-inline`, `inset-inline`, `border-inline-start`, `text-align: start`, `inline-size`).
- Mirrored: reading order, navigation, cards, forms and footer (through `dir`), directional arrows (`.icon-dir`) and the decorative route illustration (`.dir-mirror`).
- Not mirrored: the logo lockup, the email address (isolated as LTR) and the chevron, which only rotates for open and closed.
- Fonts: Inter and Fraunces for Latin, IBM Plex Sans Arabic for Arabic. Arabic gets a taller line-height and no letter-spacing.

## Accessibility notes

- Semantic landmarks: skip link, `header`, `nav` (labelled), `main`, `section` (labelled by headings), `footer`. Heading order is h1, h2, h3 in both languages.
- The language switcher is a labelled group of `aria-pressed` buttons. The two buttons carry their own `lang`.
- The mobile menu uses a native modal `<dialog>`, which provides a focus trap and Escape handling. Focus returns to the menu button on close. The button exposes `aria-expanded`.
- The FAQ uses disclosure buttons with `aria-expanded` and `aria-controls`.
- The form has visible labels and errors with an icon, text and a dashed border, so they never rely on colour alone. An error summary receives focus and links to each field. Fields use `aria-invalid` and `aria-describedby`.
- The announcement dismiss hands focus to the logo link.
- Visible `:focus-visible` outlines. Reduced-motion removes transitions and smooth scroll.

## Security notes

- No `dangerouslySetInnerHTML`, no network calls, no secrets. The `?lang=` value is checked against an allowlist.
- Production builds inject a Content-Security-Policy meta tag (`default-src 'self'`, no inline scripts). For real hosting, also send it as a response header together with `X-Content-Type-Options`, `Referrer-Policy` and `frame-ancestors 'none'`.
- `npm audit --omit=dev` and `npm audit` report 0 vulnerabilities.

## Test status

29 unit tests (about 97% statement coverage of `src/`, excluding `main.tsx`) and 34 passing Playwright tests on Chromium, with 12 screenshot tests skipped unless `SCREENSHOTS=1` is set. The suite includes axe (WCAG 2 A/AA) scans in both languages.

## Known limitations

- Screen readers (NVDA, VoiceOver, TalkBack) were not run. Checks were automated (axe) and keyboard-based.
- E2E runs on Chromium. The Firefox project is opt-in because Firefox failed to launch on the machine used for this build. WebKit was not tried. Real iOS and Android devices were not tested.
- The Arabic copy has not had native-speaker review.

## Disclaimer

Independent portfolio concept. No client claims, no fabricated metrics, no real business.
