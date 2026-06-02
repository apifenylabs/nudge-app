# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: landing-page.spec.ts >> Titan Landing Page >> pricing page loads with tier comparison
- Location: e2e/landing-page.spec.ts:85:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Browser logs:

<launching> /home/captain/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell --disable-field-trial-config --disable-background-networking --disable-background-timer-throttling --disable-backgrounding-occluded-windows --disable-back-forward-cache --disable-breakpad --disable-client-side-phishing-detection --disable-component-extensions-with-background-pages --disable-component-update --no-default-browser-check --disable-default-apps --disable-dev-shm-usage --disable-edgeupdater --disable-extensions --disable-features=AvoidUnnecessaryBeforeUnloadCheckSync,BoundaryEventDispatchTracksNodeRemoval,DestroyProfileOnBrowserClose,DialMediaRouteProvider,GlobalMediaControls,HttpsUpgrades,LensOverlay,MediaRouter,PaintHolding,ThirdPartyStoragePartitioning,Translate,AutoDeElevate,RenderDocument,OptimizationHints,msForceBrowserSignIn,msEdgeUpdateLaunchServicesPreferredVersion --enable-features=CDPScreenshotNewSurface --allow-pre-commit-input --disable-hang-monitor --disable-ipc-flooding-protection --disable-popup-blocking --disable-prompt-on-repost --disable-renderer-backgrounding --force-color-profile=srgb --metrics-recording-only --no-first-run --password-store=basic --use-mock-keychain --no-service-autorun --export-tagged-pdf --disable-search-engine-choice-screen --unsafely-disable-devtools-self-xss-warnings --edge-skip-compat-layer-relaunch --disable-infobars --disable-search-engine-choice-screen --disable-sync --enable-unsafe-swiftshader --headless --hide-scrollbars --mute-audio --blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4 --no-sandbox --no-sandbox --user-data-dir=/tmp/playwright_chromiumdev_profile-d7k0Wp --remote-debugging-pipe --no-startup-window
<launched> pid=1490467
[pid=1490467][err] [0601/072748.824849:WARNING:sandbox/policy/linux/sandbox_linux.cc:404] InitializeSandbox() called with multiple threads in process gpu-process.
[pid=1490467][err] [0601/072748.939555:INFO:CONSOLE:2478] "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold", source: http://localhost:3000/_next/static/chunks/03v9_next_dist_04t_748._.js (2478)
[pid=1490467][err] [0601/072749.003195:INFO:CONSOLE:2478] "[HMR] connected", source: http://localhost:3000/_next/static/chunks/03v9_next_dist_04t_748._.js (2478)
[pid=1490467][err] [0601/072749.078209:ERROR:crypto/nss_util.cc:256] Error initializing NSS with a persistent database (sql:/home/captain/.local/share/pki/nssdb): libsoftokn3.so: cannot open shared object file: No such file or directory
[pid=1490467][err] [0601/072749.078304:ERROR:crypto/nss_util.cc:144] Error initializing NSS without a persistent database: NSS error code: -5925
[pid=1490467][err] [0601/072749.078315:FATAL:crypto/nss_util.cc:146] nss_error=-5925, os_error=0
[pid=1490467][err] [0601/072749.879275:ERROR:net/socket/ssl_client_socket_impl.cc:924] handshake failed; returned -1, SSL error code 1, net_error -3
Call log:
  - waiting for getByRole('link', { name: 'Pricing' })

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
  11  |     await expect(hero).toBeVisible();
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
> 87  |     await page.getByRole("link", { name: "Pricing" }).click();
      |                                                       ^ Error: locator.click: Target page, context or browser has been closed
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
  112 | 
  113 |     // Click Annual
  114 |     await page.getByRole("button", { name: /annual/i }).click();
  115 |     await page.waitForTimeout(300);
  116 | 
  117 |     // Now should show $290/yr
  118 |     await expect(page.getByText("$290").first()).toBeVisible();
  119 |     await expect(page.getByText(/Save.*\/yr/).first()).toBeVisible();
  120 |   });
  121 | 
  122 |   test("progression tree section renders", async ({ page }) => {
  123 |     await page.locator("#progression").scrollIntoViewIfNeeded();
  124 |     await page.waitForTimeout(500);
  125 | 
  126 |     // Section heading
  127 |     await expect(
  128 |       page.getByRole("heading", { name: /Progression/i })
  129 |     ).toBeVisible();
  130 | 
  131 |     // All six progression nodes
  132 |     await expect(page.getByText("Prompt Crafter")).toBeVisible();
  133 |     await expect(page.getByText("Tool Weaver")).toBeVisible();
  134 |     await expect(page.getByText("Memory Sage")).toBeVisible();
  135 |     await expect(page.getByText("Agent Commander")).toBeVisible();
  136 |     await expect(page.getByText("Reality Forger")).toBeVisible();
  137 |     await expect(page.getByText("Sovereign Engine")).toBeVisible();
  138 |   });
  139 | 
  140 |   test("navigation links work correctly", async ({ page }) => {
  141 |     // Nav has Features, Pricing, Robotics links
  142 |     const nav = page.locator("nav").first();
  143 | 
  144 |     // Click Features link
  145 |     await nav.getByRole("link", { name: "Features" }).click();
  146 |     await page.waitForURL("**/features");
  147 |     await expect(page).toHaveURL(/\/features/);
  148 | 
  149 |     // Go back to landing
  150 |     await page.goto("/");
  151 |     await page.waitForURL("**/");
  152 | 
  153 |     // Click Pricing link
  154 |     await page.locator("nav").first().getByRole("link", { name: "Pricing" }).click();
  155 |     await page.waitForURL("**/pricing");
  156 | 
  157 |     // Go back
  158 |     await page.goto("/");
  159 |     await page.waitForURL("**/");
  160 | 
  161 |     // Click Robotics link
  162 |     await page.locator("nav").first().getByRole("link", { name: "Robotics" }).click();
  163 |     await page.waitForURL("**/robotics");
  164 |   });
  165 | });
  166 | 
```