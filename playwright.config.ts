import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import dotevn from 'dotenv';
dotevn.config({
    override: true,
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
    testDir: './tests',
    reporter: process.env.CI ? 'html' : 'list',
    fullyParallel: true,
    retries: 1,
    workers: 1,
    timeout: 60 * 1000,
    expect: { timeout: 15 * 1000 },
    use: {
        actionTimeout: 10 * 1000,
        navigationTimeout: 15 * 1000,
        testIdAttribute: 'data-test',
        baseURL: 'https://www.saucedemo.com/',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
};

export default config;
