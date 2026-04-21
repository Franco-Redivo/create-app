// @ts-check
import { test, expect } from '@playwright/test'

test('renders the front page and navigates to messages', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('Welcome')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Messages' })).toHaveAttribute('href', '/messages')

  await page.getByRole('link', { name: 'Messages' }).click()

  await expect(page).toHaveURL(/\/messages$/)
  await expect(page.getByRole('heading', { name: 'Messages' })).toBeVisible()
  await expect(page.locator('#message')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send!' })).toBeVisible()
})

test('can create and delete a message', async ({ page }) => {
  const messageBody = `Hello from Playwright ${Date.now()}`

  await page.goto('/messages')

  await page.locator('#message').fill(messageBody)
  await page.getByRole('button', { name: 'Send!' }).click()

  await expect(page.getByText(messageBody)).toBeVisible()

  await page.getByRole('button', { name: 'delete' }).click()

  await expect(page.getByText(messageBody)).toHaveCount(0)
})
