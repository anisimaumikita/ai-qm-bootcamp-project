# IKEA Jobs Automation - Playwright + TypeScript

A production-grade QA automation framework using Playwright and TypeScript with the Page Object Model (POM) architecture.

## 🏗️ Architecture Overview

### Project Structure
```
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts     # Base class for all pages
│   │   ├── HomePage.ts     # Home page object
│   │   ├── JobsPage.ts     # Jobs listing/search page
│   │   └── JobDetailsPage.ts # Job details page
│   ├── fixtures/           # Playwright test fixtures
│   │   └── testFixtures.ts # Custom fixtures with DI
│   ├── utils/              # Utilities and helpers
│   │   ├── logger.ts       # Structured logging
│   │   └── testData.ts     # Test data generators
│   └── config/             # Configuration files
│       ├── config.ts       # App configuration
│       └── constants.ts    # Constants (URLs, selectors)
├── tests/
│   └── scenarios/          # Test scenario files
│       ├── scenario1.spec.ts
│       ├── scenario2.spec.ts
│       └── scenario3.spec.ts
└── playwright.config.ts    # Playwright configuration
```

## 🎯 Key Principles

### Page Object Model (POM)
- **Page Objects** contain:
  - ✅ Locator definitions
  - ✅ Page interaction methods (click, fill, etc.)
  - ❌ NO assertions
  - ❌ NO business logic

- **Tests** contain:
  - ✅ Test flow and steps
  - ✅ Assertions
  - ❌ NO locator definitions
  - ❌ NO hardcoded values

### Best Practices
- **Strict TypeScript**: No `any` types allowed
- **No Hardcoded Values**: All constants in `src/config/`
- **Explicit Waits**: No `sleep()` calls, use proper waits
- **Flakiness Prevention**:
  - Role-based locators when possible
  - Proper wait strategies
  - Timeout configurations
  - Test isolation
- **DRY Principle**: Reusable methods in BasePage
- **Logging**: Structured logging for debugging

## 📋 Test Scenarios

### Scenario 1: Search for a Job
- Search for job with fallback mechanism
- Save job and verify in saved jobs list
- **Status**: ✅ Implemented

### Scenario 2: Subscribe for a Job
- Subscribe for job alerts with unique email
- Select category and location
- Verify confirmation message
- **Status**: ✅ Implemented

### Scenario 3: Custom Test Case
- TBD (To be designed by user)
- **Status**: 📝 Placeholder

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ikea-jobs-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Configuration

Set environment variables in `.env` file:
```
BASE_URL=https://www.ikea.com
ENV=prod
```

## ▶️ Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Scenario
```bash
npm run test:scenario1
npm run test:scenario2
npm run test:scenario3
```

### Run in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run with UI Mode (Interactive)
```bash
npm run test:ui
```

### Run in Debug Mode
```bash
npm run test:debug
```

### View Test Report
```bash
npm run report
```

## 🔍 Development

### Lint Code
```bash
npm run lint
```

### Fix Linting Issues
```bash
npm run lint:fix
```

### Format Code
```bash
npm run format
```

### Type Check
```bash
npm run type-check
```

### Generate Locators with Codegen
```bash
npm run codegen
```

## 📁 Configuration

### Playwright Configuration (`playwright.config.ts`)
- Browser configurations (Chromium, Firefox, WebKit)
- Timeout policies
- Retry strategies (2 retries on CI, 0 locally)
- Reporter configurations (HTML, JSON, JUnit)
- Screenshots and video recording on failure

### Test Data Configuration (`src/config/constants.ts`)
- Application URLs
- CSS/XPath selectors
- Search parameters
- Other constants

### App Configuration (`src/config/config.ts`)
- Base URL
- Browser list
- Timeout values

## 🐛 Debugging

### Enable Debug Logging
```bash
DEBUG=true npm test
```

### View Traces
Traces are automatically collected on test retry:
```bash
npm run report
```

### Generate Codegen
Use Playwright Inspector to generate locators:
```bash
npm run codegen
```

## 📊 Flakiness Prevention

### Implemented Strategies
1. **Proper Waits**:
   - `waitForLoadState('networkidle')`
   - Element visibility waits
   - Custom polling with timeout

2. **Stable Locators**:
   - Prefer role-based selectors
   - Use `data-testid` attributes
   - Avoid brittle DOM selectors

3. **Test Isolation**:
   - Each test is independent
   - Playwright fixtures provide setup/teardown
   - No test data dependencies

4. **Timeout Configuration**:
   - Navigation timeout: 30s
   - Action timeout: 15s
   - Expect timeout: 5s

## 🔄 CI/CD Integration

The framework is ready for CI/CD pipelines:
- Automatic retries on CI (2 retries)
- Single worker on CI for stability
- JUnit XML reports for CI tools
- Screenshots and videos on failure

## 📝 Contributing

### Code Review Checklist
- [ ] POM structure correctly used
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] Appropriate wait strategies
- [ ] Clear logging
- [ ] No test data dependencies
- [ ] Type safety (no `any`)
- [ ] DRY principle followed
- [ ] Descriptive test names
- [ ] Comments for complex logic

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📞 Support

For issues or questions, refer to:
- Playwright Discord: https://discord.gg/playwright
- GitHub Issues: [Create an issue](https://github.com)

## 📄 License

MIT License - See LICENSE file for details

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Maintainer**: QA Automation Team
