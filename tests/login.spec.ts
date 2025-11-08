import { test, expect } from '@playwright/test';

// Test Suite: Login Functionality TC_LOGIN_001 - TC_LOGIN_004
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

  // Test case ID: TC_LOGIN_003 – Invalid login (data-driven)
  test.describe('Login – negative (TC_LOGIN_003.*)', () => {
    // Data-driven negative login tests
    const A64 = 'a'.repeat(64);
    const SPECIAL_SIMPLE = '/*-+%';
    const SPECIAL_UNICODE = 'ˇ=/*-+';

    type Case = {
      id: number;
      name: string;
      user: string;
      pass: string;
      expected: RegExp;
    };

    const cases: Case[] = [
      { id: 1,  name: 'empty username & password',       user: '',               pass: '',               expected: /Epic sadface:\s*Username is required/i },
      { id: 2,  name: 'missing password',                user: 'standard_user',  pass: '',               expected: /Epic sadface:\s*Password is required/i },
      { id: 3,  name: 'missing username',                user: '',               pass: 'secret_sauce',   expected: /Epic sadface:\s*Username is required/i },
      { id: 4,  name: 'wrong username',                  user: 'invalid_user',   pass: 'secret_sauce',   expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id: 5,  name: 'wrong password',                  user: 'standard_user',  pass: 'wrong_password', expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id: 6,  name: 'locked out user',                 user: 'locked_out_user',pass: 'secret_sauce',   expected: /Epic sadface:\s*Sorry, this user has been locked out\./i },
      { id: 7,  name: 'password with special chars',     user: 'standard_user',  pass: SPECIAL_SIMPLE,   expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id: 8,  name: 'username with special chars',     user: SPECIAL_SIMPLE,   pass: 'secret_sauce',   expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id: 9,  name: '64-char username',                user: A64,              pass: 'secret_sauce',   expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id:10,  name: '64-char password',                user: 'standard_user',  pass: A64,              expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id:11,  name: 'username contains digits',        user: 'user123',        pass: 'secret_sauce',   expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id:12,  name: 'password contains digits',        user: 'standard_user',  pass: 'pass123',        expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id:13,  name: 'both fields special chars',       user: SPECIAL_UNICODE,  pass: SPECIAL_UNICODE,  expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id:14,  name: 'valid user, wrong password',      user: 'performance_glitch_user', pass: 'wrong_pass', expected: /Epic sadface:\s*Username and password do not match any user in this service/i },
      { id:15,  name: 'invalid user, missing password',  user: 'invalid_user',   pass: '',               expected: /Epic sadface:\s*Password is required/i },
    ];

    for (const c of cases) {
      test(`TC_LOGIN_003.${c.id.toString().padStart(2, '0')} – ${c.name}`, async ({ page }) => {
        // Fill username and password fields
        await page.getByRole('textbox', { name: 'Username' }).fill(c.user);
        await page.getByRole('textbox', { name: 'Password' }).fill(c.pass);

        // Click the Login button
        await page.getByRole('button', { name: 'Login' }).click();

        // Verify error message is visible and matches expected text
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText(c.expected);
      });
    }
  });
  // TC_LOGIN_004 - Password Field Masking
  test('Verify password masking', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveAttribute('type', 'password');
  });
});

// Test Suite: Logout Functionality TC_LOGIN_005 - TC_LOGIN_006
test.describe('Logout functionality tests', () => {

  // Common setup – run before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify correct URL after login
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  // TC_LOGIN_005 - Logout Functionality
  test.only('Verify successful logout', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    // Verify that the user is redirected back to the Login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});