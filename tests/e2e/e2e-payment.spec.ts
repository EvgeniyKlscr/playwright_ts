import { test, expect } from '@playwright/test';

test.describe('New payment', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('//button[@type="button"]');
        await page.fill('//input[@id="user_login"]', 'username');
        await page.fill('//input[@id="user_password"]', 'password');
        await page.click('//input[@value="Sign in"]');
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
    });

    test('Should send new payment', async ({ page }) => {
        await page.click('//a[@href="/bank/redirect.html?url=pay-bills.html"]');
        await page.selectOption('//select[@id="sp_payee"]', 'apple');
        await page.click('//a[@id="sp_get_payee_details"]');
        await page.waitForSelector('//i[@id="sp_payee_details"]');
        await page.selectOption('//select[@id="sp_account"]', '6');
        await page.fill('//input[@id="sp_amount"]', '5000');
        await page.fill('//input[@id="sp_date"]', '2023-04-12');
        await page.fill('//input[@id="sp_description"]', 'yobana rusnya');
        await page.click('//input[@value="Pay"]');

        const message = await page.locator('//div[@id="alert_content"]');
        await expect(message).toBeVisible();
        await expect(message).toHaveText('The payment was successfully submitted.');
    });
});
