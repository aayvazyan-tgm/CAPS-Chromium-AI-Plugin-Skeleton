# Chrome Extension Skeleton 🚀

A production-ready Chrome Extension V3 starter with TypeScript, automated testing, and CI/CD.

## Why This Skeleton? ✨

**🤖 AI-Friendly Codebase**
- Clean, well-structured TypeScript code that AI tools understand instantly
- Consistent patterns and clear separation of concerns
- Comprehensive tooling setup with ESLint, Prettier, and Husky

**🧪 Automated E2E Testing**
- Playwright tests that run your extension in a real Chrome browser
- GitHub Actions CI/CD pipeline with build verification, linting, unit tests, and E2E tests
- Pre-configured test scripts for local and CI environments

**⚡ Simple Manifest V3 Example**
- Modern Chrome Extension API with service workers
- Minimal "Hello World" implementation that's easy to understand and extend
- Working examples of popup, options page, and background worker

**🔧 Ready-to-Use NPM Scripts**
```bash
npm start           # Build + launch Chrome with extension loaded
npm run build       # Production build
npm run dev         # Development build with watch mode
npm test            # Run unit tests
npm run test:e2e    # Run E2E tests in Chrome
npm run check       # Type-check, lint, format, and test
```

**📦 Complete TypeScript Setup**
- Strict TypeScript configuration with Chrome types
- Webpack 5 bundling with source maps
- Development and production builds optimized

**⚙️ GitHub Actions Workflows**
- Automated build verification on every push/PR
- Parallel jobs for linting, testing, and E2E tests
- Automatic release artifact generation on main branch

## Implementation Examples 📚

See what you can build with this skeleton — both examples were built with a single prompt, no intervention required:

| Example | Description | Repository |
|---------|-------------|------------|
| 🍬 Candy Counter Sidebar | A sidebar extension that counts candies on web pages | [chrome-plugin-example-impl-1-candy-counter-sidebar](https://github.com/aayvazyan-tgm/chrome-plugin-example-impl-1-candy-counter-sidebar) |
| ⏱️ Countdown Timer | A countdown timer extension with notifications | [chrome-plugin-example-impl-2-countown-timer](https://github.com/aayvazyan-tgm/chrome-plugin-example-impl-2-countown-timer) |

## Quick Start

```bash
# Install dependencies
npm install

# Launch Chrome with extension loaded
npm start
```

That's it! Chrome will open with your extension installed. Click the extension icon to see the popup.

## Project Structure

```
src/
├── popup/              # Extension popup UI
│   ├── popup.html
│   ├── popup.ts
│   └── popup.css
├── options/            # Settings/options page
│   ├── options.html
│   ├── options.ts
│   └── options.css
├── background/         # Service worker
│   └── background.ts
└── manifest.json       # Extension manifest (V3)
```

## Development Workflow

### 1. Start Development
```bash
npm run dev          # Auto-rebuild on file changes
```

### 2. Test Locally
```bash
npm start            # Build + launch Chrome
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
```

### 3. Check Quality
```bash
npm run check        # Run all checks (types, lint, format, tests)
```

### 4. Build for Production
```bash
npm run build        # Creates optimized build in dist/
```

## Loading Extension Manually

1. Build: `npm run build`
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" → select `dist/` folder

## NPM Scripts Reference

| Command | Description |
|---------|-------------|
| `npm start` | Build and launch Chrome with extension |
| `npm run build` | Production build with minification |
| `npm run dev` | Development build with watch mode |
| `npm run dev:once` | Single development build |
| `npm test` | Run Jest unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:debug` | Debug E2E tests interactively |
| `npm run test:e2e:ui` | Run E2E tests in UI mode |
| `npm run type-check` | Check TypeScript types |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run check` | Run all quality checks |
| `npm run clean` | Remove build artifacts |

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-combined.yml`) runs on every push and PR:

1. **Build Job** - Compiles extension and verifies output files
2. **Verify Job** - Runs TypeScript checks, ESLint, Prettier, and unit tests
3. **E2E Job** - Runs Playwright tests in Chrome
4. **Release Job** - Creates release artifact on main branch

All jobs run in parallel for fast feedback.

## Extension Features

### Popup
Click the extension icon to see a simple "Hello World" popup with instructions.

### Options Page
Right-click the extension icon → "Options" to access the settings page with Chrome storage sync.

### Background Service Worker
Handles extension lifecycle events, installation, and default settings initialization.

## Customizing for Your Extension

1. **Update branding** in `manifest.json`, `package.json`, and HTML files
2. **Add functionality** in `src/popup/`, `src/options/`, `src/background/`
3. **Add permissions** in `manifest.json` as needed (`tabs`, `activeTab`, etc.)
4. **Add content scripts** - create `src/content/` and register in `manifest.json`
5. **Replace icons** in `assets/icons/` with your design

## Requirements

- Node.js 18+
- Chrome 88+ or Chromium-based browser

## License

Apache License, Version 2.0 - See [LICENSE](LICENSE) for details.
