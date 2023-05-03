import { test, expect } from '@playwright/test';

test.describe('Currency exchange', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('//button[@type="button"]');
        await page.fill('//input[@id="user_login"]', 'username');
        await page.fill('//input[@id="user_password"]', 'password');
        await page.click('//input[@value="Sign in"]');
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
    });

    test('Successful exchange', async ({ page }) => {
        await page.click('//a[@href="/bank/redirect.html?url=pay-bills.html"]');
        await page.click('//a[@href="#ui-tabs-3"]');
        await page.selectOption('//select[@id="pc_currency"]', 'EUR');

        const rate = await page.locator('//span[@id="sp_sell_rate"]');
        await expect(rate).toContainText('1 euro (EUR)');

        await page.fill('//input[@id="pc_amount"]', '1000');
        await page.click('//input[@id="pc_inDollars_true"]');
        await page.click('//input[@id="pc_calculate_costs"]');

        const coversion = await page.locator('//label[@id="pc_conversion_amount"]');
        await expect(coversion).toContainText('1000.00 U.S. dollar (USD)');

        await page.click('//input[@value="Purchase"]');

        const message = await page.locator('//div[@id="alert_content"]');
        await expect(message).toBeVisible();
        await expect(message).toHaveText('Foreign currency cash was successfully purchased.');
    });
});
