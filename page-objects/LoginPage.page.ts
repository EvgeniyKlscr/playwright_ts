import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userNameImput: Locator;
    readonly passwordImput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameImput = page.locator('//input[@id="user_login"]');
        this.passwordImput = page.locator('//input[@id="user_password"]');
        this.submitButton = page.locator('//input[@value="Sign in"]');
        this.errorMessage = page.locator('//div[@class="alert alert-error"]');
        this.signInButton = page.locator('//button[@type="button"]');
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/');
    }

    async login(username: string, password: string) {
        await this.signInButton.click();
        await this.userNameImput.fill(username);
        await this.passwordImput.fill(password);
        await this.submitButton.click();
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toHaveText('Login and/or password are wrong.');
    }
}
