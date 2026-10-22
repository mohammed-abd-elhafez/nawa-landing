import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../src/App'
import { LanguageProvider } from '../src/i18n/LanguageContext'

const head = (selector: string) => document.head.querySelector(selector)

describe('SEO tags', () => {
  it('adds hreflang alternates, canonical, og:image and updates them per language', async () => {
    const user = userEvent.setup()
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>,
    )
    expect(head('link[rel="alternate"][hreflang="en"]')).toBeInTheDocument()
    expect(head('link[rel="alternate"][hreflang="ar"]')?.getAttribute('href')).toContain('?lang=ar')
    expect(head('link[rel="alternate"][hreflang="x-default"]')).toBeInTheDocument()
    expect(head('meta[property="og:image"]')?.getAttribute('content')).toMatch(/og-image\.png$/)
    expect(head('link[rel="canonical"]')?.getAttribute('href')).not.toContain('lang=')

    await user.click(screen.getAllByRole('button', { name: 'العربية' })[0])
    expect(head('link[rel="canonical"]')?.getAttribute('href')).toContain('?lang=ar')
    expect(head('meta[property="og:locale"]')).toHaveAttribute('content', 'ar_AR')
  })
})
