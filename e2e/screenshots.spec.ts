import { test } from '@playwright/test'

test.skip(!process.env.SCREENSHOTS, 'run with SCREENSHOTS=1')
test.skip(({ browserName }) => browserName !== 'chromium', 'chromium only')

const out = 'docs/screenshots'

for (const lang of ['en', 'ar'] as const) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    test(`page ${lang} ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(`/?lang=${lang}`)
      await page.evaluate(() => document.fonts.ready)
      await page.screenshot({ path: `${out}/${lang}-${width}-full.png`, fullPage: true })
    })
  }

  test(`states ${lang}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/?lang=${lang}`)
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.menu-btn').click()
    await page.screenshot({ path: `${out}/${lang}-390-drawer.png` })
    await page.keyboard.press('Escape')
    await page.locator('#faq-btn-0').click()
    await page.locator('#faq-btn-1').click()
    await page.locator('#faq').screenshot({ path: `${out}/${lang}-390-faq-open.png` })
    await page.locator('form button[type=submit]').click()
    await page.locator('#contact').screenshot({ path: `${out}/${lang}-390-form-errors.png` })
    await page.locator('#field-name').fill('Sara')
    await page.locator('#field-email').fill('sara@example.com')
    await page.locator('#field-topic').selectOption({ index: 1 })
    await page.locator('#field-message').fill('A message with enough length.')
    await page.locator('form button[type=submit]').click()
    await page.locator('#contact').screenshot({ path: `${out}/${lang}-390-form-success.png` })
  })
}
