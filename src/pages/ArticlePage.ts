import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ArticlePage extends BasePage {
  async clickEdit() {
    await this.page.click('a:has-text("Edit Article")');
  }

  async clickDelete() {
    await this.page.click('button:has-text("Delete Article")');
  }

  async expectDeletedRedirectToHome() {
    await expect(this.page).toHaveURL(/#\//);
  }

  async expectTitle(title: string) {
    await expect(this.page.locator('h1').first()).toHaveText(title);
  }
}
