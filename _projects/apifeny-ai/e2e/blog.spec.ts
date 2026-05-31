import { test, expect } from '@playwright/test';

test.describe('AI Directory — Blog Pages', () => {
  test('blog index page loads', async ({ page }) => {
    await page.goto('/blog');

    // Blog page has content
    await expect(page.locator('body')).not.toBeEmpty();

    // At least one article link exists
    const articleLinks = page.locator('a[href*="/blog/"]');
    const count = await articleLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Navigate to first article
    const firstArticle = articleLinks.first();
    const href = await firstArticle.getAttribute('href');
    await firstArticle.click();
    await expect(page).toHaveURL(new RegExp(href || '/blog/'));
  });

  test('blog post has JSON-LD structured data', async ({ page }) => {
    await page.goto('/blog');
    const articleLinks = page.locator('a[href*="/blog/"]');
    const count = await articleLinks.count();
    if (count === 0) return; // skip if no blog posts visible

    const href = await articleLinks.first().getAttribute('href');
    if (!href) return;
    await page.goto(href);

    // Check for JSON-LD script tags
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const scriptCount = await jsonldScripts.count();
    expect(scriptCount).toBeGreaterThanOrEqual(1);
  });
});
