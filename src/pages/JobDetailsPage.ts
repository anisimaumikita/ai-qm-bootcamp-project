/**
 * Job Details Page Object
 *
 * Represents the job details/job posting page.
 * Handles viewing and saving individual job details.
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class JobDetailsPage extends BasePage {
  // Locators
  private jobDetailTitle: Locator;
  private saveJobButton: Locator;
  private jobDescription: Locator;

  constructor(page: Page) {
    super(page, 'JobDetailsPage');

    // Use role-based selectors - discovered via codegen
    this.jobDetailTitle = page.getByRole('heading').first();
    // Use .first() to handle strict mode - there are 2 Save buttons on the page
    this.saveJobButton = page.getByLabel('Save Job').first();
    this.jobDescription = page.locator('section').first();
  }

  /**
   * Get the job title from the details page
   */
  async getJobTitle(): Promise<string> {
    await this.waitForElement(this.jobDetailTitle);
    return await this.getText(this.jobDetailTitle);
  }

  /**
   * Check if job title contains specific text
   * @param expectedText Text that should be in the job title
   */
  async jobTitleContains(expectedText: string): Promise<boolean> {
    const title = await this.getJobTitle();
    return title.toLowerCase().includes(expectedText.toLowerCase());
  }

  /**
   * Save the job by clicking Save button
   */
  async saveJob(): Promise<void> {
    await this.waitForElement(this.saveJobButton);
    await this.click(this.saveJobButton, 'Save Job Button');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if Save button is visible
   */
  async isSaveButtonVisible(): Promise<boolean> {
    return await this.isVisible(this.saveJobButton);
  }

  /**
   * Get job description text
   */
  async getJobDescription(): Promise<string> {
    try {
      await this.waitForElement(this.jobDescription, 3000);
      return await this.getText(this.jobDescription);
    } catch {
      this.logger.warn('Could not find job description');
      return '';
    }
  }
}
