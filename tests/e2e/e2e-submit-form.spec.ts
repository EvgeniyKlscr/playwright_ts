import { test, expect } from '@playwright/test';
import { FeedbackPage } from '../../page-objects/FeedbackPage.page';

test.describe.parallel('Feedback_form', () => {
    let feedbackPage: FeedbackPage;

    test.beforeEach(async ({ page }) => {
        feedbackPage = new FeedbackPage(page);
        await feedbackPage.goToForm();
        // await page.goto('http://zero.webappsecurity.com/index.html');
        // await page.click('//li[@id="feedback"]');
    });

    test('Reset_feedback_form', async ({ page }) => {
        await feedbackPage.fillFeedback('name', 'email', 'subject', 'comment');
        await feedbackPage.clearFeedback();
        await feedbackPage.assertReset();

        
        // await page.fill('//input[@placeholder="Your Name"]', 'lalala name');
        // await page.fill('//input[@placeholder="Your email address"]', 'lalala email');
        // await page.fill('//input[@placeholder="Subject"]', 'lalala Subject');
        // await page.fill('//textarea[@id="comment"]', 'lalala i kill you');
        // await page.click('//input[@type="reset"]');

        // const nameInput = await page.locator('//input[@placeholder="Your Name"]');
        // const commentInput = await page.locator('//textarea[@id="comment"]');
        // await expect(nameInput).toBeEmpty();
        // await expect(commentInput).toBeEmpty();
    });

    test('Submit_feedback_form', async ({page}) => {
        await feedbackPage.fillFeedback('name', 'email', 'subject', 'comment');
        await feedbackPage.submitFeedback();
        await feedbackPage.assertSubmit();

        // await page.fill('//input[@placeholder="Your Name"]', 'lalala name');
        // await page.fill('//input[@placeholder="Your email address"]', 'lalala email');
        // await page.fill('//input[@placeholder="Subject"]', 'lalala Subject');
        // await page.fill('//textarea[@id="comment"]', 'lalala some text');
        // await page.click('//input[@type="submit"]');

        // await page.waitForSelector('//h3[text()="Feedback"]');
        // await expect(page).toHaveURL('http://zero.webappsecurity.com/sendFeedback.html')
    })
});
