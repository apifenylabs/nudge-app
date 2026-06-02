import { test, expect } from '@playwright/test';

/**
 * LifeOS — Homepage Chat Flow E2E Tests
 *
 * Tests the main entry page: plugin grid, free chat input,
 * plugin selection, and basic conversation flow.
 */

test.describe('Homepage Chat Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('homepage renders with plugin grid', async ({ page }) => {
    // Hero section
    await expect(page.locator('text=LifeOS').first()).toBeVisible();

    // Free chat section should be visible
    await expect(page.locator('text=Free Chat')).toBeVisible();

    // Either plugin cards or loading skeleton
    const pluginCards = page.locator('button:has(h3)');
    const skeleton = page.locator('.animate-pulse');
    const hasCards = (await pluginCards.count()) > 0;
    const hasSkeleton = (await skeleton.count()) > 0;
    expect(hasCards || hasSkeleton).toBeTruthy();
  });

  test('free chat input accepts text and sends message', async ({ page }) => {
    // Find the free chat input (not the general search bar)
    const freeChatInput = page.locator('input[placeholder*="plan a trip"]');
    await expect(freeChatInput).toBeVisible();

    // Type a message
    await freeChatInput.fill('Help me plan a trip to Japan');
    await page.locator('button:has-text("Chat")').click();

    // Should transition to chat view — wait for messages
    await page.waitForTimeout(2000);

    // Chat view should show the user message
    const userMessages = page.locator('text=Help me plan a trip to Japan');
    await expect(userMessages.first()).toBeVisible({ timeout: 15000 });

    // Should have a session ID set (chat started)
    const messageBubbles = page.locator('.rounded-2xl');
    await expect(messageBubbles.first()).toBeVisible();
  });

  test('plugin card click opens chat with plugin context', async ({ page }) => {
    // Wait for plugin cards
    const pluginCards = page.locator('button:has(h3)');
    await expect(pluginCards.first()).toBeVisible({ timeout: 10000 });

    // Skip if no active/beta plugins available
    const activeCard = pluginCards.filter({ hasText: 'Active' }).or(pluginCards.filter({ hasText: 'Beta' }));
    const cardCount = await activeCard.count();
    test.skip(cardCount === 0, 'No selectable plugins found');

    // Click the first selectable plugin card
    const firstSelectable = activeCard.first();
    const pluginName = await firstSelectable.locator('h3').textContent();
    await firstSelectable.click();

    // Should show chat view with the plugin name in header
    await page.waitForTimeout(1000);
    if (pluginName) {
      await expect(page.locator(`text=${pluginName}`).first()).toBeVisible({ timeout: 10000 });
    }

    // Chat input should be present
    const chatInput = page.locator('textarea[placeholder*="Ask"]');
    await expect(chatInput).toBeVisible();

    // Should have sent a greeting message
    const greeting = page.locator(`text=I'd like to start with`);
    await expect(greeting.first()).toBeVisible({ timeout: 15000 });
  });

  test('conversation history sidebar opens and closes', async ({ page }) => {
    // Open history sidebar
    const historyButton = page.locator('button:has-text("conversations")');
    await expect(historyButton).toBeVisible();
    await historyButton.click();

    // Sidebar should be visible
    await expect(page.locator('text=Conversations')).toBeVisible();
    await expect(page.locator('text=New conversation')).toBeVisible();

    // Close by clicking backdrop
    const backdrop = page.locator('.fixed.inset-0.bg-black\\/20');
    if (await backdrop.isVisible()) {
      await backdrop.click({ force: true });
    } else {
      // Close via X button
      await page.locator('svg path[d*="M6 18L18 6M6 6l12 12"]').first().click();
    }

    // Sidebar should be gone
    await expect(page.locator('text=Conversations')).not.toBeVisible();
  });

  test('analytics and quick-actions links work', async ({ page }) => {
    // Quick Actions link
    const quickActionsLink = page.locator('a[href="/quick-actions"]');
    await expect(quickActionsLink).toBeVisible();

    // Analytics link
    const analyticsLink = page.locator('a[href="/analytics"]');
    await expect(analyticsLink).toBeVisible();
  });
});
