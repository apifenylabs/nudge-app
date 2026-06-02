# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing-page.spec.ts >> Titan Landing Page >> landing page loads with all key sections visible
- Location: e2e/landing-page.spec.ts:8:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#hero')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('#hero')

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Titan Landing Page", () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto("/");
  6   |   });
  7   | 
  8   |   test("landing page loads with all key sections visible", async ({ page }) => {
  9   |     // Hero section
  10  |     const hero = page.locator("#hero");
> 11  |     await expect(hero).toBeVisible();
      |                        ^ Error: expect(locator).toBeVisible() failed
  12  | 
  13  |     // Main heading
  14  |     await expect(
  15  |       page.getByRole("heading", { name: /build your/i, level: 1 })
  16  |     ).toBeVisible();
  17  | 
  18  |     // Features / Tiers section
  19  |     const features = page.locator("#features");
  20  |     await expect(features).toBeVisible();
  21  | 
  22  |     // Progression section
  23  |     const progression = page.locator("#progression");
  24  |     await expect(progression).toBeVisible();
  25  | 
  26  |     // CTA section
  27  |     const cta = page.locator("#cta");
  28  |     await expect(cta).toBeVisible();
  29  | 
  30  |     // Navbar is present
  31  |     await expect(page.getByText("Titan", { exact: true }).first()).toBeVisible();
  32  |   });
  33  | 
  34  |   test("page title and meta description are correct", async ({ page }) => {
  35  |     await expect(page).toHaveTitle(/Titan/);
  36  |     const metaDesc = page.locator('meta[name="description"]');
  37  |     await expect(metaDesc).toHaveAttribute(
  38  |       "content",
  39  |       /AI agent builder|Solo Leveling/
  40  |     );
  41  |   });
  42  | 
  43  |   test("particle effect canvas is present on landing page", async ({ page }) => {
  44  |     const canvas = page.locator("canvas");
  45  |     await expect(canvas).toBeVisible();
  46  |     // Verify it has pixel content (rendered particles)
  47  |     const boundingBox = await canvas.boundingBox();
  48  |     expect(boundingBox).not.toBeNull();
  49  |     expect(boundingBox!.width).toBeGreaterThan(0);
  50  |     expect(boundingBox!.height).toBeGreaterThan(0);
  51  |   });
  52  | 
  53  |   test("tier cards display correctly", async ({ page }) => {
  54  |     // Scroll to features section so tier cards are in view
  55  |     await page.locator("#features").scrollIntoViewIfNeeded();
  56  |     await page.waitForTimeout(500);
  57  | 
  58  |     // Check all three tier names are present
  59  |     await expect(page.getByRole("heading", { name: /^Novice$/ })).toBeVisible();
  60  |     await expect(page.getByRole("heading", { name: /^Hunter$/ })).toBeVisible();
  61  |     await expect(page.getByRole("heading", { name: /^Sovereign$/ })).toBeVisible();
  62  | 
  63  |     // Check tier buttons exist
  64  |     await expect(page.getByRole("button", { name: "Start Free" })).toBeVisible();
  65  |     await expect(page.getByRole("button", { name: "Go Hunter" })).toBeVisible();
  66  |     await expect(page.getByRole("button", { name: "Ascend" })).toBeVisible();
  67  | 
  68  |     // Check the "See Tiers" link exists in the hero
  69  |     await expect(page.getByRole("link", { name: "See Tiers" })).toBeVisible();
  70  |   });
  71  | 
  72  |   test("tier card hover effect changes tier card scale", async ({ page }) => {
  73  |     await page.locator("#features").scrollIntoViewIfNeeded();
  74  |     await page.waitForTimeout(500);
  75  | 
  76  |     const sovereign = page.getByRole("button", { name: "Ascend" }).first();
  77  |     const sovereignCard = sovereign.locator("..");
  78  |     // Hover on the card to trigger the effect
  79  |     await sovereign.hover();
  80  |     await page.waitForTimeout(300);
  81  |     // The card wraps in a div with hover scale transition — just ensure it's still visible
  82  |     await expect(sovereign).toBeVisible();
  83  |   });
  84  | 
  85  |   test("pricing page loads with tier comparison", async ({ page }) => {
  86  |     // Navigate via navbar link
  87  |     await page.getByRole("link", { name: "Pricing" }).click();
  88  |     await page.waitForURL("**/pricing");
  89  | 
  90  |     // Page heading
  91  |     await expect(
  92  |       page.getByRole("heading", { name: /choose your/i })
  93  |     ).toBeVisible();
  94  | 
  95  |     // All plan names visible
  96  |     await expect(page.getByRole("heading", { name: /^Novice$/ })).toBeVisible();
  97  |     await expect(page.getByRole("heading", { name: /^Hunter$/ })).toBeVisible();
  98  |     await expect(page.getByRole("heading", { name: /^Sovereign$/ })).toBeVisible();
  99  |     await expect(page.getByRole("heading", { name: "Enterprise" })).toBeVisible();
  100 | 
  101 |     // Billing toggle buttons are present
  102 |     await expect(page.getByRole("button", { name: /monthly/i })).toBeVisible();
  103 |     await expect(page.getByRole("button", { name: /annual/i })).toBeVisible();
  104 |   });
  105 | 
  106 |   test("pricing page billing toggle switches between monthly and annual", async ({ page }) => {
  107 |     await page.getByRole("link", { name: "Pricing" }).click();
  108 |     await page.waitForURL("**/pricing");
  109 | 
  110 |     // Default is monthly — Hunter plan shows $29/mo
  111 |     await expect(page.getByText("$29").first()).toBeVisible();
```