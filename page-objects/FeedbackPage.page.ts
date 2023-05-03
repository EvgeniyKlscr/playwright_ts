import { expect, Locator, Page } from '@playwright/test';

export class FeedbackPage {
    readonly page: Page;
    readonly feedbackButton: Locator;
    readonly feedbackNameImput: Locator;
    readonly feedbackEmailImput: Locator;
    readonly feedbackSubjectImput: Locator;
    readonly feedbackCommentImput: Locator;
    readonly clearButton: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.feedbackButton = page.locator('//li[@id="feedback"]');
        this.feedbackNameImput = page.locator('//input[@placeholder="Your Name"]');
        this.feedbackEmailImput = page.locator('//input[@placeholder="Your email address"]');
        this.feedbackSubjectImput = page.locator('//input[@placeholder="Subject"]');
        this.feedbackCommentImput = page.locator('//textarea[@id="comment"]');
        this.clearButton = page.locator('//input[@type="reset"]');
        this.submitButton = page.locator('//input[@type="submit"]');
    }

    async fillFeedback(name: string, email: string, subject: string, comment: string) {
        await this.feedbackNameImput.fill(name);
        await this.feedbackEmailImput.fill(email);
        await this.feedbackSubjectImput.fill(subject);
        await this.feedbackCommentImput.fill(comment);
    }

    async clearFeedback() {
        await this.clearButton.click();
    }

    async submitFeedback() {
        await this.submitButton.click();
    }

    async goToForm() {
        await this.page.goto('http://zero.webappsecurity.com/index.html');
        await this.feedbackButton.click();
    }

    async assertReset() {
        await expect(this.feedbackNameImput).toBeEmpty();
        await expect(this.feedbackCommentImput).toBeEmpty();
    }

    async assertSubmit() {
        await this.page.waitForSelector('//h3[text()="Feedback"]');
        await expect(this.page).toHaveURL('http://zero.webappsecurity.com/sendFeedback.html')
    }
}
