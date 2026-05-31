import { defineConfig, devices } from '@playwright/test';

// Chromium needs LD_LIBRARY_PATH for libnspr4/libnss3 installed from deb
// in WSL without sudo access.
const chromiumDir = process.env.HOME + '/.cache/ms-playwright/chromium-1223/chrome-linux64';
const headlessDir = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64';

process.env.LD_LIBRARY_PATH = [chromiumDir, headlessDir, process.env.LD_LIBRARY_PATH || ''].filter(Boolean).join(':');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3456',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev -- -p 3456',
    url: 'http://localhost:3456',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
