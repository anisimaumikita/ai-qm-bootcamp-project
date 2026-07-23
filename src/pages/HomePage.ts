/**
 * Home Page Object
 * 
 * Represents the IKEA home page.
 * Provides methods to interact with home page elements.
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS, SELECTORS } from '../config/constants';

export class HomePage extends BasePage {
  // Locators
  private jobsTab: Locator;
  private careersLink: Locator;

  constructor(page: Page) {
    super(page, 'HomePage');
    
    // Initialize locators - use page.locator() for better debugging
    // These use accessible selectors (role-based, text-based)
    this.jobsTab = page.locator(SELECTORS.JOBS_TAB);
    this.careersLink = page.locator(SELECTORS.CAREERS_LINK);
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
