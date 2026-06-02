import { test, expect } from '@playwright/test';

test.describe('AI Directory — Tool Detail Pages', () => {
  test('tools directory page loads', async ({ page }) => {
    await page.goto('/tools');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('individual tool detail page loads', async ({ page }) => {
    await page.goto('/tools/chatgpt');
    await expect(page.locator('h1').first()).toBeVisible();
    const bodyText = await page.locator('body').innerText();
    expect(bodyText.length).toBeGreaterThan(200);
  });

  test('tool detail page has JSON-LD schema', async ({ page }) => {
    await page.goto('/tools/chatgpt');
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Check for SoftwareApplication type
    let hasSoftwareSchema = false;
    for (let i = 0; i < count; i++) {
      const text = await jsonldScripts.nth(i).innerText();
      if (text.includes('SoftwareApplication') || text.includes('WebApplication') || text.includes('Product')) {
        hasSoftwareSchema = true;
        break;
      }
    }
    expect(hasSoftwareSchema).toBe(true);
  });

  test('related tools section renders on tool detail page', async ({ page }) => {
    await page.goto('/tools/chatgpt');
    // Wait for page content to load
    await page.waitForLoadState('networkidle');

    // Check for related tools links
    const relatedLinks = page.locator('a[href*="/tools/"]');

    // There should be multiple tool links (at least 2: self + related)
    // But filter out self-link to /tools/chatgpt
    const allHrefs = await relatedLinks.evaluateAll((links) =>
      links.map((l) => (l as HTMLAnchorElement).getAttribute('href'))
    );
    const otherToolLinks = allHrefs.filter((href) => href && href !== '/tools/chatgpt' && href !== '/tools');
    expect(otherToolLinks.length).toBeGreaterThanOrEqual(1);
  });

  test('multiple tool detail pages load successfully', async ({ page }) => {
    const toolPaths = [
      '/tools/gemini',
      '/tools/claude',
      '/tools/cursor',
    ];

    for (const path of toolPaths) {
      await page.goto(path);
      await expect(page.locator('h1').first()).toBeVisible();
      const bodyText = await page.locator('body').innerText();
      expect(bodyText.length).toBeGreaterThan(200);
    }
  });

  test('tool detail has BreadcrumbList schema', async ({ page }) => {
    await page.goto('/tools/claude');
    const jsonldScripts = page.locator('script[type="application/ld+json"]');
    const count = await jsonldScripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    let hasBreadcrumb = false;
    for (let i = 0; i < count; i++) {
      const text = await jsonldScripts.nth(i).innerText();
      if (text.includes('BreadcrumbList')) {
        hasBreadcrumb = true;
        break;
      }
    }
    expect(hasBreadcrumb).toBe(true);
  });
});
