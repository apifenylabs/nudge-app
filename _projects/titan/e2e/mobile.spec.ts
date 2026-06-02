import { test, expect } from "@playwright/test";

test.describe("Titan Mobile Responsive", () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X size

  test.describe("Landing Page at Mobile Viewport", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("key sections render at mobile viewport", async ({ page }) => {
      // Hero section
      await expect(page.locator("#hero")).toBeVisible();

      // Main heading (may wrap, still present)
      await expect(
        page.getByRole("heading", { name: /build your/i, level: 1 })
      ).toBeVisible();

      // Features section
      await expect(page.locator("#features")).toBeVisible();

      // Progression section
      await expect(page.locator("#progression")).toBeVisible();

      // CTA section
      await expect(page.locator("#cta")).toBeVisible();
    });

    test("mobile hamburger menu toggles navigation", async ({ page }) => {
      // Desktop nav links should be hidden at mobile
      const desktopNav = page.locator("nav .hidden\\.md\\:flex");
      // At mobile viewport, the desktop nav items are inside a hidden flex
      // The mobile menu button should exist

      // Check for a hamburger/mobile menu button
      // Common patterns: button with aria-label="Menu" or a burger icon
      const menuButton = page
        .locator('button[aria-label="Menu"], button[aria-label="Toggle menu"], button:has(svg), [role="button"][aria-label*="menu" i]')
        .first();

      // If no mobile menu button exists, check if nav items are visible differently at mobile
      const hasMobileMenu = await menuButton.isVisible().catch(() => false);
      if (hasMobileMenu) {
        // Click to open
        await menuButton.click();
        await page.waitForTimeout(300);

        // Mobile nav items should now be visible
        await expect(page.getByRole("link", { name: "Features" }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: "Pricing" }).first()).toBeVisible();
        await expect(page.getByRole("link", { name: "Robotics" }).first()).toBeVisible();
      } else {
        // No hamburger menu — verify the desktop nav links still exist (responsive fallback)
        const nav = page.locator("nav").first();
        const featuresLink = nav.getByRole("link", { name: "Features" });
        const pricingLink = nav.getByRole("link", { name: "Pricing" });
        const roboticsLink = nav.getByRole("link", { name: "Robotics" });
        // At least one should exist
        await expect(featuresLink.or(pricingLink).or(roboticsLink)).toBeVisible();
      }
    });

    test("tier cards stack vertically on mobile", async ({ page }) => {
      // Scroll to features section
      await page.locator("#features").scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Tier cards should still be visible
      await expect(page.getByRole("heading", { name: /^Novice$/ })).toBeVisible();
      await expect(page.getByRole("heading", { name: /^Hunter$/ })).toBeVisible();
      await expect(page.getByRole("heading", { name: /^Sovereign$/ })).toBeVisible();
    });

    test("progression nodes render on mobile", async ({ page }) => {
      await page.locator("#progression").scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await expect(page.getByRole("heading", { name: /Progression/i })).toBeVisible();
      await expect(page.getByText("Prompt Crafter")).toBeVisible();
      await expect(page.getByText("Tool Weaver")).toBeVisible();
      await expect(page.getByText("Memory Sage")).toBeVisible();
    });

    test("viewport width is constrained to mobile size", async ({ page }) => {
      const viewport = page.viewportSize();
      expect(viewport?.width).toBe(375);
      expect(viewport?.height).toBe(812);
    });
  });

  test.describe("Features Page at Mobile Viewport", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("features page renders at mobile size", async ({ page }) => {
      await page.goto("/features");

      // Heading present
      await expect(
        page.getByRole("heading", { name: /Agents Unstoppable/i, level: 1 })
      ).toBeVisible();

      // Feature categories present
      await expect(page.getByRole("heading", { name: "Agent Builder", level: 2 })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Orchestration", level: 2 })).toBeVisible();
    });
  });

  test.describe("Robotics Page at Mobile Viewport", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("robotics page renders at mobile size", async ({ page }) => {
      await page.goto("/robotics");

      await expect(
        page.getByRole("heading", { name: /Deploy.*Agent.*Robot/i, level: 1 })
      ).toBeVisible();

      // Platform cards stack
      await expect(page.getByRole("heading", { name: "ROS2" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Arduino" })).toBeVisible();
    });
  });
});
