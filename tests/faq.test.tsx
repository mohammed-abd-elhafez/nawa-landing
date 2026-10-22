import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Faq } from '../src/components/Faq'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { en } from '../src/i18n/en'

describe('FAQ accordion', () => {
  const setup = () =>
    render(
      <LanguageProvider initial="en">
        <Faq />
      </LanguageProvider>,
    )

  it('starts collapsed with correct aria state', () => {
    setup()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(en.faq.items.length)
    buttons.forEach((b) => expect(b).toHaveAttribute('aria-expanded', 'false'))
    expect(screen.queryByText(en.faq.items[0].a)).not.toBeVisible()
  })

  it('expands and collapses a panel with click', async () => {
    const user = userEvent.setup()
    setup()
    const btn = screen.getByRole('button', { name: en.faq.items[0].q })
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(en.faq.items[0].a)).toBeVisible()
    expect(btn.getAttribute('aria-controls')).toBe(screen.getByText(en.faq.items[0].a).parentElement?.id)
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles with the keyboard (Enter and Space)', async () => {
    const user = userEvent.setup()
    setup()
    const btn = screen.getByRole('button', { name: en.faq.items[1].q })
    btn.focus()
    await user.keyboard('{Enter}')
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard(' ')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('allows several panels to be open at once', async () => {
    const user = userEvent.setup()
    setup()
    const a = screen.getByRole('button', { name: en.faq.items[0].q })
    const b = screen.getByRole('button', { name: en.faq.items[1].q })
    await user.click(a)
    await user.click(b)
    expect(a).toHaveAttribute('aria-expanded', 'true')
    expect(b).toHaveAttribute('aria-expanded', 'true')
  })
})
