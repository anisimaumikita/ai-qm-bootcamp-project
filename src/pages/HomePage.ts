/**
 * Home Page Object
 *
 * Represents the IKEA home page.
 * Provides methods to interact with home page elements.
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../config/constants';

export class HomePage extends BasePage {
  // Locators
  private jobsTab: Locator;

  constructor(page: Page) {
    super(page, 'HomePage');

    // Use role-based locator (Playwright recommended best practice)
    // getByRole is more stable than CSS selectors and handles both desktop/mobile
    // .first() ensures we get the primary navigation, not mobile duplicate
    this.jobsTab = page.getByRole('link', { name: /jobs/i }).first();
  }

  /**
   * Navigate to home page
   */
  async navigate(): Promise<void> {
    await this.goto(URLS.HOME);
  }

  /**
   * Click on Jobs tab in navigation
   * This should navigate to the jobs page
   */
  async clickJobsTab(): Promise<void> {
    await this.waitForElement(this.jobsTab);
    await this.click(this.jobsTab, 'Jobs Tab');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if Jobs tab is visible
   */
  async isJobsTabVisible(): Promise<boolean> {
    return await this.isVisible(this.jobsTab);
  }
}
