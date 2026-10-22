import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const lang of ['en', 'ar'] as const) {
  for (const width of [390, 1440]) {
    test(`axe: no violations (${lang} @ ${width}px)`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(`/?lang=${lang}`)
      await page.evaluate(() => document.fonts.ready)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(' | ')}`)).toEqual([])
    })
  }

  test(`axe: mobile drawer open (${lang})`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/?lang=${lang}`)
    await page.locator('.menu-btn').click()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    expect(results.violations.map((v) => v.id)).toEqual([])
  })

  test(`axe: form error state and open FAQ (${lang})`, async ({ page }) => {
    await page.goto(`/?lang=${lang}`)
    await page.locator('#faq-btn-0').click()
    await page.locator('form button[type=submit]').click()
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    expect(results.violations.map((v) => v.id)).toEqual([])
  })
}
