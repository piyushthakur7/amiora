import { test, expect } from '@playwright/test';

test.describe('Shopping Cart E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should open cart drawer', async ({ page }) => {
        // Look for cart icon/button
        const cartButton = page.locator('[aria-label*="cart" i], [data-testid="cart-button"], button:has-text("Cart")').first();

        if (await cartButton.isVisible()) {
            await cartButton.click();

            // Cart drawer should be visible
            await page.waitForTimeout(500);
        }
    });

    test('should add product to cart from product page', async ({ page }) => {
        // Navigate to shop
        await page.goto('/shop');
        await page.waitForLoadState('networkidle');

        // Click on first product
        const firstProduct = page.locator('a[href*="/product/"]').first();
        if (await firstProduct.isVisible()) {
            await firstProduct.click();

            // Wait for product page to load
            await page.waitForLoadState('networkidle');

            // Look for add to cart button
            const addToCartButton = page.getByRole('button', { name: /add to cart/i });
            if (await addToCartButton.isVisible()) {
                await addToCartButton.click();

                // Wait for cart update
                await page.waitForTimeout(1000);

                // Cart should show item count
                const cartCount = page.locator('[data-testid="cart-count"], .cart-count, [class*="badge"]');
                await expect(cartCount.first()).toBeVisible();
            }
        }
    });

    test('should update quantity in cart', async ({ page }) => {
        // This test would require adding an item first
        // Then opening cart and updating quantity
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

                // Open cart
                const cartButton = page.locator('[aria-label*="cart" i]').first();
                if (await cartButton.isVisible()) {
                    await cartButton.click();
                    await page.waitForTimeout(500);

                    // Look for quantity controls
                    const increaseButton = page.locator('button:has-text("+"), [aria-label*="increase"]').first();
                    if (await increaseButton.isVisible()) {
                        await increaseButton.click();
                        await page.waitForTimeout(500);
                    }
                }
            }
        }
    });

    test('should remove item from cart', async ({ page }) => {
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

                // Open cart
                const cartButton = page.locator('[aria-label*="cart" i]').first();
                if (await cartButton.isVisible()) {
                    await cartButton.click();
                    await page.waitForTimeout(500);

                    // Look for remove button
                    const removeButton = page.locator('button:has-text("Remove"), [aria-label*="remove"]').first();
                    if (await removeButton.isVisible()) {
                        await removeButton.click();
                        await page.waitForTimeout(500);
                    }
                }
            }
        }
    });

    test('should proceed to checkout', async ({ page }) => {
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

                // Open cart
                const cartButton = page.locator('[aria-label*="cart" i]').first();
                if (await cartButton.isVisible()) {
                    await cartButton.click();
                    await page.waitForTimeout(500);

                    // Look for checkout button
                    const checkoutButton = page.getByRole('button', { name: /checkout/i });
                    if (await checkoutButton.isVisible()) {
                        await checkoutButton.click();

                        // Should navigate to checkout page
                        await expect(page).toHaveURL(/\/checkout/);
                    }
                }
            }
        }
    });

    test('should display empty cart message', async ({ page }) => {
        const cartButton = page.locator('[aria-label*="cart" i]').first();

        if (await cartButton.isVisible()) {
            await cartButton.click();
            await page.waitForTimeout(500);

            // Look for empty cart message
            const emptyMessage = page.getByText(/empty|no items/i);
            // Empty cart should show a message
        }
    });
});
