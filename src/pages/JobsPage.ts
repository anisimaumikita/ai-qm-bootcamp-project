/**
 * Jobs Page Object
 *
 * Represents the IKEA jobs/careers page.
 * Handles job search, filtering, and navigation.
 *
 * NOTE: The actual selectors will need adjustment based on
 * real website structure. These are role-based and data-testid
 * based selectors which are more maintainable and stable.
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS, SELECTORS, JOBS_SEARCH_PARAMS } from '../config/constants';

export class JobsPage extends BasePage {
  // Locators for job exploration
  private exploreJobsButton: Locator;
  private searchJobTitleInput: Locator;
  private searchJobsButton: Locator;
  private firstJobItem: Locator;
  private jobTitle: Locator;
  private noResultsMessage: Locator;
  private saveJobButton: Locator;
  private savedJobsBadge: Locator;
  private savedJobsTab: Locator;

  // Locators for subscription
  private emailInput: Locator;
  private categorySelect: Locator;
  private locationInput: Locator;
  private signUpButton: Locator;
  private confirmationMessage: Locator;

  constructor(page: Page) {
    super(page, 'JobsPage');

    // Initialize job search locators - Selectors discovered via Playwright codegen
    this.exploreJobsButton = page.getByRole('link', { name: 'Explore available jobs' });
    this.searchJobTitleInput = page.getByRole('searchbox', { name: 'Keyword Search' });
    // Use exact ID selector to avoid strict mode violation
    this.searchJobsButton = page.locator('#search-submit-ea85388cbe');
    // First job link in search results - filter job links by having job titles
    this.firstJobItem = page
      .locator('a')
      .filter({ hasText: /Manager|Designer|Developer|Accountant|Customer/ })
      .first();
    this.jobTitle = page.getByRole('heading').first();
    this.noResultsMessage = page.locator('text=/0\\s+results|no\\s+jobs/i');
    this.saveJobButton = page.getByLabel('Save Job');
    // Saved jobs counter button shows as "Saved jobs (0)" or "Saved jobs (1)" etc.
    this.savedJobsBadge = page.getByRole('button', { name: /saved\s+jobs\s*\(\d+\)/i });
    this.savedJobsTab = page.getByRole('button', { name: /saved\s+jobs/i });

    // Initialize subscription locators
    this.emailInput = page.locator('input[type="email"]').or(page.getByPlaceholder(/email/i)).first();
    this.categorySelect = page.getByRole('combobox').or(page.locator('select')).first();
    this.locationInput = page
      .getByPlaceholder(/location|city|state|zip/i)
      .or(page.getByLabel(/location/i))
      .first();
    this.signUpButton = page.getByRole('button', { name: /subscribe|sign\s*up/i });
    this.confirmationMessage = page.locator('[role="alert"], [role="status"]');
  }

  /**
   * Navigate to jobs page
   */
  async navigate(): Promise<void> {
    await this.goto(URLS.JOBS);
    // Handle cookie consent modal if it appears
    await this.dismissCookieConsent();
  }

  /**
   * Dismiss cookie consent modal if present
   */
  private async dismissCookieConsent(): Promise<void> {
    try {
      const acceptButton = this.page.getByRole('button', { name: 'Accept' });
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await this.click(acceptButton, 'Accept Cookies');
        await this.page.waitForTimeout(500);
      }
    } catch {
      // Cookie consent not present, continue
      this.logger.debug('No cookie consent modal found');
    }
  }

  /**
   * Click "Explore available jobs" button
   */
  async clickExploreJobsButton(): Promise<void> {
    await this.waitForElement(this.exploreJobsButton, 10000); // Longer timeout for page load
    await this.click(this.exploreJobsButton, 'Explore available jobs button');
    await this.page.waitForLoadState('networkidle');
    // Handle cookie modal if it appears after navigation
    await this.dismissCookieConsent();
  }

  /**
   * Search for jobs by title
   * @param jobTitle Job title to search for
   */
  async searchForJob(jobTitle: string): Promise<void> {
    // Ensure input is visible and ready
    await this.waitForElement(this.searchJobTitleInput, 10000);
    
    // Clear any existing text and enter new search term
    await this.clear(this.searchJobTitleInput, 'Job Title Search Input');
    await this.fill(this.searchJobTitleInput, jobTitle, 'Job Title Search Input');
    
    // Click search and wait for results
    await this.click(this.searchJobsButton, 'Search Jobs Button');

    // Wait for search results to load
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(JOBS_SEARCH_PARAMS.SEARCH_TIMEOUT);
  }

  /**
   * Check if search returned any results
   * @returns true if results found, false if no results
   */
  async hasSearchResults(): Promise<boolean> {
    // Wait for page to load after search
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);

    // Check if job links are visible (look for job result links, not the search input)
    try {
      const jobLinks = this.page
        .locator('a')
        .filter({ hasText: /Manager|Designer|Developer|Accountant|Customer/ });

      // Wait for at least one result link to appear
      await jobLinks.first().waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      // If no job links found, return false
      return false;
    }
  }

  /**
   * Click on the first job in search results
   */
  async clickFirstJob(): Promise<void> {
    await this.waitForElement(this.firstJobItem);
    await this.click(this.firstJobItem, 'First Job Item');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the title of the first job in the list
   */
  async getFirstJobTitle(): Promise<string> {
    await this.waitForElement(this.jobTitle);
    return await this.getText(this.jobTitle);
  }

  /**
   * Save the current job by clicking Save button
   */
  async saveCurrentJob(): Promise<void> {
    await this.waitForElement(this.saveJobButton);
    await this.click(this.saveJobButton, 'Save Job Button');

    // Wait for the save action to complete
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the count of saved jobs from the badge
   * @returns Number of saved jobs
   */
  async getSavedJobsCount(): Promise<number> {
    try {
      await this.waitForElement(this.savedJobsBadge, 3000);
      const text = await this.getText(this.savedJobsBadge);
      // Extract number from text like "Saved jobs (1)" -> 1
      const match = text.match(/\((\d+)\)/);
      return match ? parseInt(match[1], 10) : 0;
    } catch {
      this.logger.warn('Could not find saved jobs badge');
      return 0;
    }
  }

  /**
   * Click on Saved Jobs tab
   */
  async clickSavedJobsTab(): Promise<void> {
    await this.waitForElement(this.savedJobsTab);
    await this.click(this.savedJobsTab, 'Saved Jobs Tab');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get title of saved job
   */
  async getSavedJobTitle(): Promise<string> {
    await this.waitForElement(this.jobTitle);
    return await this.getText(this.jobTitle);
  }

  /**
   * Subscribe for job alerts with email
   * @param email Email address to subscribe
   */
  async subscribeWithEmail(email: string): Promise<void> {
    await this.waitForElement(this.emailInput);
    await this.fill(this.emailInput, email, 'Email Input');
  }

  /**
   * Select a category for job alerts
   * @param category Category name to select
   */
  async selectCategory(category: string): Promise<void> {
    await this.waitForElement(this.categorySelect);
    await this.click(this.categorySelect, 'Category Select');

    // Wait for dropdown to open
    await this.page.waitForTimeout(500);

    // Select the option
    const option = this.page.locator(`[role="option"]:has-text("${category}")`);
    await this.click(option, `Category: ${category}`);
  }

  /**
   * Enter location for job alerts
   * @param location Location name
   */
  async enterLocation(location: string): Promise<void> {
    await this.waitForElement(this.locationInput);
    await this.fill(this.locationInput, location, 'Location Input');

    // Wait for suggestions dropdown
    await this.page.waitForTimeout(500);

    // Click first suggestion
    const firstSuggestion = this.page.locator('[role="option"]').first();
    if (await this.isVisible(firstSuggestion)) {
      await this.click(firstSuggestion, 'Location Suggestion');
    }
  }

  /**
   * Sign up for job alerts
   */
  async clickSignUp(): Promise<void> {
    await this.waitForElement(this.signUpButton);
    await this.click(this.signUpButton, 'Sign Up Button');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if confirmation message is visible
   */
  async isConfirmationMessageVisible(): Promise<boolean> {
    try {
      await this.waitForElement(this.confirmationMessage, 3000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get confirmation message text
   */
  async getConfirmationMessage(): Promise<string> {
    return await this.getText(this.confirmationMessage);
  }
}
