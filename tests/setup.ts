import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom does not implement <dialog> modal methods.
HTMLDialogElement.prototype.showModal ??= function showModal(this: HTMLDialogElement) {
  this.setAttribute('open', '')
}
HTMLDialogElement.prototype.close ??= function close(this: HTMLDialogElement) {
  this.removeAttribute('open')
  this.dispatchEvent(new Event('close'))
}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  window.sessionStorage.clear()
  document.documentElement.removeAttribute('lang')
  document.documentElement.removeAttribute('dir')
  document.head.querySelectorAll('link[rel=canonical], link[rel=alternate], meta[property^=og], meta[name="twitter:card"]').forEach((el) => el.remove())
  window.history.replaceState(null, '', '/')
})
