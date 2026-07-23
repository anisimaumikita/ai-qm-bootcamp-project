/**
 * Application Constants
 * 
 * All hardcoded strings, URLs, and constants are centralized here.
 * This prevents magic strings throughout the codebase.
 */

export const URLS = {
  HOME: '/',
  JOBS: '/en/jobs',
  CAREERS: '/en/company/careers',
} as const;

export const JOBS_SEARCH_PARAMS = {
  DEFAULT_JOB_TITLE: 'Manager',
  FALLBACK_JOB_TITLE: 'Designer',
  SEARCH_TIMEOUT: 5000, // 5 seconds for search results to load
} as const;

export const SELECTORS = {
  // Header/Navigation
  JOBS_TAB: 'a[href*="/jobs"]',
  CAREERS_LINK: 'a[href*="/careers"]',

  // Jobs page
  EXPLORE_JOBS_BUTTON: 'button:has-text("Explore available jobs")',
  SEARCH_INPUT: 'input[placeholder*="Search"]',
  SEARCH_JOB_TITLE_INPUT: 'input[placeholder*="job title"], input[aria-label*="job title"]',
  POSTCODE_INPUT: 'input[placeholder*="postcode"], input[placeholder*="location"]',
  SEARCH_JOBS_BUTTON: 'button:has-text("Search jobs")',
  
  // Job list
  JOB_LIST: '[data-testid="job-list"], .job-list, [role="list"]',
  FIRST_JOB_ITEM: '[data-testid="job-item"]:first-child, .job-item:first-child',
  JOB_TITLE: '[data-testid="job-title"], .job-title',
  
  // Job details
  JOB_DETAIL_TITLE: 'h1, [role="heading"]',
  SAVE_JOB_BUTTON: 'button:has-text("Save"), button[aria-label*="Save"]',
  SAVED_JOBS_BADGE: '[data-testid="saved-jobs-count"], .saved-jobs-count',
  SAVED_JOBS_TAB: 'a:has-text("Saved jobs"), button:has-text("Saved jobs")',
  
  // Email subscription
  EMAIL_INPUT: 'input[type="email"]',
  CATEGORY_SELECT: 'select, [role="combobox"]',
  CATEGORY_OPTION: '[role="option"]',
  LOCATION_INPUT: 'input[placeholder*="location"], input[placeholder*="city"]',
  SIGN_UP_BUTTON: 'button:has-text("Sign up")',
  CONFIRMATION_MESSAGE: '[role="alert"], .confirmation, .success-message',
} as const;

export const MESSAGES = {
  NO_JOBS_FOUND: '0 jobs found',
  SEARCH_CONFIRMATION: 'Search results',
} as const;

export const TEST_DATA = {
  VALID_EMAIL: 'test@example.com',
  SEARCH_TIMEOUT_MS: 5000,
} as const;
