# Tech Stack

## Core Technologies

- **TypeScript** (strict mode) - Primary language
- **Chrome Extension Manifest V3** - Extension API
- **Webpack 5** - Bundling with separate dev/prod configs

## Testing

- **Jest** - Unit testing with jsdom environment
- **Playwright** - E2E testing in real Chrome browser
- **ts-jest** - TypeScript support for Jest

## Code Quality

- **ESLint** - Linting with TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks (pre-commit, pre-push)
- **lint-staged** - Run linters on staged files

## Common Commands

```bash
# Development
npm run dev           # Watch mode build
npm run dev:once      # Single dev build
npm start             # Build + launch Chrome with extension

# Building
npm run build         # Production build to dist/

# Testing
npm test              # Run Jest unit tests
npm run test:coverage # Tests with coverage report
npm run test:e2e      # Run Playwright E2E tests

# Code Quality
npm run lint          # Type-check + format check + ESLint
npm run lint:fix      # Auto-fix ESLint issues
npm run format        # Format with Prettier
npm run type-check    # TypeScript type checking
npm run check         # Run all checks (lint + test)

# Cleanup
npm run clean         # Remove dist, coverage, test artifacts
```

## TypeScript Configuration

- Target: ES6
- Module: CommonJS
- Strict mode enabled
- Chrome types included (`@types/chrome`)

## Prettier Rules

- Single quotes
- Semicolons required
- Trailing commas (all)
- 100 char print width
- 2 space indentation

## ESLint Rules

- No explicit `any`
- No floating promises
- No misused promises
- Import ordering enforced (alphabetized)
- Console warnings (allow warn/error only)
