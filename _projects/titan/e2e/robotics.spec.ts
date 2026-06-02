import { test, expect } from "@playwright/test";

test.describe("Titan Robotics Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/robotics");
  });

  test("robotics page loads with correct heading and meta", async ({ page }) => {
    await expect(page).toHaveTitle(/Robotics.*Titan/);

    // Main hero heading
    await expect(
      page.getByRole("heading", { name: /Deploy.*Agent.*Robot/i, level: 1 })
    ).toBeVisible();
  });

  test("phase badge and description are visible", async ({ page }) => {
    await expect(page.getByText(/Phase 6.*Robotics/i)).toBeVisible();

    // Subtitle text
    await expect(
      page.getByText(/ROS2 robots|ESP32|Raspberry Pi/i)
    ).toBeVisible();
  });

  test("all four platform cards render", async ({ page }) => {
    const platforms = ["ROS2", "Arduino", "Raspberry Pi", "Custom Hardware"];

    for (const platform of platforms) {
      await expect(
        page.getByRole("heading", { name: platform })
      ).toBeVisible();
    }
  });

  test("platform cards link to their setup guides", async ({ page }) => {
    // Each card is a link to /robotics/{id}
    const platformLinks = [
      { name: "ROS2", href: "/robotics/ros2" },
      { name: "Arduino", href: "/robotics/arduino" },
      { name: "Raspberry Pi", href: "/robotics/raspberry-pi" },
    ];

    for (const { name, href } of platformLinks) {
      const link = page.getByRole("link", { name }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
    }
  });

  test("platform card hover reveals setup guide text", async ({ page }) => {
    const ros2Card = page.getByRole("link", { name: "ROS2" }).first();
    await ros2Card.hover();
    await page.waitForTimeout(300);
    await expect(page.getByText("Setup guide")).toBeVisible();
  });

  test("stats row shows platform information", async ({ page }) => {
    // Stats chips
    await expect(page.getByText("Platforms")).toBeVisible();
    await expect(page.getByText("Protocols")).toBeVisible();
    await expect(page.getByText("Status")).toBeVisible();
  });

  test("navigation buttons link to correct pages", async ({ page }) => {
    // Manage Deployments
    const deployBtn = page.getByRole("link", { name: /manage deployments/i });
    await expect(deployBtn).toBeVisible();
    await expect(deployBtn).toHaveAttribute("href", "/robotics/dashboard");

    // Back to Dashboard
    const dashboardBtn = page.getByRole("link", { name: /back to dashboard/i });
    await expect(dashboardBtn).toBeVisible();
    await expect(dashboardBtn).toHaveAttribute("href", "/dashboard");
  });

  test("can navigate to and from robotics page via landing page", async ({ page }) => {
    // Navigate to landing
    await page.goto("/");
    await page.waitForURL("**/");

    // Click Robotics in nav
    await page.locator("nav").first().getByRole("link", { name: "Robotics" }).click();
    await page.waitForURL("**/robotics");

    // Verify we're on robotics page
    await expect(page).toHaveURL(/\/robotics$/);
    await expect(
      page.getByRole("heading", { name: /Deploy.*Agent.*Robot/i, level: 1 })
    ).toBeVisible();

    // Go back to landing via Home link in nav (no home link, use brand)
    await page.getByRole("link", { name: /Titan/i }).first().click();
    await page.waitForURL("**/");
    await expect(page).toHaveURL(/\/$/);
  });

  test("robotics page contains BreadcrumbList JSON-LD schema", async ({ page }) => {
    const scripts = page.locator('script[type="application/ld+json"]');
    const count = await scripts.count();
    expect(count).toBeGreaterThanOrEqual(1);

    let foundBreadcrumb = false;
    for (let i = 0; i < count; i++) {
      const content = await scripts.nth(i).textContent();
      if (content && content.includes('"BreadcrumbList"')) {
        foundBreadcrumb = true;
        const parsed = JSON.parse(content);
        expect(parsed["@type"]).toBe("BreadcrumbList");
        expect(parsed.itemListElement).toBeDefined();
        expect(Array.isArray(parsed.itemListElement)).toBe(true);
        expect(parsed.itemListElement.length).toBeGreaterThanOrEqual(2);
        // First item should be Home
        expect(parsed.itemListElement[0].name).toBe("Home");
        expect(parsed.itemListElement[0].position).toBe(1);
        break;
      }
    }
    expect(foundBreadcrumb).toBe(true);
  });
});
