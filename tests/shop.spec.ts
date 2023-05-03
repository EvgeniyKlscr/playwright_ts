import { test, expect } from "@playwright/test";
import { LoginShopPage } from "../page-objects/shop.page";

test('user profile', async ({page}) => {
    const loginShopPage = new LoginShopPage(page);

    await test.step('login in system', async () => {
        await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
        await loginShopPage.login('kleshcharevgeniy@gmail.com', 'kleshcharevgeniy@gmail.com');
        await loginShopPage.checkInfo();
    })
})