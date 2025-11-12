# CI/CD Documentation

## Overview

This project uses GitHub Actions for continuous integration and deployment.

## Workflows

### Build Workflow

- Triggers: Push to main/develop, PRs
- Tests Node.js 18.x and 20.x compatibility
- Builds the extension
- Uploads artifacts

### Verify Workflow

- Runs linting (ESLint)
- Checks formatting (Prettier)
- Type checking (TypeScript)
- Unit tests with coverage
- Posts coverage to PRs

### E2E Workflow

- Builds extension
- Installs Chromium
- Runs Playwright tests
- Uploads test reports

## Running Tests Locally

### Unit Tests

```bash
npm test                # Run once
jest --watch            # Watch mode (via jest directly)
npm run test:coverage   # With coverage
```

### E2E Tests

```bash
npm run test:e2e          # Headless (default)
npm run test:e2e:debug    # Debug mode with browser UI
npm run test:e2e:ui       # Playwright UI mode (interactive)
```

## Debugging E2E Tests

1. Use UI mode for interactive debugging:

   ```bash
   npm run test:e2e:ui
   ```

2. Use debug mode to step through:

   ```bash
   npm run test:e2e:debug
   ```

3. Check traces in `playwright-report/`

## Troubleshooting

### Extension Not Loading in Tests

- Ensure `dist/` folder exists and is built
- Check manifest.json is valid
- Verify all required files are in dist/

### Tests Timeout

- Increase timeout in playwright.config.ts
- Check if extension service worker starts
- Verify Chrome/Chromium is installed

### CI Failures

- Check GitHub Actions logs
- Download artifacts for debugging
- Run same Node version locally

## Testing the Setup

1. **Test locally first:**

```bash
# Run all checks
npm run check

# Build extension
npm run build

# Run E2E tests
npm run test:e2e
```

2. **Push to GitHub:**

```bash
git add .
git commit -m "feat: add CI/CD and E2E tests"
git push origin develop
```

3. **Create a PR and verify:**

- All GitHub Actions should run
- Check the status checks
- Review test reports

## Notes for Developers

- Always run `npm run check` before pushing (runs type-check, lint, format-check, and tests)
- E2E tests require built extension in `dist/`
- Use Playwright UI mode (`npm run test:e2e:ui`) for debugging tests
- Keep test fixtures updated with extension changes
- Monitor CI build times and optimize if needed
