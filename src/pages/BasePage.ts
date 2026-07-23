/**
 * Base Page Object
 * 
 * Parent class for all page objects.
 * Provides common methods and ensures consistent behavior.
 * 
 * KEY PRINCIPLE:
 * - Page objects should ONLY contain:
 *   1. Locator definitions
 *   2. Page interaction methods (click, fill, etc.)
 * - Page objects should NOT contain:
 *   1. Assertions
 *   2. Business logic
 *   3. Test flow control
 */

import { Page, Locator } from '@playwright/test';
import { createLogger } from '../utils/logger';

type Logger = ReturnType<typeof createLogger>;

export abstract class BasePage {
  protected page: Page;
  protected logger: Logger;

  constructor(page: Page, pageName: string) {
    this.page = page;
    this.logger = createLogger(pageName);
  }

  /**
   * Get the page instance (for use in tests)
   */
  get getPage(): Page {
    return this.page;
  }

  /**
   * Navigate to a specific URL or path
   * @param path URL or relative path
   */
  async goto(path: string): Promise<void> {
    this.logger.info(`Navigating to: ${path}`);
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on an element with retry logic
   * @param locator The locator to click
   * @param elementName Display name for logging
   */
  async click(locator: Locator, elementName: string): Promise<void> {
    this.logger.info(`Clicking: ${elementName}`);
    await locator.click();
  }

  /**
   * Fill input field with text
   * @param locator The locator to fill
   * @param text Text to enter
   * @param elementName Display name for logging
   */
  async fill(locator: Locator, text: string, elementName: string): Promise<void> {
    this.logger.info(`Filling ${elementName} with: ${text}`);
    await locator.fill(text);
  }

  /**
   * Clear input field
   * @param locator The locator to clear
   * @param elementName Display name for logging
   */
  async clear(locator: Locator, elementName: string): Promise<void> {
    this.logger.info(`Clearing: ${elementName}`);
    await locator.clear();
  }

  /**
   * Wait for element to be visible
   * @param locator The locator to wait for
   * @param timeout Wait timeout in ms
   */
  async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Get text from element
   * @param locator The locator to get text from
   * @returns The text content
   */
  async getText(locator: Locator): Promise<string> {
    return await locator.textContent() || '';
  }

  /**
   * Check if element is visible
   * @param locator The locator to check
   * @returns true if visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Go back to previous page
   */
  async goBack(): Promise<void> {
    this.logger.info('Going back to previous page');
    await this.page.goBack();
    await this.page.waitForLoadState('networkidle');
  }
}
