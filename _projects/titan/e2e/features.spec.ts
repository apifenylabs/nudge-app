import { test, expect } from "@playwright/test";

test.describe("Titan Features Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/features", { waitUntil: "load" });
  });

  test("features page loads with correct heading and meta", async ({ page }) => {
    // Layout-level title (server-rendered)
    await expect(page).toHaveTitle(/Titan/);

    // Main hero heading
    await expect(
      page.getByRole("heading", { name: /Agents Unstoppable/i, level: 1 })
    ).toBeVisible({ timeout: 10000 });

    // Subtitle / tagline
    await expect(
      page.getByText(/visual agent building|multi-agent orchestration/i)
    ).toBeVisible();
  });

  test("stats bar renders with key metrics", async ({ page }) => {
    // Check stat labels
    await expect(page.getByText("Active Agents")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Tasks Executed")).toBeVisible();
    await expect(page.getByText("Avg. Uptime")).toBeVisible();
    await expect(page.getByText("Community Rank")).toBeVisible();

    // Check stat values
    await expect(page.getByText("12,000+")).toBeVisible();
    await expect(page.getByText("850K+")).toBeVisible();
    await expect(page.getByText("99.97%")).toBeVisible();
  });

  test("all six feature categories render with headings", async ({ page }) => {
    const categories = [
      "Agent Builder",
      "Progression System",
      "Orchestration",
      "Deployment",
      "Memory & Context",
      "Monetization",
    ];

    for (const category of categories) {
      await expect(
        page.getByRole("heading", { name: category, level: 2 })
      ).toBeVisible({ timeout: 5000 });
    }
  });

  test("key individual features are visible", async ({ page }) => {
    const keyFeatures = [
      "Visual Agent Studio",
      "Skill Trees",
      "Multi-Agent Teams",
      "One-Click Deploy",
      "Persistent Memory",
      "Agent Marketplace",
    ];

    for (const feature of keyFeatures) {
      await expect(
        page.getByRole("heading", { name: feature, level: 4 })
      ).toBeVisible({ timeout: 5000 });
    }
  });

  test("faq section renders with questions", async ({ page }) => {
    const faqs = [
      "Do I need coding experience?",
      "Can I switch plans later?",
      "What AI models power the agents?",
      "Is my data private?",
      "Can I build agents for my business?",
    ];

    for (const faq of faqs) {
      await expect(page.getByText(faq)).toBeVisible({ timeout: 5000 });
    }
  });

  test("progression path tier cards render", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Novice" })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("heading", { name: "Hunter" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sovereign" })).toBeVisible();
  });

  test("cta section has get started and explore robotics buttons", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /get started free/i })
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByRole("link", { name: /explore robotics/i })
    ).toBeVisible();
  });

  test("nav bar and footer are present", async ({ page }) => {
    // Nav
    const nav = page.locator("nav").first();
    await expect(nav.getByRole("link", { name: "Features" })).toBeVisible({ timeout: 10000 });
    await expect(nav.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Robotics" })).toBeVisible();
    await expect(nav.getByRole("link", { name: /get started/i })).toBeVisible();

    // Footer
    const footer = page.locator("footer");
    await expect(footer).toBeVisible({ timeout: 10000 });
    await expect(footer.getByText(/Titan/)).toBeVisible();
    await expect(footer.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "Robotics" })).toBeVisible();
  });

  test("top-level nav links navigate correctly from features page", async ({ page }) => {
    // Click Pricing in nav
    await page.locator("nav").first().getByRole("link", { name: "Pricing" }).click();
    await page.waitForURL("**/pricing", { timeout: 10000 });
    await expect(page).toHaveURL(/\/pricing/);

    // Go back to features
    await page.goto("/features", { waitUntil: "load" });

    // Click Robotics in nav
    await page.locator("nav").first().getByRole("link", { name: "Robotics" }).click();
    await page.waitForURL("**/robotics", { timeout: 10000 });
  });

  test("features page contains FAQPage JSON-LD schema", async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    await expect(scripts.first()).toBeAttached({ timeout: 5000 });

    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    let foundFAQ = false;
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      if (content && content.includes('"FAQPage"')) {
        foundFAQ = true;
        const parsed = JSON.parse(content);
        expect(parsed["@type"]).toBe("FAQPage");
        expect(parsed.mainEntity).toBeDefined();
        expect(Array.isArray(parsed.mainEntity)).toBe(true);
        expect(parsed.mainEntity.length).toBeGreaterThanOrEqual(4);
        for (const entity of parsed.mainEntity) {
          expect(entity["@type"]).toBe("Question");
          expect(entity.name).toBeTruthy();
          expect(entity.acceptedAnswer).toBeDefined();
          expect(entity.acceptedAnswer["@type"]).toBe("Answer");
        }
        break;
      }
    }
    expect(foundFAQ).toBe(true);
  });
});
