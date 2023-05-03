import { expect, Locator, Page } from '@playwright/test';

export class LoginShopPage {
    readonly page: Page;
    readonly myProfileButton: Locator;
    readonly loginButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitLogin: Locator;
    readonly editInformationButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly telephoneInput: Locator;


    constructor(page: Page) {
        this.page = page;
        this.myProfileButton = page.locator('//span[contains(text(), "My account")]').nth(1);
        this.loginButton = page.locator('//a[@href="https://ecommerce-playground.lambdatest.io/index.php?route=account/login"]');
        this.emailInput = page.locator('//input[@id="input-email"]');
        this.passwordInput = page.locator('//input[@id="input-password"]');
        this.submitLogin = page.locator('//input[@value="Login"]');
        this.editInformationButton = page.locator('//a[@href="https://ecommerce-playground.lambdatest.io/index.php?route=account/edit"]').nth(0);
        this.firstNameInput = page.locator('//input[@id="input-firstname"]');
        this.lastNameInput = page.locator('//input[@id="input-lastname"]');
        this.telephoneInput = page.locator('//input[@id="input-telephone"]');

    }

    async login(email: string, password: string) {
        await this.myProfileButton.hover();
        await this.loginButton.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitLogin.click();
    }

    async checkInfo() {
        await this.editInformationButton.click();
        await expect(this.firstNameInput).toHaveValue('Dwight');
        await expect(this.lastNameInput).toHaveValue('Schrute');
        await expect(this.emailInput).toHaveValue('kleshcharevgeniy@gmail.com');
        await expect(this.telephoneInput).toHaveValue('+3801234567892');
    }

}
