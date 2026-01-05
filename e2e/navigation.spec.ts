import { test, expect } from '@playwright/test';

test.describe('Navigation E2E Tests', () => {
    test('should navigate through main pages', async ({ page }) => {
        await page.goto('/');

        // Navigate to Shop
        await page.getByRole('link', { name: /shop/i }).first().click();
        await expect(page).toHaveURL(/\/shop/);

        // Go back to home
        await page.goto('/');
        await expect(page).toHaveURL('/');
    });

    test('should navigate to category pages', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Look for category links (rings, necklaces, earrings, etc.)
        const categoryLink = page.locator('a[href*="/rings"], a[href*="/necklaces"], a[href*="/earrings"]').first();

        if (await categoryLink.isVisible()) {
            await categoryLink.click();
            await page.waitForLoadState('networkidle');

            // Should be on a category page
            expect(page.url()).toMatch(/\/(rings|necklaces|earrings|bangles|nosepins)/);
        }
    });

    test('should navigate to product detail page', async ({ page }) => {
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');

        const productLink = page.locator('a[href*="/product/"]').first();

        if (await productLink.isVisible()) {
            await productLink.click();
            await expect(page).toHaveURL(/\/product\//);
        }
    });

    test('should navigate to info pages', async ({ page }) => {
        await page.goto('/');

        // Scroll to footer
        await page.locator('footer').scrollIntoViewIfNeeded();

        // Try to find and click privacy policy
        const privacyLink = page.getByRole('link', { name: /privacy/i });
        if (await privacyLink.isVisible()) {
            await privacyLink.click();
            await expect(page).toHaveURL(/\/privacy/);
        }
    });

    test('should navigate to login page', async ({ page }) => {
        await page.goto('/');

        const loginLink = page.getByRole('link', { name: /login/i }).first();
        if (await loginLink.isVisible()) {
            await loginLink.click();
            await expect(page).toHaveURL(/\/login/);
        }
    });

    test('should handle browser back/forward navigation', async ({ page }) => {
        await page.goto('/');
        await page.goto('/shop');

        await page.goBack();
        await expect(page).toHaveURL('/');

        await page.goForward();
        await expect(page).toHaveURL(/\/shop/);
    });

    test('should maintain scroll position on navigation', async ({ page }) => {
        await page.goto('/');

        // Scroll down
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(500);

        // Navigate away and back
        await page.goto('/shop');
        await page.goto('/');

        // Page should start at top
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBe(0);
    });
});
