import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '../src/components/Header'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { en } from '../src/i18n/en'

const setup = () => {
  render(
    <LanguageProvider initial="en">
      <Header />
      <section id="contact" />
      <section id="faq" />
    </LanguageProvider>,
  )
  return {
    user: userEvent.setup(),
    menuBtn: screen.getByRole('button', { name: en.nav.openMenu }),
    dialog: document.querySelector('dialog')!,
  }
}

describe('mobile drawer', () => {
  it('exposes expanded state and returns focus to the menu button on close', async () => {
    const { user, menuBtn, dialog } = setup()
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    await user.click(menuBtn)
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true')
    expect(dialog).toHaveAttribute('open')

    await user.click(screen.getByRole('button', { name: en.nav.closeMenu }))
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    expect(dialog).not.toHaveAttribute('open')
    expect(menuBtn).toHaveFocus()
  })

  it('closes on backdrop click (the dialog element itself)', async () => {
    const { user, menuBtn, dialog } = setup()
    await user.click(menuBtn)
    await user.click(dialog)
    expect(dialog).not.toHaveAttribute('open')
  })

  it('does not close when clicking inside the panel', async () => {
    const { user, menuBtn, dialog } = setup()
    await user.click(menuBtn)
    await user.click(screen.getByText(en.nav.drawerTitle))
    expect(dialog).toHaveAttribute('open')
  })

  it('closes on a nav link and moves focus to that section', async () => {
    const { user, menuBtn, dialog } = setup()
    await user.click(menuBtn)
    await user.click(screen.getAllByRole('link', { name: en.nav.items[3].label })[1])
    expect(dialog).not.toHaveAttribute('open')
    expect(document.getElementById('faq')).toHaveFocus()
  })
})
