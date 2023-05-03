import { test, expect } from '@playwright/test';

test.describe('Transfer funds', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('//button[@type="button"]');
        await page.fill('//input[@id="user_login"]', 'username');
        await page.fill('//input[@id="user_password"]', 'password');
        await page.click('//input[@value="Sign in"]');
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
    });

    test('Transfer funds', async ({ page }) => {
        await page.click('//a[contains(text(),"Transfer Funds")]');
        await page.selectOption('//select[@id="tf_fromAccountId"]', '2');
        await page.selectOption('//select[@id="tf_toAccountId"]', '3');
        await page.fill('//input[@id="tf_amount"]', '500');
        await page.fill('//input[@class="input-xlarge"]', 'na hlib');
        await page.click('//button[@type="submit"]');

        const boardHeader = await page.locator('//h2[text()="Transfer Money & Make Payments - Verify"]');
        await expect(boardHeader).toContainText('Verify');
        await expect(await page.locator('//input[@id="tf_amount"]')).toHaveValue('500');

        await page.click('//button[@type="submit"]');

        const confirmText = await page.locator('//div[@class="alert alert-success"]');
        await expect(confirmText).toContainText('You successfully submitted your transaction.');
    });
});
