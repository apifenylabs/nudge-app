import { test, expect } from '@playwright/test';

test.describe('AI Directory — Geo pages', () => {
  test('geo landing page loads and has content', async ({ page }) => {
    // Test a few representative geo pages
    const geoPaths = [
      '/ai-tools-singapore',
      '/ai-tools-japan',
      '/ai-tools-germany',
    ];

    for (const path of geoPaths) {
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
      // Check that there's some page content beyond just the heading
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.length).toBeGreaterThan(100);
    }
  });

  test('geo page contains country-specific keyword', async ({ page }) => {
    await page.goto('/ai-tools-singapore');
    await expect(page.locator('h1').first()).toContainText(/Singapore/i);

    await page.goto('/ai-tools-japan');
    await expect(page.locator('h1').first()).toContainText(/Japan/i);
  });

  test('geo page links to related content', async ({ page }) => {
    await page.goto('/ai-tools-singapore');
    // Should have links to playbooks or other pages
    const internalLinks = page.locator('a[href^="/"]');
    const count = await internalLinks.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});
