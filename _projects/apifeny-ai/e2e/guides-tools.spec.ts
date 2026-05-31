import { test, expect } from '@playwright/test';

test.describe('AI Directory — Guides & Tools Pages', () => {
  test('guides index page loads and has content', async ({ page }) => {
    await page.goto('/guides');
    await expect(page.locator('h1').first()).toBeVisible();
    // Page has meaningful content
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('guide detail page loads with content', async ({ page }) => {
    await page.goto('/guides/ai-tools-for-marketing');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(300);
    // Should have JSON-LD structured data
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('tools directory page loads with tool listing', async ({ page }) => {
    await page.goto('/tools');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
    // Should have JSON-LD
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('success-stories page loads', async ({ page }) => {
    await page.goto('/success-stories');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });
});
