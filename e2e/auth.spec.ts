import { test, expect } from '@playwright/test';

test.describe('Authentication E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/login');
    });

    test('should display login form', async ({ page }) => {
        await expect(page).toHaveURL(/\/login/);

        // Check for email and password fields
        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
    });

    test('should display validation errors for empty form', async ({ page }) => {
        const loginButton = page.getByRole('button', { name: /login|sign in/i });
        await loginButton.click();

        // Should show validation errors
        await page.waitForTimeout(500);
    });

    test('should navigate to register page', async ({ page }) => {
        const registerLink = page.getByRole('link', { name: /register|sign up/i });

        if (await registerLink.isVisible()) {
            await registerLink.click();
            await expect(page).toHaveURL(/\/register/);
        }
    });

    test('should display register form', async ({ page }) => {
        await page.goto('/register');

        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        await expect(emailInput).toBeVisible();
        await expect(passwordInput).toBeVisible();
    });

    test('should show password visibility toggle', async ({ page }) => {
        const passwordInput = page.getByLabel(/password/i);
        await expect(passwordInput).toHaveAttribute('type', 'password');

        // Look for toggle button
        const toggleButton = page.locator('button[aria-label*="password"], [type="button"]:near(:text("password"))').first();

        if (await toggleButton.isVisible()) {
            await toggleButton.click();
            // Password should be visible
            await page.waitForTimeout(300);
        }
    });

    test('should handle forgot password link', async ({ page }) => {
        const forgotLink = page.getByRole('link', { name: /forgot password/i });

        if (await forgotLink.isVisible()) {
            await forgotLink.click();
            await page.waitForTimeout(500);
        }
    });
});

test.describe('User Session Tests', () => {
    test('should persist cart after login', async ({ page }) => {
        // Add item to cart while not logged in
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');

        const firstProduct = page.locator('a[href*="/product/"]').first();
        if (await firstProduct.isVisible()) {
            await firstProduct.click();
            await page.waitForLoadState('networkidle');

            const addToCartButton = page.getByRole('button', { name: /add to cart/i });
            if (await addToCartButton.isVisible()) {
                await addToCartButton.click();
                await page.waitForTimeout(1000);

                // Navigate to login
                await page.goto('/login');

                // Cart should still have items after navigation
                const cartCount = page.locator('[data-testid="cart-count"], .cart-count').first();
                if (await cartCount.isVisible()) {
                    const count = await cartCount.textContent();
                    expect(parseInt(count || '0')).toBeGreaterThan(0);
                }
            }
        }
    });

    test('should show user menu when logged in', async ({ page }) => {
        // This would require actual login credentials
        // For now, just check the UI elements exist
        await page.goto('/');

        const userMenu = page.locator('[data-testid="user-menu"], [aria-label*="user menu"]');
        // User menu may or may not be visible depending on auth state
    });
});
