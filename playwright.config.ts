import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    timeout: 20000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1440, height: 720 },
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
};

export default config;
