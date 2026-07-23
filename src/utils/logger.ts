/**
 * Logger Utility
 * 
 * Provides structured logging for test execution.
 * Helps with debugging and test result analysis.
 */

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

class Logger {
  private prefix: string;

  constructor(testName: string) {
    this.prefix = `[${testName}]`;
  }

  info(message: string, data?: unknown): void {
    console.log(`${this.prefix} ${LogLevel.INFO}: ${message}`, data || '');
  }

  warn(message: string, data?: unknown): void {
    console.warn(`${this.prefix} ${LogLevel.WARN}: ${message}`, data || '');
  }

  error(message: string, error?: Error | unknown): void {
    console.error(`${this.prefix} ${LogLevel.ERROR}: ${message}`, error || '');
  }

  debug(message: string, data?: unknown): void {
    if (process.env.DEBUG) {
      console.debug(`${this.prefix} ${LogLevel.DEBUG}: ${message}`, data || '');
    }
  }
}

export const createLogger = (testName: string): Logger => new Logger(testName);
