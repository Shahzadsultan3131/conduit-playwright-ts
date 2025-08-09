import { test, expect, request } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { SettingsPage } from '../../src/pages/SettingsPage';
import { createUserAndGetToken, createArticle } from '../../src/api/apiHelpers';

test.describe('Filter and Settings', () => {
  let apiContext;
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({ baseURL: 'https://conduit.bondaracademy.com' });
  });

  test('Filter Articles by Tag', async ({ page }) => {
    // create article with a unique tag via API
    const token = await createUserAndGetToken(apiContext, { username: 'tag_user_' + Date.now(), email: `tag${Date.now()}@test.com`, password: 'Password1!' });
    await createArticle(apiContext, token, { title: 'Tagged ' + Date.now(), body: 'body', description: '', tagList: ['uniqueTag123']});
    const home = new HomePage(page);
    await home.goto();
    await home.filterByTag('uniqueTag123');
    // soft assertion: at least one article preview contains the tag
    await expect(page.locator('.article-preview')).toContainText('uniqueTag123');
  });

  test('Update User Settings', async ({ page }) => {
    // create user and login by using token to generate storage state
    const token = await createUserAndGetToken(apiContext, { username: 'settings_user_' + Date.now(), email: `settings${Date.now()}@test.com`, password: 'Password1!' });
    // use API token to create storage state
    await page.goto('/');
    // A simple flow: navigate to settings, fill, submit
    await page.click('a[href="#/login"]');
    await page.fill('input[placeholder="Email"]', `settings${Date.now()}@test.com`);
    // note: this test demonstrates the steps; in CI you'd generate storageState via API-auth helper
    // For now, mark as TODO to replace with programmatic auth
    await test.skip();
  });
});
