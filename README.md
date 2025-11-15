# Chrome Extension Skeleton

A TypeScript-based Chrome extension with Webpack build system, featuring a "Hello World" popup and configuration page.

## Features

- **TypeScript** for type-safe code
- **Webpack 5** for bundling
- **Manifest V3** for modern Chrome extension API
- **Popup UI** with "Hello World" message
- **Options Page** with settings management (standard Chrome pattern)
- **Background Service Worker** for extension lifecycle management
- **Chrome Storage API** integration for persistent settings

## Project Structure

```
chrome-extension-skeleton/
├── src/
│   ├── popup/              # Extension popup
│   │   ├── popup.html
│   │   ├── popup.ts
│   │   └── popup.css
│   ├── options/            # Options/settings page
│   │   ├── options.html
│   │   ├── options.ts
│   │   └── options.css
│   ├── background/         # Background service worker
│   │   └── background.ts
│   └── manifest.json       # Extension manifest
├── assets/
│   └── icons/              # Extension icons
├── store-assets/           # Chrome Web Store assets
│   ├── screenshots/
│   └── promotional/
├── scripts/                # Build helper scripts
├── webpack.common.js       # Shared webpack config
├── webpack.dev.js          # Development config
├── webpack.prod.js         # Production config
└── tsconfig.json           # TypeScript config
```

## Prerequisites

- Node.js 18 or higher
- npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ChromeExtensionSkeletton
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

## Development

### Quick Start

The easiest way to test your extension:

```bash
npm start
```

This will:
1. Build the extension in development mode
2. Launch Chromium with the extension pre-loaded (via Playwright)
3. Display the extension ID and URLs in the console

Press `Ctrl+C` to stop the browser when done.

### Build Commands

- **Production build**: `npm run build`
- **Development build with watch**: `npm run dev`
- **Development build once**: `npm run dev:once`
- **Quick start with browser**: `npm start` (builds + launches Chromium)
- **Clean build directory**: `npm run clean`

### Loading the Extension Manually in Chrome

1. Build the extension:
   ```bash
   npm run build
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top right)

4. Click "Load unpacked"

5. Select the `dist` folder from this project

6. The extension icon should appear in your browser toolbar

### Testing the Extension

1. **Test Popup**:
   - Click the extension icon in the toolbar
   - You should see "Hello World" message

2. **Test Options Page**:
   - Right-click the extension icon and select "Options"
   - OR go to chrome://extensions/, find the extension, and click "Extension options"
   - Toggle the "Enable awesome feature" checkbox
   - Settings are automatically saved to Chrome storage

3. **Test Background Worker**:
   - Go to chrome://extensions/ > find your extension > click "service worker"
   - Check console logs in the DevTools that opens

## Scripts

The `scripts/` directory contains helper scripts:

- `start-browser.js` - Launches Chromium with the extension loaded using Playwright
- `test-extension-locally.sh` - Runs full test suite (build, unit tests, E2E tests)

## Configuration

### TypeScript Configuration

TypeScript settings are in `tsconfig.json`. Key settings:
- Strict mode enabled
- Target: ES6
- Chrome types included

### Webpack Configuration

- `webpack.common.js` - Shared configuration
- `webpack.dev.js` - Development mode with source maps and watch mode
- `webpack.prod.js` - Production mode with minification

## Chrome Extension Features

### Manifest V3

This extension uses Chrome's latest Manifest V3 format:
- Background service worker instead of persistent background page
- Improved security and performance
- Modern extension APIs

### Popup

The popup appears when clicking the extension icon, displaying:
- Hello World message
- Instructions for accessing options

### Options Page

Standard Chrome extension options page (accessible via right-click menu):
- Settings management with example checkbox
- Chrome storage sync integration
- Persistent settings across devices
- Opens in a full tab for easy configuration

### Background Service Worker

Handles extension lifecycle:
- Installation/update detection
- Default settings initialization
- Message handling

## Building for Production

1. Build the extension:
```bash
npm run build
```

2. The `dist/` folder contains the complete extension

3. To create a ZIP file for Chrome Web Store:
```bash
cd dist
zip -r ../extension.zip .
cd ..
```

## Development Tips

- Use `npm run dev` for automatic rebuilds during development
- Check Chrome DevTools for TypeScript source maps
- Monitor the service worker console for background script logs
- Test in Incognito mode to verify extension behavior with fresh state

## Browser Compatibility

- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)
- Manifest V3 required

## Adapting This Skeleton

This skeleton provides a solid foundation. Here's how to customize it:

1. **Update branding**: Change "Hello World Extension" to your extension name in:
   - `src/manifest.json` (name, description)
   - `src/popup/popup.html`
   - `src/options/options.html`
   - `package.json`

2. **Add functionality**:
   - Extend `src/popup/popup.ts` with your popup logic
   - Add settings in `src/options/options.html` and `src/options/options.ts`
   - Implement background logic in `src/background/background.ts`

3. **Add permissions**: Update `manifest.json` permissions array as needed:
   - `"tabs"` - for tab manipulation
   - `"activeTab"` - for current tab access
   - `"webNavigation"` - for navigation events
   - Add host_permissions for specific websites

4. **Add content scripts**: Create content scripts for page interaction:
   - Add files in `src/content/`
   - Register in `manifest.json` under `"content_scripts"`
   - Update webpack.common.js entry points

5. **Replace icons**: Update placeholder icons in `assets/icons/` with your design

## License

UNLICENSED - All rights reserved

## Notes

- Icons are placeholders - replace with your actual design assets
- The `storage` permission is included for the options page functionality
- Tests are fully configured - update them as you add features
- CI/CD is configured in `.github/workflows/` for automated testing
