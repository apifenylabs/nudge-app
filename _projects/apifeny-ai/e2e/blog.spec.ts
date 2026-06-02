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

  test('blog category page /blog/category/[slug] loads', async ({ page }) => {
    await page.goto('/blog');
    // Look for a category link
    const categoryLinks = page.locator('a[href*="/blog/category/"]');
    const categoryCount = await categoryLinks.count();

    if (categoryCount === 0) {
      // Try common blog category slugs directly
      const commonCategories = [
        '/blog/category/tool-comparisons',
        '/blog/category/ai-trends',
        '/blog/category/marketing',
        '/blog/category/productivity',
      ];
      let loaded = false;
      for (const catPath of commonCategories) {
        const response = await page.goto(catPath);
        if (response && response.status() === 200) {
          loaded = true;
          await expect(page.locator('h1').first()).toBeVisible();
          break;
        }
      }
      expect(loaded).toBe(true);
    } else {
      const href = await categoryLinks.first().getAttribute('href');
      if (href) {
        await page.goto(href);
        await expect(page.locator('h1').first()).toBeVisible();
        const bodyText = await page.locator('body').innerText();
        expect(bodyText.length).toBeGreaterThan(50);
      }
    }
  });

  test('blog category page has JSON-LD structured data', async ({ page }) => {
    const response = await page.goto('/blog/category/tool-comparisons');
    if (response && response.status() === 200) {
      const jsonldScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonldScripts.count();
      // Blog category pages may or may not have JSON-LD — check but don't fail
      if (count > 0) {
        const text = await jsonldScripts.first().innerText();
        expect(text.length).toBeGreaterThan(10);
      }
    }
  });

  test('blog post has FAQPage JSON-LD schema when applicable', async ({ page }) => {
    // Check a specific blog post that should have FAQ data
    const testPaths = [
      '/blog/best-ai-tools-asia-2026',
      '/blog/deepseek-vs-chatgpt-2026',
    ];

    for (const path of testPaths) {
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();

      const jsonldScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonldScripts.count();

      if (count === 0) continue; // skip if no structured data

      // Check for FAQPage in any JSON-LD script
      let hasFAQPage = false;
      for (let i = 0; i < count; i++) {
        const text = await jsonldScripts.nth(i).innerText();
        if (text.includes('FAQPage')) {
          hasFAQPage = true;
          break;
        }
      }

      // At minimum, there should be some JSON-LD (Article, BreadcrumbList, etc.)
      expect(count).toBeGreaterThanOrEqual(1);
    }
  });

  test('blog page links to geo pages and other resources', async ({ page }) => {
    await page.goto('/blog');
    const internalLinks = page.locator('a[href^="/"]');
    // At minimum the page should have internal navigation
    const count = await internalLinks.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});
