import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EditorPage extends BasePage {
  constructor(page: Page) { super(page); }

  async createArticle(title: string, about: string, body: string, tags: string[]) {
    await this.page.fill('input[placeholder="Article Title"]', title);
    await this.page.fill('input[placeholder="What's this article about?"]', about);
    await this.page.fill('textarea[placeholder="Write your article (in markdown)"]', body);
    await this.page.fill('input[placeholder="Enter tags"]', tags.join(' '));
    await this.page.click('button:has-text("Publish Article")');
    await expect(this.page).toHaveURL(/#\/article\//);
  }
}
