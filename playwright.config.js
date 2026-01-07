import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30_000,
    retries: 0,
    use: {
        baseURL: 'https://bookstore.toolsqa.com',
        extraHTTPHeaders: {
            'Content-Type': 'application/json'
        }
    },
    reporter: [['list'], ['html']]
});