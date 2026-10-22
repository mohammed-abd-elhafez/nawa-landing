# Case study: Nawa as a bilingual layout system

*Independent portfolio concept. Nawa is fictional, and nothing here describes a real client or measured result.*

## Why RTL is a layout system, not a translation

Putting Arabic text into an LTR page leaves the reading order, the alignment, the icon direction and the focus order wrong. So direction is set once, on `<html dir>`, and every layout rule is written with logical properties (`inline-start`, `inline-end`, `padding-inline`). Flexbox and grid then mirror by themselves. The result is that almost no `[dir=rtl]` overrides exist: only two (`.icon-dir` and `.dir-mirror`) sit in the base stylesheet.

## Typography

- **Latin:** Inter for body, Fraunces for display. The serif adds the editorial feel.
- **Arabic:** IBM Plex Sans Arabic for both body and display. It is legible at small sizes and sits next to Inter without clashing.
- Arabic line-height is 1.85 for body and 1.4 for headings, against 1.6 and 1.1 for Latin. Arabic letters connect and carry marks above and below, so they need more vertical room.
- No letter-spacing or uppercase on Arabic. Tracking breaks letter joining.
- Heading widths are capped in `ch` and use `text-wrap: balance` so Arabic headings break into even lines.

## Components that needed mirroring (or not)

| Component | Behaviour |
|---|---|
| Header, nav, cards, footer | Mirror through `dir` and logical properties |
| CTA arrow | Flipped in RTL (`.icon-dir`) |
| Hero route illustration | Flipped in RTL, because it implies direction of travel |
| FAQ chevron | Not mirrored: it points down and rotates for state |
| Logo lockup | **Kept stable**: forced `dir="ltr"` |
| Email address | Isolated as LTR inside RTL text |
| Process numbers | LTR digits, shown as `01`–`04` |
| Mobile drawer | Slides in from the inline-end edge |

## Mobile decisions

- Under 1024px the navigation, language switcher and CTA move into a drawer. At that size the full nav would collide with the Arabic labels.
- The logo, language-agnostic menu button and drawer all use 44px or larger touch targets.
- Forms are single-column. CTAs wrap with a gap and stay full-size.
- Headline sizes use `clamp()`, and Arabic is scaled down slightly (0.88) because Arabic glyphs run visually larger.

## Accessibility checks

- Automated: Playwright checks for horizontal overflow at 320, 390, 768, 1024 and 1440px in both languages, header mirroring, language round-trip, persistence, drawer keyboard behaviour, the keyboard form flow and reduced motion.
- Unit tests cover language switching, FAQ semantics and keyboard use, form validation in both languages and drawer focus return.
- Manual: tab order in both directions, visible focus, and error text that does not rely on colour.
- axe scans (WCAG 2 A/AA) run in both languages, with the drawer open and with form errors.
- A code review and a security review were run, and their high-severity findings were fixed: topic values were localized labels (so a language switch broke the select), name and email fields had `autocomplete=off`, and the `?lang=` URL overrode a saved choice. The drawer now has a single close path that handles focus return.
- Not done: assistive-technology testing with real screen readers.
