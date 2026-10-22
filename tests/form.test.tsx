import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../src/components/ContactForm'
import { LanguageSwitcher } from '../src/components/LanguageSwitcher'
import { LanguageProvider } from '../src/i18n/LanguageContext'
import { ar } from '../src/i18n/ar'
import { en } from '../src/i18n/en'
import { validateContact } from '../src/lib/validate'

const setup = (lang: 'en' | 'ar') =>
  render(
    <LanguageProvider initial={lang}>
      <ContactForm />
    </LanguageProvider>,
  )

describe('validateContact', () => {
  it('flags every empty field', () => {
    expect(validateContact({ name: '', email: '', topic: '', message: '' })).toEqual({
      name: 'required',
      email: 'required',
      topic: 'required',
      message: 'required',
    })
  })

  it('rejects malformed email and short messages', () => {
    const errors = validateContact({ name: 'A', email: 'nope@', topic: 'x', message: 'short' })
    expect(errors).toEqual({ email: 'email', message: 'short' })
  })

  it('accepts valid input', () => {
    expect(validateContact({ name: 'A', email: 'a@b.co', topic: 'x', message: 'long enough text' })).toEqual({})
  })
})

describe.each([
  ['en', en],
  ['ar', ar],
] as const)('contact form (%s)', (lang, dict) => {
  it('shows localized errors and links them with aria-describedby', async () => {
    const user = userEvent.setup()
    setup(lang)
    await user.click(screen.getByRole('button', { name: dict.contact.submit }))

    expect(document.querySelector('.error-summary')).toHaveTextContent(dict.contact.errorSummary)
    expect(document.querySelector('.error-summary')).toHaveFocus()
    const name = document.getElementById('field-name')!
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(document.getElementById(name.getAttribute('aria-describedby')!)).toHaveTextContent(dict.contact.errors.required)
  })

  it('shows the email-specific message', async () => {
    const user = userEvent.setup()
    setup(lang)
    await user.type(document.getElementById('field-email')!, 'bad')
    await user.click(screen.getByRole('button', { name: dict.contact.submit }))
    expect(document.getElementById('error-email')).toHaveTextContent(dict.contact.errors.email)
  })

  it('shows the success state without any network call', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    setup(lang)

    await user.type(document.getElementById('field-name')!, 'Sara')
    await user.type(document.getElementById('field-email')!, 'sara@example.com')
    await user.selectOptions(document.getElementById('field-topic')!, dict.contact.topics[0].id)
    await user.type(document.getElementById('field-message')!, 'A message of enough length.')
    await user.click(screen.getByRole('button', { name: dict.contact.submit }))

    expect(document.querySelector('.success')).toHaveTextContent(dict.contact.successTitle)
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})

describe('contact form behaviour', () => {
  const renderWithSwitcher = () =>
    render(
      <LanguageProvider initial="en">
        <LanguageSwitcher />
        <ContactForm />
      </LanguageProvider>,
    )

  it('keeps the chosen topic when the language changes mid-form', async () => {
    const user = userEvent.setup()
    renderWithSwitcher()
    const select = document.getElementById('field-topic') as HTMLSelectElement
    await user.selectOptions(select, 'web')
    await user.click(screen.getByRole('button', { name: ar.lang.arName }))
    expect(select.value).toBe('web')
    expect(select.selectedOptions[0]).toHaveTextContent(ar.contact.topics[1].label)
  })

  it('clears a field error once the field is edited', async () => {
    const user = userEvent.setup()
    renderWithSwitcher()
    await user.click(screen.getByRole('button', { name: en.contact.submit }))
    expect(document.getElementById('error-name')).toBeInTheDocument()
    await user.type(document.getElementById('field-name')!, 'S')
    expect(document.getElementById('error-name')).not.toBeInTheDocument()
  })

  it('re-translates visible errors when the language changes', async () => {
    const user = userEvent.setup()
    renderWithSwitcher()
    await user.click(screen.getByRole('button', { name: en.contact.submit }))
    await user.click(screen.getByRole('button', { name: ar.lang.arName }))
    expect(document.getElementById('error-name')).toHaveTextContent(ar.contact.errors.required)
  })

  it('moves focus to the field from an error-summary link', async () => {
    const user = userEvent.setup()
    renderWithSwitcher()
    await user.click(screen.getByRole('button', { name: en.contact.submit }))
    await user.click(screen.getAllByRole('link')[0])
    expect(document.getElementById('field-name')).toHaveFocus()
  })

  it('resets to an empty form from the success state', async () => {
    const user = userEvent.setup()
    renderWithSwitcher()
    await user.type(document.getElementById('field-name')!, 'Sara')
    await user.type(document.getElementById('field-email')!, 'sara@example.com')
    await user.selectOptions(document.getElementById('field-topic')!, 'web')
    await user.type(document.getElementById('field-message')!, 'A message of enough length.')
    await user.click(screen.getByRole('button', { name: en.contact.submit }))
    await user.click(screen.getByRole('button', { name: en.contact.reset }))
    expect((document.getElementById('field-name') as HTMLInputElement).value).toBe('')
  })
})
