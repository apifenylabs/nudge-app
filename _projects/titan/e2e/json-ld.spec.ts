import { test, expect } from "@playwright/test";

test.describe("JSON-LD Structured Data", () => {
  test.describe("Landing Page Schemas", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("WebSite schema exists in layout with correct properties", async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();
      expect(count).toBeGreaterThanOrEqual(1);

      let foundWebSite = false;
      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent();
        if (content && content.includes('"WebSite"')) {
          foundWebSite = true;
          const parsed = JSON.parse(content);
          expect(parsed["@context"]).toBe("https://schema.org");
          expect(parsed["@type"]).toBe("WebSite");
          expect(parsed.name).toBe("Titan");
          expect(parsed.url).toContain("titan");
          break;
        }
      }
      expect(foundWebSite).toBe(true);
    });

    test("WebSite schema has pricing information", async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();

      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent();
        if (content && content.includes('"WebSite"')) {
          const parsed = JSON.parse(content);
          expect(parsed.offers).toBeDefined();
          expect(parsed.offers["@type"]).toBe("AggregateOffer");
          expect(parsed.offers.lowPrice).toBeDefined();
          expect(parsed.offers.highPrice).toBeDefined();
          expect(parsed.offers.priceCurrency).toBe("USD");
          break;
        }
      }
    });
  });

  test.describe("Features Page Schema", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/features");
    });

    test("FAQPage schema exists with expected questions", async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();
      expect(count).toBeGreaterThanOrEqual(1);

      let foundFAQ = false;
      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent();
        if (content && content.includes('"FAQPage"')) {
          foundFAQ = true;
          const parsed = JSON.parse(content);
          expect(parsed["@context"]).toBe("https://schema.org");
          expect(parsed["@type"]).toBe("FAQPage");

          // Check for specific questions
          const questions = parsed.mainEntity.map(
            (e: { name: string }) => e.name
          );
          expect(questions).toContain("Do I need coding experience?");
          expect(questions).toContain("Can I switch plans later?");
          expect(questions).toContain("Is my data private?");
          break;
        }
      }
      expect(foundFAQ).toBe(true);
    });
  });

  test.describe("Robotics Page Schema", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/robotics");
    });

    test("BreadcrumbList schema exists on robotics page", async ({ page }) => {
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();
      expect(count).toBeGreaterThanOrEqual(1);

      let foundBreadcrumb = false;
      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent();
        if (content && content.includes('"BreadcrumbList"')) {
          foundBreadcrumb = true;
          const parsed = JSON.parse(content);
          expect(parsed["@context"]).toBe("https://schema.org");
          expect(parsed["@type"]).toBe("BreadcrumbList");

          const items = parsed.itemListElement;
          expect(items.length).toBeGreaterThanOrEqual(2);

          // First item: Home
          expect(items[0].position).toBe(1);
          expect(items[0].name).toBe("Home");
          expect(items[0].item).toContain("/");

          // Second item: Robotics
          expect(items[1].position).toBe(2);
          expect(items[1].name).toBe("Robotics");
          expect(items[1].item).toContain("/robotics");
          break;
        }
      }
      expect(foundBreadcrumb).toBe(true);
    });
  });

  test.describe("All Pages Carry WebSite Schema", () => {
    test("WebSite schema present on features page", async ({ page }) => {
      await page.goto("/features");
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent();
        if (content && content.includes('"WebSite"')) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });

    test("WebSite schema present on robotics page", async ({ page }) => {
      await page.goto("/robotics");
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();
      let found = false;
      for (let i = 0; i < count; i++) {
        const content = await scripts.nth(i).textContent();
        if (content && content.includes('"WebSite"')) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });
  });
});
