# Design Document

## Overview

This design establishes a comprehensive code quality infrastructure for the Chrome Extension project using industry-standard tools: ESLint for static analysis, Prettier for code formatting, and Husky with lint-staged for automated Git hooks. The system will enforce TypeScript best practices, catch common errors before runtime, and ensure consistent code style across all contributors.

The design follows a layered approach:
1. **Static Analysis Layer**: ESLint with TypeScript-specific rules
2. **Formatting Layer**: Prettier with ESLint integration
3. **Automation Layer**: Git hooks via Husky and lint-staged
4. **Developer Experience Layer**: npm scripts and editor integration

## Architecture

### Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Git Hooks (Husky)                       │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Pre-commit Hook │         │  Pre-push Hook   │         │
│  │  - lint-staged   │         │  - lint          │         │
│  │  - type-check    │         │  - build         │         │
│  └──────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Lint-staged Processor                     │
│              (Runs tools on staged files only)               │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│      ESLint Engine        │   │    Prettier Formatter     │
│  - TypeScript Parser      │   │  - Style Rules            │
│  - Import Resolver        │   │  - Line Width             │
│  - Rule Enforcement       │   │  - Quote Style            │
│  - Auto-fix Capability    │   │  - Indentation            │
└───────────────────────────┘   └───────────────────────────┘
                │                           │
                └─────────────┬─────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    TypeScript Compiler                       │
│                   (Type Checking Only)                       │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Developer commits code** → Husky intercepts commit
2. **Pre-commit hook triggers** → Executes lint-staged
3. **Lint-staged identifies staged files** → Filters by file type
4. **ESLint runs on TypeScript files** → Auto-fixes issues
5. **Prettier runs on all files** → Formats code
6. **TypeScript compiler checks types** → Validates type safety
7. **All checks pass** → Commit proceeds
8. **Developer pushes code** → Pre-push hook triggers
9. **Full lint and build execute** → Validates entire codebase
10. **Push proceeds or fails** → Based on validation results

## Components and Interfaces

### 1. ESLint Configuration Component

**Purpose**: Define linting rules and parser configuration for TypeScript code analysis.

**Configuration File**: `.eslintrc.json` (legacy format) or `eslint.config.js` (flat config)

**Key Interfaces**:
```typescript
interface ESLintConfig {
  parser: string;                    // '@typescript-eslint/parser'
  parserOptions: ParserOptions;
  env: Environment;
  extends: string[];                 // Rule presets
  plugins: string[];                 // Additional plugins
  rules: Record<string, RuleConfig>; // Rule overrides
  settings: Settings;                // Plugin settings
}

interface ParserOptions {
  ecmaVersion: number;
  sourceType: 'module' | 'script';
  project: string;                   // Path to tsconfig.json
}

interface Environment {
  browser: boolean;
  es2021: boolean;
  webextensions: boolean;
  node: boolean;
}
```

**Dependencies**:
- `eslint`: Core linting engine
- `@typescript-eslint/parser`: TypeScript syntax parser
- `@typescript-eslint/eslint-plugin`: TypeScript-specific rules
- `eslint-plugin-import`: Import/export validation
- `eslint-import-resolver-typescript`: TypeScript import resolution
- `eslint-plugin-prettier`: Prettier integration
- `eslint-config-prettier`: Disables conflicting ESLint rules

### 2. Prettier Configuration Component

**Purpose**: Define code formatting rules for consistent style.

**Configuration File**: `.prettierrc.json`

**Key Interfaces**:
```typescript
interface PrettierConfig {
  semi: boolean;              // Semicolons
  trailingComma: 'all' | 'es5' | 'none';
  singleQuote: boolean;
  printWidth: number;
  tabWidth: number;
  useTabs: boolean;
  bracketSpacing: boolean;
  arrowParens: 'always' | 'avoid';
  endOfLine: 'lf' | 'crlf' | 'auto';
  quoteProps: 'as-needed' | 'consistent' | 'preserve';
}
```

**Ignore Patterns**: `.prettierignore`
- Build outputs (dist/, build/)
- Dependencies (node_modules/)
- Lock files (package-lock.json, yarn.lock)
- Generated files

### 3. Husky Git Hooks Component

**Purpose**: Automate quality checks at Git lifecycle events.

**Hook Files**:
- `.husky/pre-commit`: Runs before commit finalization
- `.husky/pre-push`: Runs before pushing to remote

**Key Interfaces**:
```bash
# Pre-commit hook structure
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Commands to execute
npx lint-staged
npm run type-check
```

**Installation**: `npx husky-init && npm install`

### 4. Lint-staged Configuration Component

**Purpose**: Run linters only on staged Git files for performance.

**Configuration**: Added to `package.json`

**Key Interfaces**:
```typescript
interface LintStagedConfig {
  [glob: string]: string | string[];
}

// Example configuration
{
  "*.ts": ["eslint --fix", "prettier --write"],
  "*.{js,json}": ["prettier --write"],
  "*.{md,yml,yaml}": ["prettier --write --prose-wrap always"]
}
```

### 5. NPM Scripts Interface

**Purpose**: Provide consistent command interface for all quality checks.

**Key Scripts**:
```json
{
  "lint": "eslint 'src/**/*.ts' --max-warnings=0",
  "lint:fix": "eslint 'src/**/*.ts' --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "type-check": "tsc --noEmit",
  "check": "npm run type-check && npm run lint && npm run format:check",
  "prepare": "husky install"
}
```

### 6. EditorConfig Component

**Purpose**: Ensure consistent editor settings across different IDEs.

**Configuration File**: `.editorconfig`

**Key Settings**:
- Character encoding: UTF-8
- Line endings: LF
- Indentation: 2 spaces
- Trim trailing whitespace
- Insert final newline

## Data Models

### ESLint Rule Configuration

```typescript
type RuleLevel = 'off' | 'warn' | 'error' | 0 | 1 | 2;

interface RuleConfig {
  level: RuleLevel;
  options?: unknown[];
}

// Example rules
const rules = {
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }],
  '@typescript-eslint/no-floating-promises': 'error',
  'import/order': ['error', {
    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    'newlines-between': 'always',
    alphabetize: { order: 'asc', caseInsensitive: true }
  }]
};
```

### Lint-staged File Matching

```typescript
interface StagedFile {
  filename: string;
  status: 'added' | 'modified' | 'deleted';
  extension: string;
}

interface LintStagedTask {
  pattern: string;        // Glob pattern
  commands: string[];     // Commands to run
  files: StagedFile[];    // Matched files
}
```

### Git Hook Execution Context

```typescript
interface HookContext {
  hookName: 'pre-commit' | 'pre-push' | 'commit-msg';
  stagedFiles: string[];
  exitCode: number;
  stdout: string;
  stderr: string;
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: ESLint rule enforcement consistency

*For any* TypeScript code containing violations (explicit any, floating promises, misused promises, unused variables without underscore prefix, console.log statements), ESLint SHALL report appropriate errors or warnings according to the configured rules.

**Validates: Requirements 1.2, 1.3, 8.1, 8.2, 8.3**

### Property 2: Prettier formatting consistency

*For any* code file, running Prettier SHALL consistently apply single quotes, semicolons, trailing commas, 100 character line width, 2 space indentation, and LF line endings.

**Validates: Requirements 2.1, 2.2, 2.5**

### Property 3: Import ordering enforcement

*For any* set of import statements, ESLint SHALL enforce alphabetical ordering within groups (builtin, external, internal, parent, sibling, index) and report errors for incorrectly ordered imports.

**Validates: Requirements 1.4, 7.4**

### Property 4: Ignore pattern exclusion

*For any* file located in ignored directories (node_modules, dist, build, coverage) or matching ignored patterns (HTML, CSS, lock files), the linting and formatting tools SHALL exclude those files from processing.

**Validates: Requirements 2.4, 6.1, 6.3**

### Property 5: Lint-staged file processing

*For any* staged file matching configured patterns, lint-staged SHALL execute the corresponding commands (ESLint for .ts files, Prettier for all files) on those files only.

**Validates: Requirements 3.1, 3.2**

### Property 6: Pre-commit failure blocking

*For any* pre-commit check that fails (ESLint errors, Prettier formatting issues, TypeScript type errors), the system SHALL prevent the commit from proceeding and display error messages.

**Validates: Requirements 3.4**

### Property 7: Pre-push failure blocking

*For any* pre-push check that fails (lint errors, build failures), the system SHALL prevent the push from proceeding and display error messages.

**Validates: Requirements 4.3**

### Property 8: Lint script warning enforcement

*For any* codebase containing ESLint warnings, running the lint script SHALL fail with a non-zero exit code.

**Validates: Requirements 5.1**

### Property 9: Auto-fix idempotence

*For any* code with auto-fixable ESLint issues, running lint:fix SHALL fix all issues such that running it again produces no changes.

**Validates: Requirements 5.2**

### Property 10: Format script consistency

*For any* unformatted file, running the format script SHALL apply Prettier rules such that running format:check afterward reports no formatting issues.

**Validates: Requirements 5.3**

### Property 11: Format:check non-modification

*For any* file, running format:check SHALL not modify the file contents regardless of formatting status.

**Validates: Requirements 5.4**

### Property 12: Import resolution validation

*For any* unresolved import or circular dependency, ESLint SHALL report errors when analyzing the code.

**Validates: Requirements 7.2, 7.3**

## Error Handling

### ESLint Errors

**Parsing Errors**:
- **Cause**: Invalid TypeScript syntax or parser misconfiguration
- **Handling**: Display clear error message with file location and syntax issue
- **Recovery**: Developer fixes syntax or updates parser configuration

**Rule Violation Errors**:
- **Cause**: Code violates configured ESLint rules
- **Handling**: Report error with rule name, location, and suggested fix
- **Recovery**: Developer fixes code manually or runs `lint:fix` for auto-fixable issues

**Import Resolution Errors**:
- **Cause**: Cannot resolve module imports
- **Handling**: Report unresolved import with file path
- **Recovery**: Developer fixes import path or updates TypeScript configuration

### Prettier Errors

**Formatting Errors**:
- **Cause**: File cannot be parsed by Prettier
- **Handling**: Display error with file path and parsing issue
- **Recovery**: Developer fixes syntax or excludes file in `.prettierignore`

**Configuration Errors**:
- **Cause**: Invalid Prettier configuration
- **Handling**: Display error message indicating configuration issue
- **Recovery**: Developer fixes `.prettierrc.json` syntax

### Git Hook Errors

**Pre-commit Hook Failures**:
- **Cause**: Lint-staged or type-check fails
- **Handling**: 
  - Display which files failed checks
  - Show specific errors from ESLint/Prettier/TypeScript
  - Prevent commit with non-zero exit code
- **Recovery**: Developer fixes issues and attempts commit again

**Pre-push Hook Failures**:
- **Cause**: Lint or build fails
- **Handling**:
  - Display full lint output or build errors
  - Prevent push with non-zero exit code
- **Recovery**: Developer fixes issues and attempts push again

**Hook Installation Errors**:
- **Cause**: Husky not installed or Git hooks directory missing
- **Handling**: Display error during `npm install` or `prepare` script
- **Recovery**: Run `npx husky install` manually

### TypeScript Type Checking Errors

**Type Errors**:
- **Cause**: Type mismatches, missing types, or incorrect type usage
- **Handling**: Display error with file location, line number, and type issue
- **Recovery**: Developer fixes type issues or updates type definitions

**Configuration Errors**:
- **Cause**: Invalid `tsconfig.json`
- **Handling**: Display TypeScript configuration error
- **Recovery**: Developer fixes `tsconfig.json` syntax or settings

### Dependency Errors

**Missing Dependencies**:
- **Cause**: Required npm packages not installed
- **Handling**: Display error indicating missing package
- **Recovery**: Run `npm install` to install dependencies

**Version Conflicts**:
- **Cause**: Incompatible versions of ESLint plugins or Prettier
- **Handling**: Display version conflict error during installation
- **Recovery**: Update `package.json` to use compatible versions

## Testing Strategy

### Unit Testing Approach

Unit tests will verify specific configuration behaviors and edge cases:

1. **Configuration Loading Tests**:
   - Verify ESLint loads TypeScript parser correctly
   - Verify Prettier configuration is valid JSON
   - Verify EditorConfig settings are applied

2. **Specific Rule Tests**:
   - Test that Chrome extension APIs are recognized (webextensions env)
   - Test that webpack config files are excluded from linting
   - Test that lock files are excluded from formatting
   - Test that TypeScript path mappings resolve correctly

3. **Script Execution Tests**:
   - Verify `type-check` runs `tsc --noEmit`
   - Verify `check` script runs sub-scripts in sequence
   - Verify pre-commit hook sequence (lint-staged → type-check)
   - Verify pre-push hook sequence (lint → build)

4. **Success Case Tests**:
   - Test that commits proceed when all checks pass
   - Test that pushes proceed when all checks pass

### Property-Based Testing Approach

Property-based tests will verify universal behaviors across many inputs using **fast-check** (JavaScript/TypeScript property testing library):

1. **ESLint Rule Enforcement** (Property 1):
   - Generate random TypeScript code with various violations
   - Verify ESLint reports errors for: explicit any, floating promises, unused variables, console.log
   - Verify ESLint allows: underscore-prefixed variables, console.warn, console.error
   - Run 100+ iterations with different code patterns

2. **Prettier Formatting** (Property 2):
   - Generate random code with various formatting styles
   - Verify Prettier consistently applies: single quotes, semicolons, trailing commas, line width, indentation, LF endings
   - Run 100+ iterations with different formatting violations

3. **Import Ordering** (Property 3):
   - Generate random sets of import statements
   - Verify ESLint enforces alphabetical ordering within groups
   - Run 100+ iterations with different import combinations

4. **Ignore Patterns** (Property 4):
   - Generate random file paths in ignored directories
   - Verify tools skip processing those files
   - Run 100+ iterations with different path combinations

5. **Lint-staged Processing** (Property 5):
   - Generate random sets of staged files
   - Verify correct commands run for each file type
   - Run 100+ iterations with different file combinations

6. **Failure Blocking** (Properties 6, 7):
   - Generate random failing checks
   - Verify commits/pushes are blocked
   - Run 100+ iterations with different failure scenarios

7. **Warning Enforcement** (Property 8):
   - Generate random code with varying warning counts
   - Verify lint script fails when warnings > 0
   - Run 100+ iterations

8. **Auto-fix Idempotence** (Property 9):
   - Generate random code with auto-fixable issues
   - Verify running lint:fix twice produces same result
   - Run 100+ iterations

9. **Format Consistency** (Property 10):
   - Generate random unformatted code
   - Verify format → format:check sequence succeeds
   - Run 100+ iterations

10. **Non-modification** (Property 11):
    - Generate random files
    - Verify format:check doesn't modify contents
    - Run 100+ iterations

11. **Import Resolution** (Property 12):
    - Generate random unresolved imports and circular dependencies
    - Verify ESLint reports errors
    - Run 100+ iterations

### Testing Framework Configuration

- **Unit Testing**: Jest with ts-jest for TypeScript support
- **Property Testing**: fast-check library (minimum 100 iterations per property)
- **E2E Testing**: Manual verification of Git hooks in real repository
- **CI Integration**: All tests run in GitHub Actions on pull requests

### Test Tagging Convention

Each property-based test MUST include a comment tag:
```typescript
// Feature: code-quality-tooling, Property 1: ESLint rule enforcement consistency
```

This links the test implementation back to the design document property.

## Implementation Notes

### Installation Order

1. Install ESLint and TypeScript plugins first
2. Install Prettier and ESLint-Prettier integration
3. Install Husky and lint-staged last
4. Run `npx husky install` to initialize Git hooks

### Configuration Dependencies

- ESLint configuration depends on `tsconfig.json` for type-aware rules
- Import resolver depends on TypeScript configuration for path mappings
- Husky hooks depend on npm scripts being defined
- Lint-staged configuration depends on ESLint and Prettier being installed

### Editor Integration

While not required for core functionality, VS Code integration enhances developer experience:

- `.vscode/settings.json`: Enable format-on-save and ESLint auto-fix
- `.vscode/extensions.json`: Recommend ESLint and Prettier extensions

These files are optional and should not be tested as part of the core system.

### Performance Considerations

- **Lint-staged**: Only processes staged files (not entire codebase) for fast commits
- **Incremental type checking**: TypeScript caches type information for faster checks
- **ESLint caching**: Can be enabled with `--cache` flag for faster subsequent runs
- **Parallel execution**: Lint-staged runs commands in parallel when possible

### Migration Strategy

For existing codebases:

1. Install all dependencies
2. Create configuration files
3. Run `npm run lint:fix` to auto-fix issues
4. Run `npm run format` to format all files
5. Fix remaining manual issues
6. Install Husky hooks
7. Commit all changes

This ensures the codebase is clean before enforcing hooks on future commits.
