# Code Review: Nawa Bilingual RTL/LTR Landing Page

## Summary

The project is a well-structured React/Vite landing page with genuine Arabic RTL support, localized SEO metadata, strong keyboard/accessibility coverage, and no production data or network dependencies. The review found one deployment-blocking issue, one flaky focus behavior, an E2E isolation issue, and vulnerable development tooling; all were fixed before deployment.

**Verdict**: Approve

## Critical Issues

None remain after the fixes below.

## Major Issues Found and Fixed

### 1. GitHub Pages project-path asset breakage — fixed

- **Location:** `index.html`, `vite.config.ts`, `src/i18n/LanguageContext.tsx`
- **Problem:** Root-absolute paths such as `/init-lang.js` and the default Vite base path work on `/`, but fail when the site is published at `/nawa-landing/`.
- **Fix:** Configured Vite with `base: '/nawa-landing/'`, used Vite's deployment-aware base token for the pre-paint initializer, and generated the Open Graph image URL from `document.baseURI`.
- **Verification:** The built app responds correctly at `/nawa-landing/`; the initializer and hashed JS bundle both return HTTP 200.

### 2. Development dependency vulnerabilities — fixed

- **Location:** `package.json`, `package-lock.json`
- **Problem:** The original Vitest/Vite toolchain contained 7 audit findings, including critical advisories in Vitest and Tinypool.
- **Fix:** Upgraded Vite to the patched 6.x line and Vitest/coverage tooling to 5.0.5, then updated the lockfile.
- **Verification:** Both `npm audit --omit=dev` and `npm audit` report 0 vulnerabilities.

### 3. E2E tests could silently use an unrelated existing server — fixed

- **Location:** `playwright.config.ts`
- **Problem:** `reuseExistingServer: true` allowed the suite to test whatever application happened to occupy port 4173. This produced false failures when another dashboard preview was running.
- **Fix:** Set `reuseExistingServer: false`, so every E2E run starts the configured Nawa preview server instead of silently reusing a different app.

## Minor Issues Found and Fixed

### 1. Localized error-summary focus was timing-sensitive — fixed

- **Location:** `src/components/ContactForm.tsx`
- **Problem:** Focusing the error summary through `requestAnimationFrame` was flaky in the Arabic test path.
- **Fix:** Moved focus management to a React effect that runs after the error state renders.
- **Verification:** All 29 unit tests pass consistently.

## Positive Feedback

- The language dictionaries share a TypeScript shape, making missing localization keys compile-time errors.
- RTL behavior uses logical CSS properties and explicitly mirrors directional UI elements.
- The contact form has visible labels, localized validation, `aria-invalid`, `aria-describedby`, a focusable error summary, and no network submission path.
- The mobile navigation uses a native modal dialog with focus restoration and Escape handling.
- The project includes automated axe scans, keyboard flows, RTL/LTR layout checks, unit tests, and screenshot coverage.
- The production CSP is restrictive and the project has no secrets, backend, or third-party runtime requests.
- Fonts are self-hosted, avoiding an external font dependency at runtime.

## Questions for Author

None blocking. Before presenting this as real client work, complete the documented native Arabic-speaker review and a screen-reader pass on NVDA, VoiceOver, or TalkBack.

## Test Coverage Assessment

- **Unit tests:** 29 passed across 5 test files.
- **Coverage:** 97.18% statements, 92.95% branches, 97.53% functions, and 98.63% lines.
- **E2E:** 34 passed on Chromium; 12 screenshot cases are intentionally skipped unless `SCREENSHOTS=1` is set.
- **Accessibility:** axe WCAG 2 A/AA checks passed in English and Arabic, including the mobile drawer and form-error/FAQ state.
- **Build:** `npm run build` passed.
- **Security:** `npm audit --omit=dev` and `npm audit` both report 0 vulnerabilities.

## Remaining Non-Blocking Limitations

- Screen readers were not run manually.
- Firefox and WebKit were not included in the default run; real mobile devices were not tested.
- Arabic copy still needs native-speaker review.
- The production build prints a non-blocking Vite warning for the intentionally static pre-paint initializer, which is copied to `dist/` and verified at the deployed project path.
