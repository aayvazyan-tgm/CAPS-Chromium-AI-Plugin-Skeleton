# Ticket 2: Code Quality - Linting and Formatting Setup

## Title
Configure ESLint, Prettier, and Husky for Code Quality

## Story Points: 3

## Description
Set up automated code quality tools including ESLint for linting TypeScript code, Prettier for consistent formatting, and Husky with lint-staged for pre-commit hooks.

## Prerequisites
- Ticket 1 completed (Project Foundation)
- Working Chrome extension build

## Acceptance Criteria
- [ ] ESLint configured for TypeScript
- [ ] Prettier integrated with ESLint
- [ ] Pre-commit hooks run linting and formatting automatically
- [ ] All code passes linting without errors
- [ ] Formatting is consistent across all files
- [ ] All commands available through package.json scripts
- [ ] Configuration files are properly ignored

## Step-by-Step Instructions

### 1. Install ESLint and TypeScript Plugin
```bash
npm install --save-dev \
  eslint \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-import-resolver-typescript \
  eslint-plugin-import
```

### 2. Install Prettier and Integration
```bash
npm install --save-dev \
  prettier \
  eslint-config-prettier \
  eslint-plugin-prettier
```

### 3. Install Husky and Lint-Staged
```bash
npm install --save-dev \
  husky \
  lint-staged
```

### 4. Create ESLint Configuration
Create `.eslintrc.json`:
```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "env": {
    "browser": true,
    "es2021": true,
    "webextensions": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "@typescript-eslint",
    "import",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "no-console": [
      "warn",
      {
        "allow": ["warn", "error"]
      }
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "import/no-unresolved": "error",
    "import/no-cycle": "error",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./tsconfig.json"
      }
    }
  }
}
```

### 5. Create Prettier Configuration
Create `.prettierrc.json`:
```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "bracketSameLine": false
}
```

### 6. Create Prettier Ignore File
Create `.prettierignore`:
```
# Dependencies
node_modules/

# Build output
dist/
build/

# Config files that shouldn't be formatted
*.html
*.css

# Package files
package-lock.json
yarn.lock
pnpm-lock.yaml

# Coverage
coverage/
.nyc_output/

# Misc
*.md
*.log
.DS_Store
```

### 7. Create ESLint Ignore File
Create `.eslintignore`:
```
# Dependencies
node_modules/

# Build output
dist/
build/

# Webpack configs (JavaScript files)
webpack.*.js
webpack.config.js

# Coverage
coverage/
.nyc_output/

# Misc
*.md
*.log
```

### 8. Create Editor Configuration
Create `.editorconfig`:
```ini
# EditorConfig helps maintain consistent coding styles

root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false

[*.{json,yml,yaml}]
indent_size = 2

[Makefile]
indent_style = tab
```

### 9. Initialize Husky
```bash
npx husky-init && npm install
```

This creates a `.husky` directory with the Git hooks infrastructure.

### 10. Configure Lint-Staged
Add to `package.json`:
```json
{
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{js,json}": [
      "prettier --write"
    ],
    "*.{md,yml,yaml}": [
      "prettier --write --prose-wrap always"
    ]
  }
}
```

### 11. Update Husky Pre-commit Hook
Update `.husky/pre-commit`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run lint-staged on staged files
npx lint-staged

# Run type checking
npm run type-check
```

### 12. Create Husky Pre-push Hook
Create `.husky/pre-push`:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run full lint and build before push
npm run lint
npm run build
```

Make it executable:
```bash
chmod +x .husky/pre-push
```

### 13. Update package.json Scripts
Update the scripts section in `package.json`:
```json
{
  "scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack --config webpack.dev.js",
    "clean": "rm -rf dist",
    "lint": "eslint 'src/**/*.ts' --max-warnings=0",
    "lint:fix": "eslint 'src/**/*.ts' --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "check": "npm run type-check && npm run lint && npm run format:check",
    "prepare": "husky install",
    "pre-commit": "lint-staged"
  }
}
```

### 14. Fix Existing Code

First, run type checking:
```bash
npm run type-check
```

Then fix any linting issues automatically:
```bash
npm run lint:fix
```

Format all files:
```bash
npm run format
```

### 15. Create VS Code Settings (Optional)
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.exclude": {
    "node_modules": true,
    "dist": true
  },
  "eslint.validate": [
    "javascript",
    "typescript"
  ]
}
```

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "editorconfig.editorconfig"
  ]
}
```

### 16. Test the Setup

Test individual commands:
```bash
# Check types
npm run type-check

# Check linting
npm run lint

# Check formatting
npm run format:check

# Run all checks
npm run check
```

Test pre-commit hook:
```bash
# Make a change to a TypeScript file
echo "// test" >> src/popup/popup.ts

# Stage and commit
git add src/popup/popup.ts
git commit -m "test: pre-commit hook"
```

The pre-commit hook should run and format/lint your code automatically.

## Common Linting Issues and Fixes

### Issue: Chrome API types not recognized
**Fix**: Ensure `"webextensions": true` is in ESLint env config

### Issue: Import errors for Chrome APIs
**Fix**: Chrome APIs are global, no import needed

### Issue: Async function without await
**Fix**: Either add await or remove async keyword

### Issue: Floating promises
**Fix**: Either await the promise or explicitly void it:
```typescript
// Bad
chrome.tabs.create({ url: 'test.html' });

// Good
void chrome.tabs.create({ url: 'test.html' });
```

## Definition of Done
- [ ] ESLint installed and configured for TypeScript
- [ ] Prettier integrated with ESLint
- [ ] All existing code passes linting
- [ ] All existing code is properly formatted
- [ ] Husky pre-commit hooks work
- [ ] Pre-push hook validates build
- [ ] VS Code settings provided (optional)
- [ ] All npm scripts work correctly
- [ ] No ESLint warnings in the codebase

## Benefits
- Consistent code style across the team
- Automatic code formatting on save
- Catch potential bugs before runtime
- TypeScript type checking enforced
- Clean commits with pre-commit hooks
- Reduced code review discussions about style

## Notes for Developers
- Run `npm run check` before creating PRs
- VS Code users should install recommended extensions
- Use `// eslint-disable-next-line` sparingly and with justification
- Keep prettier and ESLint configs in sync
- Update rules as a team decision
