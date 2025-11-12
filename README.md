# Chrome Extension Skeleton

A TypeScript-based Chrome extension with Webpack build system, featuring a "Hello World" popup and configuration page.

## Features

- **TypeScript** for type-safe code
- **Webpack 5** for bundling
- **Manifest V3** for modern Chrome extension API
- **Popup UI** with "Hello World" message
- **Configuration Page** with settings management
- **Background Service Worker** for extension lifecycle management
- **Chrome Storage API** integration

## Project Structure

```
chrome-extension-skeleton/
├── src/
│   ├── popup/              # Extension popup
│   │   ├── popup.html
│   │   ├── popup.ts
│   │   └── popup.css
│   ├── config/             # Configuration page
│   │   ├── config.html
│   │   ├── config.ts
│   │   └── config.css
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

### Build Commands

- **Production build**: `npm run build`
- **Development build with watch**: `npm run dev`
- **Clean build directory**: `npm run clean`

### Loading the Extension in Chrome

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
   - You should see "Hello World" with a button

2. **Test Configuration Page**:
   - Click the "Open Configuration" button in the popup
   - A new tab should open with the configuration page
   - Toggle the "Enable awesome feature" checkbox
   - Settings are automatically saved to Chrome storage

3. **Test Background Worker**:
   - Open Chrome DevTools for the extension (chrome://extensions/ > Details > "service worker")
   - Check console logs for "Background service worker started"

## Scripts

The `scripts/` directory contains helper scripts:

- `generate-icons.js` - Generates placeholder icons for the extension
- `generate-store-assets.js` - Generates Chrome Web Store promotional images

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
- Button to open configuration page

### Configuration Page

Full-page configuration interface with:
- Settings management
- Chrome storage sync integration
- Persistent settings across devices

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

## Next Steps

After completing this foundation:

1. **Ticket 2**: Add ESLint, Prettier, and Husky for code quality
2. **Ticket 3**: Set up GitHub Actions CI/CD and Playwright E2E tests

## License

UNLICENSED - All rights reserved

## Notes

- Icons are generated placeholders - replace with actual design assets
- Store assets are placeholders for Chrome Web Store listing
- Storage permissions are enabled but can be customized in manifest.json
