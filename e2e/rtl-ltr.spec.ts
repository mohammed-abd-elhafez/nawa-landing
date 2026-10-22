import { expect, test, type Page } from '@playwright/test'
import { ar } from '../src/i18n/ar'

const WIDTHS = [320, 390, 768, 1024, 1440]
const LANGS = ['en', 'ar'] as const

async function open(page: Page, lang: 'en' | 'ar', width: number) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto(`/?lang=${lang}`)
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
}

for (const lang of LANGS) {
  for (const width of WIDTHS) {
    test(`no horizontal overflow: ${lang} @ ${width}px`, async ({ page }) => {
      await open(page, lang, width)
      await page.evaluate(() => document.fonts.ready)
      const { scroll, client } = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }))
      expect(scroll).toBeLessThanOrEqual(client)
      // body has overflow-x hidden, so also check no element pokes out of the viewport
      const offenders = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth
        return [...document.querySelectorAll('body *')]
          .filter((el) => !el.closest('dialog:not([open])') && !el.closest('.visually-hidden') && !el.closest('.skip-link'))
          .filter((el) => {
            const r = el.getBoundingClientRect()
            return r.width > 0 && (r.right > vw + 1 || r.left < -1)
          })
          .slice(0, 5)
          .map((el) => `${el.tagName}.${(el as HTMLElement).className}`)
      })
      expect(offenders).toEqual([])
    })
  }
}

test('RTL mirrors the header: logo on the right, CTA on the left', async ({ page }) => {
  await open(page, 'ar', 1440)
  const logo = await page.locator('#site-logo').boundingBox()
  const cta = await page.locator('.header-cta').boundingBox()
  expect(logo!.x).toBeGreaterThan(cta!.x)
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})

test('switching language and back restores LTR layout', async ({ page }) => {
  await open(page, 'en', 1440)
  const before = await page.locator('#site-logo').boundingBox()
  await page.locator('#header-lang-ar').click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await page.locator('#header-lang-en').click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  const after = await page.locator('#site-logo').boundingBox()
  expect(after!.x).toBeCloseTo(before!.x, 0)
})

test('selected language survives a reload', async ({ page }) => {
  await open(page, 'en', 1024)
  await page.locator('#header-lang-ar').click()
  await expect(page).toHaveURL(/lang=ar/)
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})

test('mobile drawer: keyboard open, Escape closes, focus returns', async ({ page }) => {
  await open(page, 'ar', 390)
  const btn = page.locator('.menu-btn')
  await btn.focus()
  await page.keyboard.press('Enter')
  await expect(btn).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('dialog[open]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('dialog[open]')).toHaveCount(0)
  await expect(btn).toBeFocused()
  await expect(btn).toHaveAttribute('aria-expanded', 'false')
})

test('keyboard-only form flow shows localized errors', async ({ page }) => {
  await open(page, 'ar', 390)
  await page.getByRole('button', { name: ar.contact.submit }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.error-summary')).toContainText(ar.contact.errorSummary)
  await expect(page.locator('.error-summary')).toBeFocused()
})

test('reduced motion disables transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page, 'en', 1024)
  const duration = await page.locator('.btn-primary').first().evaluate((el) => getComputedStyle(el).transitionDuration)
  expect(parseFloat(duration)).toBeLessThan(0.01)
})
