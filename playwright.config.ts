import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4178';

export default defineConfig({
  testDir: './tests',
  use: { baseURL, browserName: 'chromium', colorScheme: 'light', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4178 --strictPort',
    url: baseURL,
    reuseExistingServer: false,
  },
});
