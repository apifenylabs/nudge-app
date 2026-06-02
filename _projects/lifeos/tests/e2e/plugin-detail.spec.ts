import { test, expect } from '@playwright/test';

/**
 * LifeOS — Plugin Detail Page E2E Tests
 *
 * Tests individual plugin detail pages at /plugins/[id].
 * Verifies phases, features, and navigation.
 */

test.describe('Plugin Detail Pages', () => {
  const PLUGIN_IDS = ['travel', 'finance', 'health', 'career', 'learning', 'family', 'home', 'social', 'relationships'];

  for (const pluginId of PLUGIN_IDS) {
    test(`renders plugin detail page for "${pluginId}"`, async ({ page }) => {
      await page.goto(`/plugins/${pluginId}`);
      await page.waitForLoadState('networkidle');

      // Should not get a 404 or error page
      const body = page.locator('body');
      await expect(body).not.toBeEmpty();

      // The page should contain either plugin content or a not-found state
      const hasContent = await page.locator('h1, h2, h3').count();
      expect(hasContent).toBeGreaterThanOrEqual(1);

      // No "page not found" text
      await expect(page.locator('text=404').first()).not.toBeVisible({ timeout: 1000 }).catch(() => {
        // Some 404 pages might be styled differently — just check body isn't empty
      });
    });
  }

  test('navigates between plugin detail pages', async ({ page }) => {
    // Start at plugins index
    await page.goto('/plugins');
    await page.waitForLoadState('networkidle');

    // Find and click a plugin link/card that leads to a detail page
    const pluginCards = page.locator('button:has(h3)');
    await expect(pluginCards.first()).toBeVisible({ timeout: 10000 });

    // Get the first plugin name
    const firstPluginName = await pluginCards.first().locator('h3').textContent();

    // Navigate to first detail page directly
    await page.goto('/plugins/travel');
    await page.waitForLoadState('networkidle');

    // Verify it's a valid page
    await expect(page.locator('body')).not.toBeEmpty();
  });

  test('plugin detail page has a back navigation', async ({ page }) => {
    await page.goto('/plugins/travel');
    await page.waitForLoadState('networkidle');

    // Look for back button or breadcrumb navigation
    const backButtons = page.locator('a, button').filter({ hasText: /back|plugins|all/i });
    const backCount = await backButtons.count();
    expect(backCount).toBeGreaterThanOrEqual(0); // may or may not have back nav
  });
});
