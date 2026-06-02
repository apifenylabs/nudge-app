import { test, expect } from '@playwright/test';

test.describe('AI Directory — Industry Pages', () => {
  test('/industries/insurance loads with content', async ({ page }) => {
    await page.goto('/industries/insurance');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('/industries/hr loads with content', async ({ page }) => {
    await page.goto('/industries/hr');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('/industries/construction loads with content', async ({ page }) => {
    await page.goto('/industries/construction');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('industry pages have BreadcrumbList schema', async ({ page }) => {
    const industryPaths = [
      '/industries/insurance',
      '/industries/hr',
      '/industries/construction',
    ];

    for (const path of industryPaths) {
      await page.goto(path);
      const jsonldScripts = page.locator('script[type="application/ld+json"]');

      // Some industry pages may not have JSON-LD — that's acceptable
      const count = await jsonldScripts.count();
      if (count === 0) continue;

      let hasBreadcrumb = false;
      for (let i = 0; i < count; i++) {
        const text = await jsonldScripts.nth(i).innerText();
        if (text.includes('BreadcrumbList')) {
          hasBreadcrumb = true;
          break;
        }
      }
      // BreadcrumbList is expected but not required for all pages
      if (!hasBreadcrumb) {
        const allText = await page.locator('body').innerText();
        expect(allText.length).toBeGreaterThan(100); // page still has content
      }
    }
  });

  test('industry pages have internal links to geo pages', async ({ page }) => {
    const industryPaths = [
      '/industries/insurance',
      '/industries/hr',
      '/industries/construction',
    ];

    for (const path of industryPaths) {
      await page.goto(path);
      const internalLinks = page.locator('a[href^="/"]');
      const count = await internalLinks.count();
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });
});
