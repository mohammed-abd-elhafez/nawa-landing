# Claude Build Brief — Nawa Bilingual RTL/LTR Landing Page

## Role

You are a senior web designer and frontend engineer specializing in bilingual interfaces, RTL layout systems, responsive design, typography, accessibility, and polished marketing pages.

Build a portfolio-quality independent concept. Do not imply that Nawa is a real client or commercial engagement.

## Project concept

Create **Nawa**, a fictional bilingual digital studio that helps local businesses launch clear, modern online experiences.

The project must support Arabic and English as first-class languages. The Arabic version must use true RTL layout behavior, not merely translated text inside an LTR page.

## Primary objectives

1. Demonstrate high-quality visual web design.
2. Demonstrate correct Arabic typography and RTL layout behavior.
3. Demonstrate a real Arabic/English language toggle.
4. Demonstrate responsive behavior across mobile, tablet, and desktop.
5. Demonstrate accessible navigation, forms, buttons, and content structure.
6. Demonstrate thoughtful localization rather than literal word replacement.

## Recommended stack

Use the existing repository stack if available. Otherwise use:

- React
- TypeScript
- Vite
- Tailwind CSS or maintainable CSS modules
- Local translation dictionaries typed in TypeScript
- No backend and no paid APIs
- Use locally stored SVG/CSS illustrations or clearly licensed assets only

Do not use machine-translated filler copy. Write concise, natural English and Modern Standard Arabic copy for the visible sections.

## Brand direction

Nawa should feel warm, confident, modern, and culturally aware:

- Deep charcoal or ink base
- Warm sand or cream surfaces
- One vivid but controlled accent color
- Arabic-friendly type scale with comfortable line height
- Strong editorial layout and generous whitespace
- Subtle geometric motifs inspired by navigation and connection, without cultural clichés

Avoid stereotypical “Arabic design” decoration, excessive gold, ornamental overload, or illegible display typography.

## Required page sections

Build one complete landing page with these sections:

1. Announcement bar with dismiss behavior.
2. Header with logo, navigation, language switcher, and primary CTA.
3. Hero section with bilingual headline, supporting copy, two CTAs, and a visual illustration.
4. Trust or capability strip with three to five concise proof points.
5. Services section with four service cards.
6. Process section with three or four steps.
7. Featured work or outcomes section with fictional, clearly labeled examples.
8. Testimonial section using fictional names and an explicit concept disclaimer in the case study.
9. FAQ accordion.
10. Contact form with validation and success state.
11. Footer with navigation, contact, language control, and social placeholders.

## Localization requirements

Implement language switching as application state:

- English route/state uses `dir="ltr"`.
- Arabic route/state uses `dir="rtl"`.
- Set the document `lang` attribute correctly.
- Mirror layout direction where appropriate.
- Keep logos and brand marks intentionally stable where mirroring would be wrong.
- Use logical CSS properties such as `margin-inline`, `padding-inline`, `inset-inline`, and `text-align: start`.
- Ensure icons that communicate direction are mirrored only when appropriate.
- Preserve the selected language after refresh if practical, using local storage without storing personal data.
- The toggle must be keyboard accessible and visibly indicate the current language.

## Arabic copy requirements

Write natural Arabic copy, not transliterated Arabic. Verify that:

- Headings have balanced line lengths.
- Paragraphs have comfortable line height.
- Buttons are concise and action-oriented.
- Form labels and validation messages are translated.
- The FAQ and footer are fully localized.
- Numbers and punctuation are handled consistently.

## Responsive requirements

Test at minimum:

- 320px mobile
- 390px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

At narrow widths:

- Replace full navigation with an accessible menu.
- Avoid horizontal overflow in both directions.
- Keep CTAs tappable and separated.
- Ensure Arabic text does not collide with icons.
- Keep forms single-column and readable.

## Interaction requirements

Implement and test:

- Language toggle
- Mobile navigation drawer
- Announcement dismissal
- FAQ expand/collapse
- Contact-form validation
- Contact-form success state without a real submission
- Focus return after closing dialogs or drawers
- Reduced-motion behavior

Do not create a fake API request. Clearly label the form as a demo if it does not submit to a real service.

## Accessibility requirements

- Use semantic header, nav, main, section, form, and footer elements.
- Maintain a logical heading hierarchy in both languages.
- Provide visible focus styles.
- Provide accessible labels for all form controls.
- Do not rely on color alone for validation or status.
- Ensure adequate contrast for both themes/surfaces.
- Use correct accordion and dialog semantics.
- Respect `prefers-reduced-motion`.
- Make the language switcher usable by keyboard and screen readers.
- Check both RTL and LTR keyboard flows.

## SEO and metadata

Add:

- Localized document titles and descriptions
- `lang` and `dir` updates
- Open Graph basics
- Canonical handling appropriate to the chosen routing approach
- Descriptive link text
- No misleading claims or fabricated business metrics

## Required deliverables

1. Working bilingual landing page.
2. English and Arabic translation dictionaries.
3. `README.md` with setup, architecture, localization decisions, accessibility notes, and independent-concept disclaimer.
4. A case study explaining:
   - Why RTL was treated as a layout system
   - Typography choices
   - Components that required mirroring
   - Mobile decisions
   - Accessibility checks
5. Tests for language switching, FAQ behavior, and form validation.
6. A final RTL/LTR QA checklist.

## Acceptance criteria

The project is complete only when:

- Switching language changes copy, document language, and document direction.
- Arabic layout is genuinely RTL across navigation, cards, forms, and footer.
- English layout remains visually correct after switching back.
- No horizontal overflow appears at 320px in either language.
- All interactive controls work with keyboard only.
- FAQ and mobile navigation expose correct expanded/collapsed states.
- Form errors are localized and understandable.
- The project contains no client claims or fabricated performance results.
- The README identifies the work as an independent portfolio concept.

## Working protocol

First inspect the repository and state whether it is empty, an existing app, or a static site. Propose the information architecture and token system before implementation. Build the English shell, then implement the Arabic version as a real RTL mode. Run tests in both directions and fix visual or semantic issues before delivery.

At the end, provide:

- Files changed
- Commands run
- Test results
- RTL/LTR checks performed
- Known limitations
- Recommended desktop and mobile screenshots
