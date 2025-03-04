import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import { BASE_URL } from './config/env.config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const STORAGE_STATE = path.join(__dirname, 'tmp/session.json');
export const RESPONSE_TIMEOUT = 10_000;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    reporter: process.env.CI ? 'html' : 'list',
    fullyParallel: true,
    retries: 1,
    workers: 1,
    timeout: 45_000,
    expect: { timeout: 10_000 },
    use: {
        actionTimeout: 10_000,
        navigationTimeout: 15_000,
        testIdAttribute: 'data-test',
        baseURL: BASE_URL,
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium-non-logged',
            grepInvert: /@logged/,
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'setup',
            testMatch: '*.setup.ts',
        },
        {
            name: 'chromium-logged',
            grep: /@logged/,
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                storageState: STORAGE_STATE,
            },
        },
    ],
});
