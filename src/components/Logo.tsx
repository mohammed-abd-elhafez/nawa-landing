/**
 * Brand mark. Intentionally NOT mirrored in RTL: the wordmark pair is a fixed lockup.
 */
export function Logo() {
  return (
    <span className="logo" dir="ltr">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path d="M10 22C10 14 14 10 22 10" stroke="var(--sand)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="10" cy="22" r="3" fill="var(--accent)" />
        <circle cx="22" cy="10" r="3" fill="var(--sand)" />
      </svg>
      <span className="logo-word">
        <span lang="en">Nawa</span>
        <span lang="ar" className="logo-ar">نواة</span>
      </span>
    </span>
  )
}
