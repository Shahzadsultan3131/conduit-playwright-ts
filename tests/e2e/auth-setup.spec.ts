
import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test('Authenticate and save storage state', async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/login');
  await page.fill('input[placeholder="Email"]', process.env.USER_EMAIL!);
  await page.fill('input[placeholder="Password"]', process.env.USER_PASSWORD!);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/'); // wait for homepage
  await page.context().storageState({ path: 'storageState.json' });
});
