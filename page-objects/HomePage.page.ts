import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.locator('//input[@id="searchTerm"]');
    }

    async searchRequest(phrase: string) {
        await this.searchField.fill(phrase);
        await this.page.keyboard.press('Enter');
    }
}