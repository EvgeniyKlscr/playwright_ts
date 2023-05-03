import { test, expect } from '@playwright/test';
import { loadHomeage, assertTitle } from '../helpers';

test('First_test', async ({ page }) => {
    await page.goto('https://example.com/');
    const pageTitle = await page.locator('//h1[text()="Example Domain"]');
    await expect(pageTitle).toContainText('Example Domain');
});

test('Second_test', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('//button[@type="button"]');
    await page.click('//input[@value="Sign in"]');
    const errorMessage = await page.locator('//div[@class="alert alert-error"]');
    await expect(errorMessage).toHaveText('Login and/or password are wrong.');
});

// ###run only this test (test.only)
test('Third_test', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/');
    await page.click('//button[@type="button"]');
    await page.type('//input[@id="user_login"]', 'loh');
    await page.type('//input[@id="user_password"]', 'pidr');
    await page.click('//input[@value="Sign in"]');
    const errorMessage = await page.locator(
        '//div[@class="alert alert-error"]'
    );
    await expect(errorMessage).toHaveText('Login and/or password are wrong.');
});

// ###skip this test (test.skip)
test.skip('Assertion', async ({ page }) => {
    await page.goto('https://example.com/');
    await expect(page).toHaveURL('https://example.com/');
    await expect(page).toHaveTitle('Example Domain');

    const element = page.locator('//h1[text()="Example Domain"]');
    await expect(element).toBeVisible();
    await expect(element).toHaveText('Example Domain');
    await expect(element).toHaveCount(1);

    const nonExistingElement = page.locator('h5');
    expect(nonExistingElement).not.toBeVisible();
});

test.describe('First_test_suite', () => {
    test('First_test', async ({ page }) => {
        await page.goto('https://example.com/');
        const pageTitle = await page.locator('//h1[text()="Example Domain"]');
        await expect(pageTitle).toContainText('Example Domain');
    });

    test('Second_test', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('//button[@type="button"]');
        await page.click('//input[@value="Sign in"]');
        const errorMessage = await page.locator(
            '//div[@class="alert alert-error"]'
        );
        await expect(errorMessage).toHaveText(
            'Login and/or password are wrong.'
        );
    });

    test('Third_test', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('//button[@type="button"]');
        await page.type('//input[@id="user_login"]', 'loh');
        await page.type('//input[@id="user_password"]', 'pidr');
        await page.click('//input[@value="Sign in"]');
        const errorMessage = await page.locator(
            '//div[@class="alert alert-error"]'
        );
        await expect(errorMessage).toHaveText(
            'Login and/or password are wrong.'
        );
    });

    //   ###can run only this test with command "npx playwright test --grep @myTag"
    //   ###also we can skip tests with tag with command "npx playwright test --grep-invert @myTag"
    test('Assertion @myTag', async ({ page }) => {
        await page.goto('https://example.com/');
        await expect(page).toHaveURL('https://example.com/');
        await expect(page).toHaveTitle('Example Domain');

        const element = page.locator('//h1[text()="Example Domain"]');
        await expect(element).toBeVisible();
        await expect(element).toHaveText('Example Domain');
        await expect(element).toHaveCount(1);

        // const nonExistingElement = page.locator('h5');
        // expect(nonExistingElement).not.toBeVisible();
    });
});

test.describe('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com/');
    });
    test('Screenshot', async ({ page }) => {
        // await page.goto('https://example.com/');
        await page.screenshot({ path: 'screenshot.png', fullPage: true });
    });

    test('single_Element_Screenshot', async ({ page }) => {
        // await page.goto('https://example.com/');
        const element = await page.$('h1');
        await element.screenshot({ path: 'element_ screenshot.png' });
    });
});

test('Function_with_helpers', async ({ page }) => {
    await loadHomeage(page);
    await assertTitle(page);
});
