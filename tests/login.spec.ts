import { test, expect } from '@playwright/test'

test('Ověř zobrazeni login stránky', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
    })