import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/LoginPage.page';
import { HomePage } from '../../page-objects/HomePage.page';

test.describe('Search result', () => {
    test('Should_ find_search_results', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await loginPage.visit();
        await homePage.searchRequest('bank');

        // await page.goto('http://zero.webappsecurity.com/index.html');
        // await page.fill('//input[@id="searchTerm"]', 'bank');
        // await page.keyboard.press('Enter');

        const numberOfLinks = await page.locator('li > a');
        await expect(numberOfLinks).toHaveCount(2);
    });
});
