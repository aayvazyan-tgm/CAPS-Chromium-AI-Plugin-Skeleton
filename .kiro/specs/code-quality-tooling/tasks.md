# Implementation Plan

- [x] 1. Install ESLint dependencies and create base configuration
  - Install eslint, @typescript-eslint/parser, @typescript-eslint/eslint-plugin, eslint-plugin-import, eslint-import-resolver-typescript
  - Create `.eslintrc.json` with TypeScript parser configuration
  - Configure parser options to use tsconfig.json
  - Set up environment for browser, ES2021, webextensions, and node
  - Create `.eslintignore` file to exclude build outputs and dependencies
  - _Requirements: 1.1, 1.5, 6.1, 6.2_

- [x] 2. Configure ESLint rules for TypeScript and imports
  - Add ESLint rule configurations for no-explicit-any, no-floating-promises, no-misused-promises
  - Configure no-unused-vars rule with underscore prefix exceptions
  - Set up import/order rule with alphabetical sorting and group organization
  - Configure import/no-unresolved and import/no-cycle rules
  - Add import resolver settings for TypeScript path mappings
  - _Requirements: 1.2, 1.3, 1.4, 7.1, 7.2, 7.3, 7.4_

- [x]* 2.1 Write property test for ESLint rule enforcement
  - **Property 1: ESLint rule enforcement consistency**
  - **Validates: Requirements 1.2, 1.3, 8.1, 8.2, 8.3**

- [x]* 2.2 Write property test for import ordering
  - **Property 3: Import ordering enforcement**
  - **Validates: Requirements 1.4, 7.4**

- [x]* 2.3 Write property test for import resolution
  - **Property 12: Import resolution validation**
  - **Validates: Requirements 7.2, 7.3**

- [x]* 2.4 Write unit test for Chrome API recognition
  - Test that code using chrome.* APIs does not produce undefined variable errors
  - _Requirements: 1.5_

- [x] 3. Install Prettier and integrate with ESLint
  - Install prettier, eslint-config-prettier, eslint-plugin-prettier
  - Create `.prettierrc.json` with formatting rules (single quotes, semicolons, trailing commas, 100 char width, 2 space indent, LF endings)
  - Create `.prettierignore` file to exclude build outputs, HTML, CSS, and lock files
  - Add prettier plugin and config to ESLint extends array
  - Add prettier/prettier rule to ESLint configuration
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.3, 6.4_

- [x]* 3.1 Write property test for Prettier formatting consistency
  - **Property 2: Prettier formatting consistency**
  - **Validates: Requirements 2.1, 2.2, 2.5**

- [x]* 3.2 Write property test for ignore pattern exclusion
  - **Property 4: Ignore pattern exclusion**
  - **Validates: Requirements 2.4, 6.1, 6.3**

- [x]* 3.3 Write unit test for ESLint-Prettier integration
  - Test that Prettier rules take precedence over conflicting ESLint rules
  - _Requirements: 2.3_

- [x] 4. Create EditorConfig file
  - Create `.editorconfig` with UTF-8 charset, LF line endings, 2 space indentation
  - Configure trim trailing whitespace and insert final newline
  - Add special rules for markdown and YAML files
  - _Requirements: 6.5_

- [x] 5. Add npm scripts for linting and formatting
  - Add "lint" script to run ESLint on src/**/*.ts with --max-warnings=0
  - Add "lint:fix" script to run ESLint with --fix flag
  - Add "format" script to run Prettier with --write on all files
  - Add "format:check" script to run Prettier with --check flag
  - Add "type-check" script to run tsc --noEmit
  - Add "check" script to run type-check, lint, and format:check in sequence
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x]* 5.1 Write property test for lint script warning enforcement
  - **Property 8: Lint script warning enforcement**
  - **Validates: Requirements 5.1**

- [x]* 5.2 Write property test for auto-fix idempotence
  - **Property 9: Auto-fix idempotence**
  - **Validates: Requirements 5.2**

- [x]* 5.3 Write property test for format script consistency
  - **Property 10: Format script consistency**
  - **Validates: Requirements 5.3**

- [x]* 5.4 Write property test for format:check non-modification
  - **Property 11: Format:check non-modification**
  - **Validates: Requirements 5.4**

- [x]* 5.5 Write unit test for type-check script
  - Verify the script runs tsc with --noEmit flag
  - _Requirements: 5.5_

- [x]* 5.6 Write unit test for check script sequence
  - Verify the script runs type-check, lint, and format:check in order
  - _Requirements: 5.6_

- [x] 6. Install and configure Husky
  - Install husky package
  - Run npx husky-init to create .husky directory
  - Add "prepare" script to package.json to run husky install
  - Run npm install to trigger prepare script
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 7. Install and configure lint-staged
  - Install lint-staged package
  - Add lint-staged configuration to package.json
  - Configure "*.ts" pattern to run eslint --fix and prettier --write
  - Configure "*.{js,json}" pattern to run prettier --write
  - Configure "*.{md,yml,yaml}" pattern to run prettier --write --prose-wrap always
  - _Requirements: 3.1, 3.2_

- [x]* 7.1 Write property test for lint-staged file processing
  - **Property 5: Lint-staged file processing**
  - **Validates: Requirements 3.1, 3.2**

- [x] 8. Create pre-commit hook
  - Update .husky/pre-commit file to run npx lint-staged
  - Add npm run type-check command after lint-staged
  - Ensure hook exits with error code if any check fails
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x]* 8.1 Write property test for pre-commit failure blocking
  - **Property 6: Pre-commit failure blocking**
  - **Validates: Requirements 3.4**

- [x]* 8.2 Write unit test for pre-commit success case
  - Test that commits proceed when all checks pass
  - _Requirements: 3.5_

- [x]* 8.3 Write unit test for pre-commit hook sequence
  - Verify lint-staged runs before type-check
  - _Requirements: 3.3_

- [x] 9. Create pre-push hook
  - Create .husky/pre-push file with husky shebang
  - Add npm run lint command
  - Add npm run build command
  - Make file executable (chmod +x)
  - Ensure hook exits with error code if any check fails
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x]* 9.1 Write property test for pre-push failure blocking
  - **Property 7: Pre-push failure blocking**
  - **Validates: Requirements 4.3**

- [x]* 9.2 Write unit test for pre-push success case
  - Test that pushes proceed when all checks pass
  - _Requirements: 4.4_

- [x]* 9.3 Write unit test for pre-push hook commands
  - Verify lint and build commands are executed
  - _Requirements: 4.1, 4.2_

- [x] 10. Configure console statement rules
  - Add no-console rule to ESLint configuration with warn level
  - Configure allow array to permit console.warn and console.error
  - _Requirements: 8.1, 8.2, 8.3_

- [x] 11. Run initial code quality fixes
  - Execute npm run lint:fix to auto-fix existing issues
  - Execute npm run format to format all existing files
  - Manually fix any remaining ESLint errors that cannot be auto-fixed
  - Verify npm run check passes with no errors
  - _Requirements: All requirements - validation_

- [x] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
