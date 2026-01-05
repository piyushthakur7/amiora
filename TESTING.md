# Testing Documentation - PastedPerfect

## Overview
This document provides comprehensive information about the testing setup for the PastedPerfect e-commerce website.

## Test Structure

### Unit Tests
Located in `client/src/**/__tests__/`

- **Cart Store Tests** (`lib/__tests__/cart-store.test.ts`)
  - Add items to cart
  - Remove items from cart
  - Update quantities
  - Calculate totals
  - Clear cart

- **Component Tests** (`components/__tests__/`)
  - ProductCard rendering and interactions
  - Header navigation and cart display
  - Footer links and sections

- **Page Tests** (`pages/__tests__/`)
  - Home page sections and data loading
  - Integration with React Query

### E2E Tests
Located in `e2e/`

- **Homepage Tests** (`homepage.spec.ts`)
  - Page load and rendering
  - Section visibility
  - Responsive design
  - Image loading

- **Cart Tests** (`cart.spec.ts`)
  - Add to cart flow
  - Update quantities
  - Remove items
  - Checkout navigation

- **Navigation Tests** (`navigation.spec.ts`)
  - Page transitions
  - Category browsing
  - Browser history
  - Scroll behavior

- **Authentication Tests** (`auth.spec.ts`)
  - Login form validation
  - Registration flow
  - Session persistence
  - Password visibility toggle

- **Product Tests** (`products.spec.ts`)
  - Product listing
  - Filtering and sorting
  - Search functionality
  - Product detail pages

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:ui
```

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test e2e/homepage.spec.ts
```

### Run All Tests

```bash
npm run test:all
```

## Test Coverage

Current coverage targets:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

View coverage report after running tests:
```bash
npm test
# Coverage report will be in coverage/lcov-report/index.html
```

## Writing New Tests

### Unit Test Example

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test';

test('should perform action', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Click Me' }).click();
  await expect(page).toHaveURL('/new-page');
});
```

## Mocking

### API Mocking
WooCommerce API calls are mocked in unit tests:

```typescript
jest.mock('@/lib/woocommerce', () => ({
  getProducts: jest.fn(() => Promise.resolve([...])),
}));
```

### Store Mocking
Zustand stores can be mocked:

```typescript
jest.mock('@/lib/cart-store', () => ({
  useCart: () => ({
    items: [],
    addItem: jest.fn(),
  }),
}));
```

## CI/CD Integration

Tests are configured to run in CI environments:
- Playwright retries failed tests 2 times in CI
- Single worker in CI for stability
- HTML and JSON reports generated

## Debugging Tests

### Unit Tests
```bash
# Run specific test file
npm test -- cart-store.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should add item"
```

### E2E Tests
```bash
# Debug mode
npx playwright test --debug

# Run specific browser
npx playwright test --project=chromium

# Generate trace
npx playwright test --trace on
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Use beforeEach/afterEach for setup/teardown
3. **Assertions**: Use specific, meaningful assertions
4. **Naming**: Use descriptive test names (should/when/given)
5. **Coverage**: Aim for high coverage but focus on critical paths
6. **Speed**: Keep unit tests fast, E2E tests comprehensive
7. **Flakiness**: Avoid time-dependent tests, use waitFor utilities

## Troubleshooting

### Common Issues

**Tests timing out**
- Increase timeout in test or config
- Check for missing await statements
- Verify network requests complete

**Element not found**
- Use waitFor utilities
- Check selectors are correct
- Verify component actually renders element

**Mock not working**
- Ensure mock is defined before import
- Check mock path matches actual import
- Clear mocks between tests

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
