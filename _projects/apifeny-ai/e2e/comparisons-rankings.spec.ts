import { test, expect } from '@playwright/test';

test.describe('AI Directory — Comparison & Rankings Pages', () => {
  test('comparison pages load with structured data', async ({ page }) => {
    const comparePaths = [
      '/compare/chatgpt-vs-claude',
      '/compare/gemini-vs-chatgpt',
      '/compare/github-copilot-vs-cursor',
    ];

    for (const path of comparePaths) {
      await page.goto(path);
      // Page renders
      await expect(page.locator('h1').first()).toBeVisible();
      // Has comparison content
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.length).toBeGreaterThan(100);
      // Has JSON-LD (FAQPage or Product)
      const jsonldScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonldScripts.count();
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });

  test('rankings page loads with tool list', async ({ page }) => {
    await page.goto('/rankings');
    await expect(page.locator('h1').first()).toBeVisible();
    // Should have ranked items
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
    // Should have JSON-LD
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('categories page loads and lists categories', async ({ page }) => {
    await page.goto('/categories');
    await expect(page.locator('h1').first()).toBeVisible();
    // Should have category cards
    const categoryCards = page.locator('a[href*="/categories/"]');
    const count = await categoryCards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('about page has proper content', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('category drill-down page loads tools', async ({ page }) => {
    // Go to categories first, find a category link
    await page.goto('/categories');
    const categoryLink = page.locator('a[href*="/categories/"]').first();
    const href = await categoryLink.getAttribute('href');
    if (!href) return;

    await page.goto(href);
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(50);
  });
});
