import { expect, test } from '@playwright/test'

for (const lang of ['en', 'ar'] as const) {
  test.describe(`keyboard only (${lang})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(`/?lang=${lang}`)
    })

    test('skip link moves focus to main', async ({ page }) => {
      await page.keyboard.press('Tab')
      await expect(page.locator('.skip-link')).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page.locator('#main')).toBeFocused()
    })

    test('announcement dismisses by keyboard and focus lands on the logo', async ({ page }) => {
      await page.getByRole('button', { name: /Dismiss announcement|إغلاق الإعلان/ }).focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('.announcement')).toHaveCount(0)
      await expect(page.locator('#site-logo')).toBeFocused()
    })

    test('language switch works with Enter and Space', async ({ page }) => {
      const other = lang === 'en' ? '#header-lang-ar' : '#header-lang-en'
      await page.locator(other).focus()
      await page.keyboard.press('Enter')
      await expect(page.locator('html')).toHaveAttribute('lang', lang === 'en' ? 'ar' : 'en')
      await page.locator(lang === 'en' ? '#header-lang-en' : '#header-lang-ar').focus()
      await page.keyboard.press('Space')
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
    })

    test('FAQ toggles with Space and Enter', async ({ page }) => {
      const btn = page.locator('#faq-btn-2')
      await btn.focus()
      await page.keyboard.press('Space')
      await expect(btn).toHaveAttribute('aria-expanded', 'true')
      await page.keyboard.press('Enter')
      await expect(btn).toHaveAttribute('aria-expanded', 'false')
    })

    test('Tab order across the nav follows reading direction', async ({ page }) => {
      await page.locator('#site-logo').focus()
      const xs: number[] = []
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Tab')
        xs.push(await page.evaluate(() => document.activeElement!.getBoundingClientRect().x))
      }
      const sorted = [...xs].sort((a, b) => (lang === 'en' ? a - b : b - a))
      expect(xs).toEqual(sorted)
    })
  })
}
