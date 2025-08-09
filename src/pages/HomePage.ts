import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) { super(page); }

  async goto() {
    await this.page.goto('/');
  }

  async openNewArticle() {
    await this.page.click('a[href="#/editor"]');
  }

  async openSettings() {
    await this.page.click('a[href="#/settings"]');
  }

  async filterByTag(tag: string) {
    await this.page.click(`text=${tag}`);
  }

  async expectArticleListed(title: string) {
    await expect(this.page.locator('h1', { hasText: title }).first()).toBeVisible();
  }
}
