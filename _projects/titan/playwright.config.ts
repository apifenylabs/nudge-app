import { defineConfig, devices } from "@playwright/test";

// When CI is set or PLAYWRIGHT_VERCEL_URL is provided, test against Vercel deployment.
// Otherwise, use local dev server (port 3000).
const VERCEL_URL = process.env.PLAYWRIGHT_VERCEL_URL || "https://titan-app-puce.vercel.app";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["html", { outputFolder: "playwright-report" }], ["line"]],
  use: {
    baseURL: process.env.CI ? VERCEL_URL : "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
        deviceScaleFactor: 1,
        launchOptions: {
          args: [
            "--no-sandbox",
            "--disable-features=DialMediaRouteProvider,MediaRouter,Nss",
          ],
          env: {
            ...process.env,
            // Point NSS to the bundle's NSS libs; skip persistent DB
            LD_LIBRARY_PATH:
              "/home/captain/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64",
          },
        },
      },
    },
  ],
  webServer: process.env.CI || process.env.PLAYWRIGHT_VERCEL_URL
    ? undefined
    : {
        command: "npm run dev",
        port: 3000,
        reuseExistingServer: !process.env.CI,
        timeout: 30000,
      },
});
