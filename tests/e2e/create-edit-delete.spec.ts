import { test, expect, request } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { EditorPage } from '../../src/pages/EditorPage';
import { ArticlePage } from '../../src/pages/ArticlePage';
import { createArticle, createUserAndGetToken } from '../../src/api/apiHelpers';

test.describe('Article flow', () => {
  let apiContext;
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({ baseURL: 'https://conduit.bondaracademy.com' });
  });

  test('Create New Article (UI)', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.openNewArticle();
    const editor = new EditorPage(page);
    const title = 'E2E UI Article ' + Date.now();
    await editor.createArticle(title, 'about', 'body of article', ['e2e']);
    const article = new ArticlePage(page);
    await article.expectTitle(title);
  });

  test('Edit Article (pre-created via API)', async ({ page }) => {
    // create user + article via API
    const token = await createUserAndGetToken(apiContext, { username: 'e2e_user_' + Date.now(), email: `e2e${Date.now()}@test.com`, password: 'Password1!' });
    const res = await createArticle(apiContext, token, { title: 'API Article ' + Date.now(), body: 'original body', description: 'desc', tagList: ['api']});
    const body = await res.json();
    const slug = body.article.slug;
    // open article page
    await page.goto(`/@${body.article.author.username}/${slug}`);
    const article = new ArticlePage(page);
    await article.clickEdit();
    const editor = new EditorPage(page);
    const newTitle = 'Edited Title ' + Date.now();
    await editor.createArticle(newTitle, 'edited about', 'edited body', ['edited']);
    await article.expectTitle(newTitle);
  });

  test('Delete Article (pre-created via API)', async ({ page }) => {
    const token = await createUserAndGetToken(apiContext, { username: 'e2e_user2_' + Date.now(), email: `e2e2${Date.now()}@test.com`, password: 'Password1!' });
    const res = await createArticle(apiContext, token, { title: 'API Delete ' + Date.now(), body: 'to delete', description: 'desc', tagList: ['delete']});
    const body = await res.json();
    const slug = body.article.slug;
    await page.goto(`/@${body.article.author.username}/${slug}`);
    const article = new ArticlePage(page);
    await article.clickDelete();
    await article.expectDeletedRedirectToHome();
  });
});
