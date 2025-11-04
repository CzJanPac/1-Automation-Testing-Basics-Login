import { test, expect } from '@playwright/test';

// Test Suite: Login Functionality TC_LOGIN_001 - TC_LOGIN_003
test.describe('Login functionality tests', () => {

  // Common setup – run before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // Test case ID: TC_LOGIN_001
  test('Login page loads', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  // Test case ID: TC_LOGIN_002
  test('Successful login redirects to Inventory page', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify that "Products" header is visible
    await expect(page.getByText('Products')).toBeVisible();

    // Verify correct URL after login
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  // Test case ID: TC_LOGIN_003

});
