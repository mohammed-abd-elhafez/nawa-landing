import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../src/App'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { ar } from '../src/i18n/ar'
import { en } from '../src/i18n/en'

const renderApp = () =>
  render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  )

describe('language switching', () => {
  it('starts in English LTR', () => {
    renderApp()
    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(document.documentElement).toHaveAttribute('dir', 'ltr')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.hero.title)
  })

  it('switches copy, lang, dir and title to Arabic, then back', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getAllByRole('button', { name: 'العربية' })[0])
    expect(document.documentElement).toHaveAttribute('lang', 'ar')
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
    expect(document.title).toBe(ar.meta.title)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(ar.hero.title)

    await user.click(screen.getAllByRole('button', { name: 'English' })[0])
    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(document.documentElement).toHaveAttribute('dir', 'ltr')
    expect(document.title).toBe(en.meta.title)
  })

  it('marks only the current language as pressed', async () => {
    const user = userEvent.setup()
    renderApp()
    const [enBtn, arBtn] = [
      screen.getAllByRole('button', { name: 'English' })[0],
      screen.getAllByRole('button', { name: 'العربية' })[0],
    ]
    expect(enBtn).toHaveAttribute('aria-pressed', 'true')
    expect(arBtn).toHaveAttribute('aria-pressed', 'false')
    await user.click(arBtn)
    expect(arBtn).toHaveAttribute('aria-pressed', 'true')
    expect(enBtn).toHaveAttribute('aria-pressed', 'false')
  })

  it('persists only the language code and restores it', async () => {
    const user = userEvent.setup()
    const first = renderApp()
    await user.click(screen.getAllByRole('button', { name: 'العربية' })[0])
    expect(window.localStorage.getItem('nawa-lang')).toBe('ar')
    first.unmount()

    renderApp()
    expect(document.documentElement).toHaveAttribute('dir', 'rtl')
    expect(window.localStorage.length).toBe(1)
  })

  it('has matching dictionary shapes in both languages', () => {
    const shape = (v: unknown): unknown =>
      Array.isArray(v) ? [v.length, ...v.slice(0, 1).map(shape)] : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shape(x)])) : typeof v
    expect(shape(ar)).toEqual(shape(en))
  })

  it('dismisses the announcement bar', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(screen.getByRole('button', { name: en.announcement.dismiss }))
    expect(screen.queryByRole('button', { name: en.announcement.dismiss })).not.toBeInTheDocument()
  })
})
