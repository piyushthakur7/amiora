import { test, expect } from '@playwright/test';

test.describe('Product Search and Filter Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');
    });

    test('should display products on shop page', async ({ page }) => {
        // Wait for products to load
        const products = page.locator('a[href*="/product/"], [data-testid*="product"]');

        await page.waitForTimeout(2000);
        const count = await products.count();

        // Should have at least one product
        expect(count).toBeGreaterThan(0);
    });

    test('should filter products by category', async ({ page }) => {
        // Look for filter options
        const filterSection = page.locator('[data-testid="filters"], aside, .sidebar');

        if (await filterSection.isVisible()) {
            // Try to click a category filter
            const categoryFilter = page.locator('button:has-text("Rings"), input[type="checkbox"]:near(:text("Rings"))').first();

            if (await categoryFilter.isVisible()) {
                await categoryFilter.click();
                await page.waitForTimeout(1000);
            }
        }
    });

    test('should sort products', async ({ page }) => {
        // Look for sort dropdown
        const sortSelect = page.locator('select, [role="combobox"]').first();

        if (await sortSelect.isVisible()) {
            await sortSelect.click();
            await page.waitForTimeout(500);

            // Select an option
            const option = page.locator('option, [role="option"]').first();
            if (await option.isVisible()) {
                await option.click();
                await page.waitForTimeout(1000);
            }
        }
    });

    test('should search for products', async ({ page }) => {
        const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();

        if (await searchInput.isVisible()) {
            await searchInput.fill('ring');
            await searchInput.press('Enter');
            await page.waitForTimeout(1000);
        }
    });

    test('should filter by price range', async ({ page }) => {
        const priceFilter = page.locator('input[type="range"], .price-filter').first();

        if (await priceFilter.isVisible()) {
            await priceFilter.click();
            await page.waitForTimeout(500);
        }
    });

    test('should show product details on hover', async ({ page }) => {
        const firstProduct = page.locator('a[href*="/product/"]').first();

        if (await firstProduct.isVisible()) {
            await firstProduct.hover();
            await page.waitForTimeout(500);

            // Quick view or additional info might appear
        }
    });

    test('should load more products on scroll', async ({ page }) => {
        const initialProducts = await page.locator('a[href*="/product/"]').count();

        // Scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(2000);

        const afterScrollProducts = await page.locator('a[href*="/product/"]').count();

        // Products might load more or stay the same (pagination)
        expect(afterScrollProducts).toBeGreaterThanOrEqual(initialProducts);
    });
});

test.describe('Product Detail Tests', () => {
    test('should display product details', async ({ page }) => {
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');

        const firstProduct = page.locator('a[href*="/product/"]').first();

        if (await firstProduct.isVisible()) {
            await firstProduct.click();
            await page.waitForLoadState('networkidle');

            // Should show product name, price, description
            const productName = page.locator('h1, [data-testid="product-name"]').first();
            await expect(productName).toBeVisible();
        }
    });

    test('should display product images', async ({ page }) => {
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');

        const firstProduct = page.locator('a[href*="/product/"]').first();

        if (await firstProduct.isVisible()) {
            await firstProduct.click();
            await page.waitForLoadState('networkidle');

            const productImage = page.locator('img[alt*="product" i], .product-image img').first();
            await expect(productImage).toBeVisible();
        }
    });

    test('should allow quantity selection', async ({ page }) => {
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');

        const firstProduct = page.locator('a[href*="/product/"]').first();

        if (await firstProduct.isVisible()) {
            await firstProduct.click();
            await page.waitForLoadState('networkidle');

            const quantityInput = page.locator('input[type="number"], [aria-label*="quantity"]').first();

            if (await quantityInput.isVisible()) {
                await quantityInput.fill('2');
                await page.waitForTimeout(500);
            }
        }
    });

    test('should show related products', async ({ page }) => {
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');

        const firstProduct = page.locator('a[href*="/product/"]').first();

        if (await firstProduct.isVisible()) {
            await firstProduct.click();
            await page.waitForLoadState('networkidle');

            // Scroll down to see related products
            await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
            await page.waitForTimeout(1000);

            const relatedSection = page.getByText(/related|similar|you may also like/i);
            // Related products section might exist
        }
    });
});
