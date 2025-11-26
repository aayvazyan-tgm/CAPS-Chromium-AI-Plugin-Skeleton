# Project Structure

```
├── src/                    # Source code
│   ├── manifest.json       # Chrome extension manifest (V3)
│   ├── background/         # Service worker
│   │   ├── background.ts
│   │   └── __tests__/      # Unit tests
│   ├── popup/              # Extension popup UI
│   │   ├── popup.html
│   │   ├── popup.ts
│   │   ├── popup.css
│   │   └── __tests__/
│   └── options/            # Options/settings page
│       ├── options.html
│       ├── options.ts
│       └── options.css
├── e2e/                    # Playwright E2E tests
├── assets/
│   └── icons/              # Extension icons (16-512px)
├── dist/                   # Build output (gitignored)
├── scripts/                # Build/launch helper scripts
└── store-assets/           # Chrome Web Store assets
```

## Key Conventions

### Test Files
- Unit tests: `src/**/__tests__/*.test.ts`
- E2E tests: `e2e/*.spec.ts`

### Entry Points (Webpack)
- `src/popup/popup.ts` → `dist/popup/popup.js`
- `src/options/options.ts` → `dist/options/options.js`
- `src/background/background.ts` → `dist/background/background.js`

### Static Assets
Copied to dist via CopyWebpackPlugin:
- HTML/CSS files from popup and options
- Icons from `assets/icons/`
- `manifest.json`

### Adding New Features
1. **Content scripts**: Create `src/content/` and register in `manifest.json`
2. **New pages**: Add entry in `webpack.common.js` and copy patterns
3. **Permissions**: Update `manifest.json` permissions array
