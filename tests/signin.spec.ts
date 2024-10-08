import { test, expect } from '@playwright/test';

test.describe('Sign In Page', () => {
  // Test case for successful sign-in
  test('should sign in successfully with valid credentials', async ({ page }) => {
    await page.goto('/sign-in'); // Replace with your URL

    // Enter valid email
    await page.fill('input[name="email"]', 'niharphansalkar@gmail.com');

    // Enter valid password
    await page.fill('input[name="password"]', 'securePassword123');

    // Click the sign-in button
    await page.click('button[type="submit"]');

    // Expect to navigate to home page or dashboard
    await expect(page).toHaveURL('/');
  });

  // Test case for invalid email format
  test('should show error for invalid email format', async ({ page }) => {
    await page.goto('/sign-in'); // Replace with your URL

    // Enter invalid email
    await page.fill('input[name="email"]', '1234');

    // Enter valid password
    await page.fill('input[name="password"]', 'securePassword123');

    // Click the sign-in button
    await page.click('button[type="submit"]');

    // Expect email validation error
    const emailError = await page.locator('text=Invalid email');
    await expect(emailError).toBeVisible();
  });

  // Test case for password less than 8 characters
  test('should show error for short password', async ({ page }) => {
    await page.goto('/sign-in'); // Replace with your URL

    // Enter valid email
    await page.fill('input[name="email"]', 'niharphansalkar@gmail.com');

    // Enter short password
    await page.fill('input[name="password"]', 'short');

    // Click the sign-in button
    await page.click('button[type="submit"]');

    // Expect password validation error
    const passwordError = await page.locator('text=String must contain at least 8 character(s)');
    await expect(passwordError).toBeVisible();
  });

  // Test case for missing email and password
  test('should show errors when email and password are empty', async ({ page }) => {
    await page.goto('/sign-in'); // Replace with your URL

    // Click the sign-in button without filling email and password
    await page.click('button[type="submit"]');

    // Expect validation errors
    const emailError = await page.locator('text=Invalid email');
    const passwordError = await page.locator('text=String must contain at least 8 character(s)');

    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  // Test case for navigating to the sign-up page
  test('should navigate to sign-up page', async ({ page }) => {
    await page.goto('/sign-in'); // Replace with your URL

    // Click the sign-up link
    await page.click('text=Sign In');

    // Expect to navigate to the sign-up page
    await expect(page).toHaveURL('/sign-in');
  });
});

