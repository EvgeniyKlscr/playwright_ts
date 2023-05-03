import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage.page';
import { HomePage } from '../../page-objects/HomePage.page';

test.describe.parallel('Login/Logout_flow', () => {
    let loginPage: LoginPage;
    // let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.visit();
        // await page.goto('http://zero.webappsecurity.com/');
    });

    test('Negative_scenario', async ({ page }) => {
        await loginPage.login('loh', 'pidar');
        await loginPage.assertErrorMessage();
        // await page.click('//button[@type="button"]');
        // await page.fill('//input[@id="user_login"]', 'loh');
        // await page.fill('//input[@id="user_password"]', 'pidor');
        // await page.click('//input[@value="Sign in"]');
        // const errorMessage = await page.locator('//div[@class="alert alert-error"]');
        // await expect(errorMessage).toHaveText('Login and/or password are wrong.');
    });

    test('Positive_scenario', async ({ page }) => {
        await loginPage.login('username', 'password');
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
    //     await page.click('//button[@type="button"]');
    //     await page.fill('//input[@id="user_login"]', 'username');
    //     await page.fill('//input[@id="user_password"]', 'password');
    //     await page.click('//input[@value="Sign in"]');
    //     await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');

        const accountSummaryTab = await page.locator('//li[@id="account_summary_tab"]');
        await expect(accountSummaryTab).toBeVisible();

        await page.goto('http://zero.webappsecurity.com/logout.html');
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
    });
});
