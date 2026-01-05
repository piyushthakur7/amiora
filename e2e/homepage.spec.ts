import { test, expect } from '@playwright/test';

test.describe('Homepage E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should load homepage successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/Amiora Diamonds/i);
    });

    test('should display header with logo and navigation', async ({ page }) => {
        // Check for logo
        const logo = page.getByText(/Amiora/i).first();
        await expect(logo).toBeVisible();

        // Check for navigation
        const shopLink = page.getByRole('link', { name: /shop/i }).first();
        await expect(shopLink).toBeVisible();
    });

    test('should display hero section', async ({ page }) => {
        // Wait for hero section to be visible
        const hero = page.locator('section').first();
        await expect(hero).toBeVisible();
    });

    test('should display category grid', async ({ page }) => {
        // Look for category links or headings
        await page.waitForLoadState('networkidle');

        const categories = page.locator('[data-testid="category-grid"], .category-grid, section').nth(1);
        await expect(categories).toBeVisible();
    });

    test('should display new arrivals section', async ({ page }) => {
        const newArrivals = page.getByText(/New Arrivals/i);
        await expect(newArrivals).toBeVisible();
    });

    test('should display best sellers section', async ({ page }) => {
        const bestSellers = page.getByText(/Most Loved/i);
        await expect(bestSellers).toBeVisible();
    });

    test('should display footer', async ({ page }) => {
        const footer = page.locator('footer');
        await expect(footer).toBeVisible();

        // Check for copyright
        const currentYear = new Date().getFullYear();
        const copyright = page.getByText(new RegExp(currentYear.toString()));
        await expect(copyright).toBeVisible();
    });

    test('should navigate to shop page', async ({ page }) => {
        await page.getByRole('link', { name: /shop/i }).first().click();
        await expect(page).toHaveURL(/\/shop/);
    });

    test('should be responsive on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });

        const logo = page.getByText(/Amiora/i).first();
        await expect(logo).toBeVisible();
    });

    test('should load images', async ({ page }) => {
        await page.waitForLoadState('networkidle');

        const images = page.locator('img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);

        // Check first image loads
        if (count > 0) {
            await expect(images.first()).toBeVisible();
        }
    });
});
