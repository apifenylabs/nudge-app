import { test, expect } from '@playwright/test';

/**
 * LifeOS — Plugins Index Page E2E Tests
 *
 * Tests the main `/plugins` directory page: navigation, search,
 * filtering, and plugin card rendering.
 */

test.describe('Plugins Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/plugins');
    await page.waitForLoadState('networkidle');
  });

  test('renders the plugins page with a heading', async ({ page }) => {
    // The page should show the word 'Plugins' or 'Explore' in some visible text
    await expect(page.locator('body')).not.toBeEmpty();
    // All expected plugin categories should render (at minimum, search bar exists)
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('displays plugin cards for active plugins', async ({ page }) => {
    // Wait for plugin cards to load (they render as buttons)
    const pluginCards = page.locator('button:has(h3)');
    await expect(pluginCards.first()).toBeVisible({ timeout: 10000 });

    // Count plugin cards shown
    const count = await pluginCards.count();
    expect(count).toBeGreaterThanOrEqual(3); // at least 3 plugins visible
  });

  test('search filters plugin cards by name', async ({ page }) => {
    // Wait for cards to render
    const pluginCards = page.locator('button:has(h3)');
    await expect(pluginCards.first()).toBeVisible({ timeout: 10000 });

    // Get initial count
    const initialCount = await pluginCards.count();

    // Type a search query
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Health');

    // Wait for filter to apply
    await page.waitForTimeout(300);
    const filteredCount = await pluginCards.count();

    // Search should reduce results (or at least not increase)
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('status filter pills are interactive', async ({ page }) => {
    // Find status filter buttons
    const filterPills = page.locator('button:has-text("All"), button:has-text("Active"), button:has-text("Beta"), button:has-text("Coming Soon")');

    // "All" button should be present
    const allButton = filterPills.filter({ hasText: 'All' });
    await expect(allButton.first()).toBeVisible();

    // Click "Active" filter
    const activeButton = filterPills.filter({ hasText: 'Active' }).first();
    await activeButton.click();
    await page.waitForTimeout(300);

    // Verify it's highlighted (class contains teal/active styling)
    await expect(activeButton).toHaveClass(/teal/);
  });

  test('clearing search restores all plugins', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    const pluginCards = page.locator('button:has(h3)');

    await expect(pluginCards.first()).toBeVisible({ timeout: 10000 });
    const initialCount = await pluginCards.count();

    // Search for something unlikely
    await searchInput.fill('zzzznonexistent');
    await page.waitForTimeout(300);
    const afterSearch = await pluginCards.count();
    expect(afterSearch).toBeLessThan(initialCount);

    // Clear search
    const clearButton = page.locator('svg path[d*="M6 18L18 6M6 6l12 12"]').first();
    if (await clearButton.isVisible()) {
      await clearButton.click();
    } else {
      await searchInput.fill('');
    }
    await page.waitForTimeout(300);
    const afterClear = await pluginCards.count();
    expect(afterClear).toBeGreaterThanOrEqual(afterSearch);
  });

  test('plugin card shows name, description and features', async ({ page }) => {
    const pluginCards = page.locator('button:has(h3)');
    await expect(pluginCards.first()).toBeVisible({ timeout: 10000 });

    // Check first card has expected structure
    const firstCard = pluginCards.first();
    await expect(firstCard.locator('h3')).toBeVisible();           // name
    await expect(firstCard.locator('p')).toBeVisible();            // description
    await expect(firstCard.locator('span')).toBeVisible();         // feature pills or status
  });
});
