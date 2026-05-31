import { test, expect } from '@playwright/test';

test.describe('AI Directory — Homepage', () => {
  test('loads and renders key sections', async ({ page }) => {
    await page.goto('/');

    // Hero section loads with main heading
    await expect(page.locator('h1').first()).toBeVisible();

    // At least one footer exists (some layouts have multiple)
    await expect(page.locator('footer').first()).toBeVisible();
  });

  test('has working blog link', async ({ page }) => {
    await page.goto('/');
    const blogLink = page.locator('a[href*="/blog"]').first();
    await expect(blogLink).toBeVisible();

    // Navigate to blog
    await blogLink.click();
    await expect(page).toHaveURL(/\/blog/);
  });

  test('page has JSON-LD structured data', async ({ page }) => {
    await page.goto('/');
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});
