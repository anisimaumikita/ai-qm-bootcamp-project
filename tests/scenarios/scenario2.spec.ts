/**
 * Scenario 2: Subscribe for a Job
 *
 * TEST CASE:
 * 1. Open the IKEA website
 * 2. Click on 'Jobs' tab
 * 3. Click on 'Explore available jobs'
 * 4. Input Email in Subscription block (generated each time)
 * 5. Select a 'Category' and Add it
 * 6. Input Location and choose it in dropdown
 * 7. Click on 'Sign up'
 * 8. Check confirmation message is displayed
 */

import { test, expect } from '../../src/fixtures/testFixtures';
import { generateUniqueEmail, isValidEmail } from '../../src/utils/testData';
import { createLogger } from '../../src/utils/logger';

const logger = createLogger('Scenario2-SubscribeForJob');

/**
 * Test data for subscription
 * IMPORTANT: Avoid hardcoded values!
 */
const TEST_DATA = {
  category: 'Marketing', // Adjust based on available categories
  location: 'Stockholm', // Adjust based on available locations
};

test.describe('Scenario 2: Subscribe for a Job', () => {
  test('should subscribe for job alerts with unique email', async ({ homePage, jobsPage }) => {
    // Generate unique email for this test run
    const uniqueEmail = generateUniqueEmail();
    logger.info(`Generated unique email: ${uniqueEmail}`);
    expect(isValidEmail(uniqueEmail)).toBeTruthy();

    // Step 1: Navigate to IKEA home page
    logger.info('Step 1: Navigating to IKEA home page');
    await homePage.navigate();
    await homePage.getPage.waitForLoadState('networkidle');

    // Step 2: Click on Jobs tab
    logger.info('Step 2: Clicking Jobs tab');
    await homePage.clickJobsTab();

    // Step 3: Click on 'Explore available jobs'
    logger.info('Step 3: Clicking Explore available jobs button');
    await jobsPage.clickExploreJobsButton();

    // Step 4: Input email in subscription block
    logger.info(`Step 4: Entering email: ${uniqueEmail}`);
    await jobsPage.subscribeWithEmail(uniqueEmail);

    // Step 5: Select category
    logger.info(`Step 5: Selecting category: ${TEST_DATA.category}`);
    await jobsPage.selectCategory(TEST_DATA.category);

    // Step 6: Input location
    logger.info(`Step 6: Entering location: ${TEST_DATA.location}`);
    await jobsPage.enterLocation(TEST_DATA.location);

    // Step 7: Click Sign up
    logger.info('Step 7: Clicking Sign up button');
    await jobsPage.clickSignUp();

    // Step 8: Verify confirmation message
    logger.info('Step 8: Verifying confirmation message is visible');
    const isConfirmationVisible = await jobsPage.isConfirmationMessageVisible();
    expect(isConfirmationVisible).toBeTruthy();

    const confirmationMessage = await jobsPage.getConfirmationMessage();
    logger.info(`Confirmation message: ${confirmationMessage}`);
    expect(confirmationMessage.length).toBeGreaterThan(0);

    logger.info('✓ Scenario 2 completed successfully');
  });
});
