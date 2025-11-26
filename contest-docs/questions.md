# 1. About the project

## Inspiration

The spark came from a frustrating reality: **AI assistants are blind when building browser extensions**. They can write code, but they can't see if it actually works. They generate popup.ts files without knowing if the popup renders. They create background workers without verifying they initialize correctly. It's like asking someone to paint a masterpiece while blindfolded.

I wanted to give AI its sight back.

The Skeleton Crew category was perfect because this isn't just about building one extension—it's about building the **foundation that lets AI build ANY extension**. A skeleton that's lean enough to understand, but complete enough to verify. The bones that let the monster come alive.

## What it does

**CAPS (Chromium AI Plugin Skeleton)** is a production-ready Chrome Extension V3 template that transforms AI from a blind code generator into a verified extension builder.

The magic is in the verification loop:
- 🧪 **E2E tests with Playwright** that actually load the extension in a real Chrome browser
- 🔄 **CI/CD pipeline** that runs build → lint → unit tests → E2E tests on every change
- 📦 **One-command launch** (`npm start`) that builds and opens Chrome with the extension loaded
- ✅ **Instant feedback** so AI knows immediately if its code works

For developers, it's a complete starter kit: TypeScript, Webpack, ESLint, Prettier, Husky, Jest, and Playwright—all pre-configured and working together.

For AI, it's a superpower: the ability to write extension code and actually verify it works.

## How I built it

Kiro was instrumental in every phase:

**Vibe Coding Sessions**: I started with natural conversations about the architecture. "I need a Chrome extension skeleton that AI can verify" led to discussions about test strategies, CI pipelines, and developer experience. Kiro helped structure the webpack configs, TypeScript setup, and the critical Playwright fixtures that enable headless extension testing.

**The Playwright Breakthrough**: The most impressive code generation was the `e2e/fixtures.ts` file. Getting Playwright to load a Chrome extension in headless mode is notoriously tricky—Manifest V3 service workers, extension ID extraction, the `--headless=new` flag. Kiro navigated these complexities and produced working test fixtures that correctly:
- Launch Chromium with the extension loaded
- Wait for the service worker to initialize
- Extract the dynamic extension ID
- Provide clean test context for assertions

**CI/CD Pipeline**: Kiro helped design a parallel GitHub Actions workflow that runs build, lint, and E2E jobs simultaneously. The Xvfb setup for headless Chrome testing in CI was particularly tricky, but Kiro got it right.

## Challenges I ran into

**The Headless Extension Paradox**: Chrome extensions traditionally require a visible browser window. Making them work in headless CI environments required the newer `--headless=new` flag and careful Playwright configuration. Several iterations were needed to get the service worker detection timing right.

**Manifest V3 Complexity**: The shift from background pages to service workers in Manifest V3 changed how extensions initialize. The tests needed to wait for the service worker before extracting the extension ID—a race condition that caused flaky tests until I added proper event waiting.

**Balancing Skeleton vs. Bloat**: A skeleton needs to be minimal enough to understand but complete enough to be useful. Every file had to justify its existence. I cut features that weren't essential to the "AI can verify this" mission.

## Accomplishments that I'm proud of

🎯 **True E2E Verification**: The tests don't mock Chrome APIs—they run in a real browser with a real extension. When tests pass, the extension actually works.

🚀 **One-Command Experience**: `npm start` builds the extension and launches Chrome with it loaded. `npm run test:e2e` verifies everything works. No manual steps, no "load unpacked" dance.

🤖 **AI-Friendly Architecture**: Clean separation of concerns (popup/, options/, background/), consistent patterns, and comprehensive tooling that AI assistants can understand and extend.

⚡ **Fast CI Feedback**: Parallel jobs mean developers (and AI) get feedback in minutes, not hours. The pipeline catches issues before they reach main.

## What I learned

**Verification Changes Everything**: When AI can verify its work, the development loop transforms. Instead of "generate and hope," it becomes "generate, test, iterate." This is the future of AI-assisted development.

**Skeletons Need Muscles**: A bare-bones template isn't enough. The testing infrastructure, CI pipeline, and developer tooling are what make a skeleton actually useful. The bones need muscles to move.

**Manifest V3 is the Future**: Despite its complexity, Manifest V3's service worker model is more secure and performant. Building the skeleton on V3 ensures it's ready for the long term.

## What's next for CAPS (Chromium AI Plugin Skeleton)

🔮 **Content Script Template**: Add a pre-configured content script example with messaging between content ↔ background ↔ popup.

🧩 **MCP Integration**: Create an MCP server that exposes extension testing capabilities directly to AI assistants, enabling even tighter verification loops.

📚 **Recipe Library**: Build a collection of common extension patterns (tab management, context menus, notifications) that can be mixed into the skeleton.

🌐 **Cross-Browser Support**: Extend the skeleton to support Firefox and Edge with a unified codebase and browser-specific manifests.

The skeleton is alive. Now it's time to see what monsters it can create. 🎃
