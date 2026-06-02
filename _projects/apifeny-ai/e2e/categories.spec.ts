import { test, expect } from '@playwright/test';

test.describe('AI Directory — Category Pages', () => {
  test('/categories page loads with category listings', async ({ page }) => {
    await page.goto('/categories');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('/categories page has links to individual categories', async ({ page }) => {
    await page.goto('/categories');
    const categoryLinks = page.locator('a[href*="/categories/"]');
    const count = await categoryLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('category detail page loads with content', async ({ page }) => {
    await page.goto('/categories/writing-content');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(100);
  });

  test('category detail page has JSON-LD structured data', async ({ page }) => {
    await page.goto('/categories/writing-content');
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('multiple category detail pages load', async ({ page }) => {
    const categoryPaths = [
      '/categories/chatbots',
      '/categories/coding-assistants',
      '/categories/marketing',
    ];

    for (const path of categoryPaths) {
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });

  test('category detail nav from categories index', async ({ page }) => {
    await page.goto('/categories');
    const categoryLink = page.locator('a[href*="/categories/"]').first();
    const href = await categoryLink.getAttribute('href');
    expect(href).toBeTruthy();

    if (href) {
      await page.goto(href);
      await expect(page.locator('h1').first()).toBeVisible();
    }
  });
});
