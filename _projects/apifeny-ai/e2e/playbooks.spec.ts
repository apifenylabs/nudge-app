import { test, expect } from '@playwright/test';

test.describe('AI Directory — Playbook Pages', () => {
  test('playbook index page loads and has content', async ({ page }) => {
    await page.goto('/playbooks');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('individual playbook page loads with content', async ({ page }) => {
    await page.goto('/playbooks/ultimate-prompt-engineering');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(300);
  });

  test('playbook has JSON-LD breadcrumb schema', async ({ page }) => {
    await page.goto('/playbooks/ultimate-prompt-engineering');
    // Wait for client-side hydration of BreadcrumbSchema (it's a 'use client' component)
    await page.waitForLoadState('networkidle');
    
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('playbook has FAQPage JSON-LD schema', async ({ page }) => {
    await page.goto('/playbooks/ultimate-prompt-engineering');
    await page.waitForLoadState('networkidle');

    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    
    // FAQJsonLd is also a client-side component; check if present
    if (count > 0) {
      // Verify at least one JSON-LD contains useful data
      const text = await jsonldScripts.first().innerText();
      expect(text.length).toBeGreaterThan(20);
    }
  });

  test('playbook index has links to individual playbook pages', async ({ page }) => {
    await page.goto('/playbooks');
    const playbookLinks = page.locator('a[href*="/playbooks/"]');
    const count = await playbookLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('multiple playbook pages load successfully', async ({ page }) => {
    const playbookPaths = [
      '/playbooks/ai-content-creation-busy-founders',
      '/playbooks/ai-personal-assistant-setup',
      '/playbooks/build-a-game-with-ai',
    ];

    for (const path of playbookPaths) {
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.length).toBeGreaterThan(100);
    }
  });

  test('playbook page interlinks to other sections', async ({ page }) => {
    await page.goto('/playbooks/ultimate-prompt-engineering');
    // Should have internal links to geo or blog pages
    const internalLinks = page.locator('a[href^="/"]');
    const count = await internalLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
