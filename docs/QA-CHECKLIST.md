# RTL/LTR QA checklist

Mark each item for **EN (LTR)** and **AR (RTL)**. "Auto" means an automated test covers it. Status below reflects what was actually verified in this build.

## Language and document
- [x] Toggle changes copy, `lang`, `dir` and the title (auto: unit)
- [x] Current language is visibly and programmatically indicated (`aria-pressed`) (auto: unit)
- [x] Selection persists after reload; only `en`/`ar` is stored (auto: unit, e2e)
- [x] Switching back to EN restores the LTR layout (auto: e2e)
- [x] Both dictionaries have the same shape (auto: unit)

## Layout
- [x] No horizontal overflow at 320, 390, 768, 1024, 1440 in both languages (auto: e2e)
- [x] Header mirrors: logo at the inline-start edge (auto: e2e)
- [x] Cards, steps, footer and form follow reading direction (visual check)
- [x] Logo lockup and email stay LTR (visual check)
- [x] CTA arrow and hero illustration mirror in RTL (visual check)
- [x] Screenshots for 320/390/768/1024/1440 in both languages, plus drawer, FAQ, form errors and success at 390, are in `docs/screenshots/`
- [ ] Visual check on real iOS and Android devices (not done)
- [ ] Firefox and WebKit runs (Firefox project is opt-in and failed to launch here; WebKit not tried)

## Typography
- [x] Arabic headings break into balanced lines (visual check at 390 and 1440)
- [x] Arabic line-height comfortable, no letter-spacing (visual check)
- [x] Numerals consistent (Western digits)

## Interaction
- [x] Announcement dismisses and focus moves to the logo (unit; manual)
- [x] Mobile drawer: opens with keyboard, Escape closes, focus returns (auto: unit, e2e)
- [x] FAQ: click, Enter and Space toggle; `aria-expanded` correct (auto: unit)
- [x] Form: localized errors, summary receives focus, success state, no network call (auto: unit, e2e)
- [x] Reduced motion disables transitions (auto: e2e)

## Accessibility
- [x] Landmarks and heading order (manual review)
- [x] Visible focus on all controls (manual review)
- [x] Errors use icon, text and border, not colour alone (manual review)
- [x] axe (WCAG 2 A/AA, including color-contrast): 0 violations in EN and AR at 390 and 1440px, with the drawer open, and with form errors plus an open FAQ (auto: e2e, Chromium)
- [x] Keyboard-only flows in both languages: skip link, announcement dismiss, language switch, FAQ, tab order follows direction (auto: e2e)
- [x] Form fields expose `autocomplete` for name and email (WCAG 1.3.5)
- [ ] Screen reader pass: NVDA, VoiceOver, TalkBack (not done)
- [ ] Lighthouse audit (not done)
- [ ] Native Arabic copy review (not done)
