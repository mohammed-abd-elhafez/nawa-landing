export interface ContactValues {
  name: string
  email: string
  topic: string
  message: string
}

export type ErrorCode = 'required' | 'email' | 'short'
export type ContactErrors = Partial<Record<keyof ContactValues, ErrorCode>>

const MIN_MESSAGE_LENGTH = 10
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Pure validation: returns error codes, which the UI maps to localized text. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  if (!values.name.trim()) errors.name = 'required'
  if (!values.email.trim()) errors.email = 'required'
  else if (!EMAIL.test(values.email.trim())) errors.email = 'email'
  if (!values.topic) errors.topic = 'required'
  const message = values.message.trim()
  if (!message) errors.message = 'required'
  else if (message.length < MIN_MESSAGE_LENGTH) errors.message = 'short'
  return errors
}
