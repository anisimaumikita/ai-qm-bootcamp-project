/**
 * Scenario 1: Search for a Job
 * 
 * TEST CASE:
 * 1. Open the IKEA website
 * 2. Click on 'Jobs' tab
 * 3. Click on 'Explore available jobs'
 * 4. Input 'Manager' in Search field
 * 5. Click on 'Search jobs' button
 * 6. If 0 jobs found, go back and search for 'Designer'
 * 7. Click on the first job
 * 8. Check that job title contains 'Manager' (or 'Designer' if fallback)
 * 9. Click on 'Save' button
 * 10. Check that 'Saved jobs' badge shows '1'
 * 11. Click on 'Saved jobs' element
 * 12. Check that the saved job title contains the search keyword
 */

import { test, expect } from '../../src/fixtures/testFixtures';
import { JOBS_SEARCH_PARAMS } from '../../src/config/constants';
import { createLogger } from '../../src/utils/logger';

const logger = createLogger('Scenario1-SearchForJob');

test.describe('Scenario 1: Search for a Job', () => {
  test('should search for jobs and save the first result', async ({
    homePage,
    jobsPage,
    jobDetailsPage,
  }) => {
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

    // Step 4-5: Search for jobs with initial keyword
    let searchKeyword: string = JOBS_SEARCH_PARAMS.DEFAULT_JOB_TITLE; // 'Manager'
    logger.info(`Step 4-5: Searching for job title: ${searchKeyword}`);
    await jobsPage.searchForJob(searchKeyword);

    // Step 6: Check if results exist, if not search for fallback
    logger.info('Step 6: Checking if search returned results');
    let hasResults = await jobsPage.hasSearchResults();

    if (!hasResults) {
      logger.warn(
        `No results found for '${searchKeyword}', attempting fallback search`
      );
      const fallbackKeyword = JOBS_SEARCH_PARAMS.FALLBACK_JOB_TITLE; // 'Designer'
      logger.info(`Searching for fallback keyword: ${fallbackKeyword}`);
      
      // Go back and search again
      await jobsPage.goBack();
      await jobsPage.searchForJob(fallbackKeyword);
      
      hasResults = await jobsPage.hasSearchResults();
      expect(hasResults).toBeTruthy();
      searchKeyword = fallbackKeyword;
    }

    // Get the first job title before clicking
    logger.info('Step 7: Getting first job title before click');
    const firstJobTitle = await jobsPage.getFirstJobTitle();
    logger.info(`First job title: ${firstJobTitle}`);

    // Step 7: Click on the first job
    logger.info('Step 7: Clicking first job in results');
    await jobsPage.clickFirstJob();

    // Step 8: Verify job title contains search keyword
    logger.info(`Step 8: Verifying job title contains '${searchKeyword}'`);
    const jobTitleContainsKeyword = await jobDetailsPage.jobTitleContains(
      searchKeyword
    );
    expect(jobTitleContainsKeyword).toBeTruthy();

    // Step 9: Save the job
    logger.info('Step 9: Clicking Save button');
    await jobDetailsPage.saveJob();

    // Step 10: Verify saved jobs count
    logger.info('Step 10: Verifying saved jobs count is 1');
    const savedCount = await jobsPage.getSavedJobsCount();
    expect(savedCount).toBe(1);

    // Step 11: Click on Saved jobs tab
    logger.info('Step 11: Clicking Saved jobs tab');
    await jobsPage.clickSavedJobsTab();

    // Step 12: Verify saved job title
    logger.info('Step 12: Verifying saved job title');
    const savedJobTitle = await jobsPage.getSavedJobTitle();
    expect(savedJobTitle.toLowerCase()).toContain(searchKeyword.toLowerCase());

    logger.info('✓ Scenario 1 completed successfully');
  });
});
