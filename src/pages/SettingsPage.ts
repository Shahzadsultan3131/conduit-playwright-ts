import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SettingsPage extends BasePage {
  async updateSettings({ bio, username, email }: { bio?: string; username?: string; email?: string; }) {
    if (username) await this.page.fill('input[placeholder="Username"]', username);
    if (email) await this.page.fill('input[placeholder="Email"]', email);
    if (bio) await this.page.fill('textarea[placeholder="Short bio about you"]', bio);
    await this.page.click('button:has-text("Update Settings")');
    await expect(this.page.locator('form')).toBeVisible();
  }
}
