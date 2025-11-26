# Ticket 1: Project Foundation and Chrome Extension Setup

## Title
Setup TypeScript Chrome Extension with Basic Hello World Functionality

## Story Points: 5

## Description
Create the foundational structure for a Chrome extension using TypeScript with all necessary configuration files and a basic Hello World popup that opens a configuration page.

## Acceptance Criteria
- [ ] Project uses TypeScript for all source code
- [ ] Extension displays "Hello World" popup when clicked
- [ ] Popup has a button that opens a configuration page
- [ ] Configuration page displays "Hello World" text
- [ ] All required Chrome Web Store assets are present
- [ ] Project builds successfully with webpack
- [ ] Manifest V3 is used

## Technical Requirements
- TypeScript 5.x
- Webpack 5
- Chrome Manifest V3
- Node.js 18 or higher

## Step-by-Step Instructions

### 1. Initialize Project
```bash
mkdir chrome-extension-skeleton
cd chrome-extension-skeleton
npm init -y
```

### 2. Install Dependencies
```bash
npm install --save-dev \
  typescript \
  webpack \
  webpack-cli \
  webpack-merge \
  copy-webpack-plugin \
  ts-loader \
  @types/chrome \
  html-webpack-plugin
```

### 3. Create TypeScript Configuration
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "module": "commonjs",
    "target": "es6",
    "esModuleInterop": true,
    "sourceMap": true,
    "rootDir": "src",
    "outDir": "dist",
    "types": ["chrome"],
    "jsx": "react",
    "skipLibCheck": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Create Project Structure
```
chrome-extension-skeleton/
├── src/
│   ├── popup/
│   │   ├── popup.html
│   │   ├── popup.ts
│   │   └── popup.css
│   ├── config/
│   │   ├── config.html
│   │   ├── config.ts
│   │   └── config.css
│   ├── background/
│   │   └── background.ts
│   └── manifest.json
├── assets/
│   └── icons/
│       ├── icon-16.png
│       ├── icon-32.png
│       ├── icon-48.png
│       ├── icon-128.png
│       └── icon-512.png
├── store-assets/
│   ├── screenshots/
│   │   ├── screenshot-1280x800.png
│   │   └── screenshot-640x400.png
│   └── promotional/
│       ├── small-tile-440x280.png
│       ├── large-tile-920x680.png
│       └── marquee-1400x560.png
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── tsconfig.json
└── package.json
```

### 5. Create Manifest File
Create `src/manifest.json`:
```json
{
  "manifest_version": 3,
  "name": "Hello World Extension",
  "version": "1.0.0",
  "description": "A simple Hello World Chrome extension with TypeScript",
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "32": "icons/icon-32.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },
  "icons": {
    "16": "icons/icon-16.png",
    "32": "icons/icon-32.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png",
    "512": "icons/icon-512.png"
  },
  "background": {
    "service_worker": "background/background.js",
    "type": "module"
  },
  "permissions": [],
  "host_permissions": [],
  "web_accessible_resources": [
    {
      "resources": ["config/config.html"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

### 6. Create Popup Files

`src/popup/popup.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="popup.css">
  <title>Hello World Extension</title>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>Welcome to your Chrome Extension!</p>
    <button id="openConfig" class="btn-primary">Open Configuration</button>
  </div>
  <script src="popup.js"></script>
</body>
</html>
```

`src/popup/popup.ts`:
```typescript
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('openConfig');
  
  if (button) {
    button.addEventListener('click', () => {
      // Open configuration page in new tab
      chrome.tabs.create({ 
        url: chrome.runtime.getURL('config/config.html') 
      });
    });
  }
});
```

`src/popup/popup.css`:
```css
body {
  width: 300px;
  min-height: 200px;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
  padding: 20px;
  text-align: center;
}

h1 {
  color: #333;
  margin-top: 0;
  font-size: 24px;
}

p {
  color: #666;
  margin: 10px 0 20px;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #45a049;
}
```

### 7. Create Configuration Page

`src/config/config.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="config.css">
  <title>Extension Configuration</title>
</head>
<body>
  <div class="container">
    <h1>Hello World</h1>
    <p>This is the configuration page for the Hello World extension.</p>
    <div class="settings">
      <h2>Settings</h2>
      <label>
        <input type="checkbox" id="enableFeature">
        Enable awesome feature
      </label>
    </div>
  </div>
  <script src="config.js"></script>
</body>
</html>
```

`src/config/config.ts`:
```typescript
document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('enableFeature') as HTMLInputElement;
  
  // Load saved settings
  chrome.storage.sync.get(['enableFeature'], (result) => {
    if (checkbox && result.enableFeature !== undefined) {
      checkbox.checked = result.enableFeature;
    }
  });
  
  // Save settings on change
  if (checkbox) {
    checkbox.addEventListener('change', () => {
      chrome.storage.sync.set({ 
        enableFeature: checkbox.checked 
      });
    });
  }
});
```

`src/config/config.css`:
```css
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
}

.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  color: #333;
  margin-top: 0;
}

.settings {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

label {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

input[type="checkbox"] {
  margin-right: 10px;
}
```

### 8. Create Background Service Worker

`src/background/background.ts`:
```typescript
// Background service worker for Manifest V3
console.log('Background service worker started');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed');
    // Set default settings
    chrome.storage.sync.set({ 
      enableFeature: true 
    });
  } else if (details.reason === 'update') {
    console.log('Extension updated');
  }
});

// Keep service worker alive (if needed)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  sendResponse({ status: 'ok' });
  return true; // Keep message channel open for async response
});
```

### 9. Create Webpack Configuration

`webpack.common.js`:
```javascript
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'popup/popup': './src/popup/popup.ts',
    'config/config': './src/config/config.ts',
    'background/background': './src/background/background.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  optimization: {
    // Important: Don't split chunks for extension
    splitChunks: false,
    // Important for Manifest V3 service workers
    runtimeChunk: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/popup/popup.html', to: 'popup/popup.html' },
        { from: 'src/popup/popup.css', to: 'popup/popup.css' },
        { from: 'src/config/config.html', to: 'config/config.html' },
        { from: 'src/config/config.css', to: 'config/config.css' },
        { from: 'assets/icons', to: 'icons' }
      ]
    })
  ]
};
```

`webpack.dev.js`:
```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
});
```

`webpack.prod.js`:
```javascript
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map'
});
```

### 10. Update package.json Scripts
```json
{
  "name": "chrome-extension-skeleton",
  "version": "1.0.0",
  "description": "Chrome Extension with TypeScript and Webpack",
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack --config webpack.dev.js",
    "clean": "rm -rf dist"
  },
  "keywords": ["chrome-extension", "typescript", "webpack"],
  "author": "",
  "license": "MIT"
}
```

### 11. Create Icon Assets

Create placeholder icons for development. You can use any image editor or online tool:
- Use a simple design with "HW" text
- Create icons in PNG format with transparent background
- Required sizes: 16x16, 32x32, 48x48, 128x128, 512x512
- Save them in `assets/icons/` directory

### 12. Chrome Web Store Assets

Create these promotional images (can be placeholders initially):
- **Screenshots** (at least 1 required):
  - 1280x800 or 640x400 pixels
  - Show your extension in action
- **Promotional tiles** (optional):
  - Small tile: 440x280
  - Large tile: 920x680
  - Marquee: 1400x560

## Testing the Extension

1. Build the extension:
```bash
npm run build
```

2. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

3. Test functionality:
   - Click the extension icon to see the popup
   - Click "Open Configuration" to open the config page
   - Check Chrome DevTools for any errors

## Definition of Done
- [ ] All TypeScript files compile without errors
- [ ] Extension loads successfully in Chrome
- [ ] Popup opens when clicking extension icon
- [ ] Configuration page opens when button is clicked
- [ ] "Hello World" text is visible on configuration page
- [ ] All required icon sizes are present
- [ ] Build process completes successfully
- [ ] Source maps work for debugging

## Notes for Developers
- The service worker (background script) must not use `window` or `document` objects
- Use `chrome.runtime.getURL()` for extension resources
- Manifest V3 uses service workers instead of background pages
- Always test in an actual Chrome browser, not just the build process
