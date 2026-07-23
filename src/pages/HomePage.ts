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

    // Use role-based locator with exact match (discovered via codegen)
    // exact: true prevents matching mobile menu duplicates
    this.jobsTab = page.getByRole('link', { name: 'Jobs', exact: true });
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
    await this.getPage.waitForLoadState('networkidle');
  }

  /**
   * Check if Jobs tab is visible
   */
  async isJobsTabVisible(): Promise<boolean> {
    return await this.isVisible(this.jobsTab);
  }
}
