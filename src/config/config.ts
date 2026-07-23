/**
 * Application Configuration
 * 
 * Centralizes all environment-specific and application configuration.
 * Prevents hardcoded values throughout the codebase.
 */

interface Config {
  baseUrl: string;
  browsers: string[];
  timeouts: {
    navigation: number;
    action: number;
    expect: number;
  };
}

const getConfig = (): Config => {
  const environment = process.env.ENV || 'prod';
  const baseUrl = process.env.BASE_URL || 'https://www.ikea.com';

  const config: Config = {
    baseUrl,
    browsers: ['chromium', 'firefox', 'webkit'],
    timeouts: {
      navigation: 30000, // 30 seconds
      action: 15000,     // 15 seconds
      expect: 5000,      // 5 seconds
    },
  };

  return config;
};

export const config = getConfig();
