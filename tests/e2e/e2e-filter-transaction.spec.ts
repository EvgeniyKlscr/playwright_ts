import { test, expect } from '@playwright/test';

test.describe('Filter transaction', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('//button[@type="button"]');
        await page.fill('//input[@id="user_login"]', 'username');
        await page.fill('//input[@id="user_password"]', 'password');
        await page.click('//input[@value="Sign in"]');
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
    });

    test('Verify the result to each account', async ({ page }) => {
        await page.click('//a[@href="/bank/redirect.html?url=account-activity.html"]');
        await page.selectOption('//select[@id="aa_accountId"]', '2');

        const chekingAccount = await page.locator('//table[contains(@class,"table table-condensed")]/tbody[1]/tr');
        await expect(chekingAccount).toHaveCount(3);

        await page.selectOption('//select[@id="aa_accountId"]', '4');

        const loanAccount = await page.locator('//table[contains(@class,"table table-condensed")]/tbody[1]/tr');
        await expect(loanAccount).toHaveCount(2);

        await page.selectOption('//select[@id="aa_accountId"]', '6');

        const brokerageAccount = await page.locator('//div[@class="well"]');
        await expect(brokerageAccount).toBeVisible();
    });
});
