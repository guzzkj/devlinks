import { test, expect } from '@playwright/test'

const DESKTOP = { width: 1440, height: 1024 }
const MOBILE = { width: 360, height: 800 }

const toggle = (page) => page.getByRole('switch', { name: /alternar/i })
const theme = (page) => page.evaluate(() => document.documentElement.dataset.theme)

test.beforeEach(async ({ page }) => {
  await page.setViewportSize(DESKTOP)
})

test('carrega sem erros no console', async ({ page }) => {
  const errors = []
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))
  page.on('pageerror', (err) => errors.push(err.message))
  await page.goto('/')
  await expect(page.getByText('@guzzkj')).toBeVisible()
  expect(errors).toEqual([])
})

test('tema escuro é o padrão e alterna para claro e de volta', async ({ page }) => {
  await page.goto('/')
  expect(await theme(page)).toBe('dark')
  await toggle(page).click()
  expect(await theme(page)).toBe('light')
  await expect(toggle(page)).toHaveAttribute('aria-checked', 'true')
  await toggle(page).click()
  expect(await theme(page)).toBe('dark')
})

test('tema claro continua após recarregar a página', async ({ page }) => {
  await page.goto('/')
  await toggle(page).click()
  expect(await page.evaluate(() => localStorage.getItem('devlinks-theme'))).toBe('light')
  await page.reload()
  expect(await theme(page)).toBe('light')
  await expect(toggle(page)).toHaveAttribute('aria-checked', 'true')
})

test('avatar muda com o tema (claro tem óculos)', async ({ page }) => {
  await page.goto('/')
  const img = page.getByRole('img', { name: /foto de perfil/i })
  const dark = await img.getAttribute('src')
  await toggle(page).click()
  expect(await img.getAttribute('src')).not.toBe(dark)
})

test('4 botões e 4 redes sociais com os destinos corretos', async ({ page }) => {
  await page.goto('/')
  const buttons = page.locator('a.link-button')
  await expect(buttons).toHaveCount(4)
  const expected = [
    ['Inscreva-se no Curso', 'https://example.com/curso'],
    ['Baixe meu e-book', 'https://example.com/ebook'],
    ['Veja meu portfólio', 'https://example.com/portfolio'],
    ['Conheça meu curso', 'https://example.com/conheca'],
  ]
  for (const [i, [title, url]] of expected.entries()) {
    await expect(buttons.nth(i)).toHaveText(title)
    await expect(buttons.nth(i)).toHaveAttribute('href', url)
    await expect(buttons.nth(i)).toHaveAttribute('target', '_blank')
    await expect(buttons.nth(i)).toHaveAttribute('rel', /noopener/)
  }
  const socials = {
    GitHub: 'https://github.com/guzzkj',
    Instagram: 'https://www.instagram.com/gustavo.hbarros',
    YouTube: 'https://youtube.com',
    LinkedIn: 'https://www.linkedin.com/in/gustavohbarros',
  }
  for (const [name, url] of Object.entries(socials)) {
    await expect(page.getByRole('link', { name })).toHaveAttribute('href', url)
  }
})

test('link externo abre em nova aba', async ({ page, context }) => {
  await page.goto('/')
  // bloqueia a rede externa: só queremos ver que a nova aba foi pedida
  await context.route('https://example.com/**', (route) => route.fulfill({ body: 'ok' }))
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('link', { name: 'Baixe meu e-book' }).click(),
  ])
  expect(popup.url()).toBe('https://example.com/ebook')
})

test('navegação por teclado: Tab chega no toggle, nos links e Enter troca o tema', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(toggle(page)).toBeFocused()
  await page.keyboard.press('Enter')
  expect(await theme(page)).toBe('light')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Inscreva-se no Curso' })).toBeFocused()
  for (let i = 0; i < 7; i++) await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeFocused()
})

for (const [label, size] of [['desktop', DESKTOP], ['mobile', MOBILE]]) {
  test(`${label}: sem rolagem horizontal`, async ({ page }) => {
    await page.setViewportSize(size)
    await page.goto('/')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test(`${label}: layout dos botões`, async ({ page }) => {
    await page.setViewportSize(size)
    await page.goto('/')
    const box = await page.locator('a.link-button').first().boundingBox()
    expect(box.height).toBe(56)
    // desktop: 540px fixos; mobile: largura total menos 24px de margem de cada lado
    expect(box.width).toBe(label === 'desktop' ? 540 : size.width - 48)
  })

  for (const mode of ['dark', 'light']) {
    test(`captura de tela: ${label} ${mode}`, async ({ page }) => {
      await page.setViewportSize(size)
      await page.goto('/')
      if (mode === 'light') await toggle(page).click()
      await page.waitForTimeout(400)
      await page.screenshot({ path: `evidencias/playwright-${label}-${mode}.png` })
    })
  }
}
