const { chromium } = require('playwright');
const path = require('path');
const os = require('os');
const fs = require('fs');

(async () => {
  try {
    const pathToExtension = path.join(__dirname, '../dist');

    // Verify dist folder exists
    if (!fs.existsSync(pathToExtension)) {
      console.error('Error: dist folder not found. Please run "npm run build" first.');
      process.exit(1);
    }

    console.log('Starting Chrome with extension loaded...');
    console.log(`Extension path: ${pathToExtension}`);

    // Create a temporary user data directory
    const userDataDir = path.join(os.tmpdir(), `chrome-extension-test-${Date.now()}`);

    // Try to launch with Chrome channel first, fall back to Chromium if it fails
    let context;
    try {
      console.log('Attempting to launch Chrome...');
      context = await chromium.launchPersistentContext(userDataDir, {
        headless: false, // Extensions only work in headed mode
        args: [
          `--disable-extensions-except=${pathToExtension}`,
          `--load-extension=${pathToExtension}`,
          '--no-first-run',
          '--no-default-browser-check',
        ],
        channel: 'chrome',
      });
      console.log('✓ Chrome launched successfully');
    } catch (error) {
      console.log('Chrome not found, trying Chromium...');
      try {
        context = await chromium.launchPersistentContext(userDataDir, {
          headless: false,
          args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
            '--no-first-run',
            '--no-default-browser-check',
          ],
        });
        console.log('✓ Chromium launched successfully');
      } catch (chromiumError) {
        console.error('Failed to launch browser. Please install Chrome or run:');
        console.error('  npx playwright install chromium');
        process.exit(1);
      }
    }

    console.log('\n✓ Browser started successfully!');
    console.log('✓ Extension is loaded and ready for testing.');
    console.log('\nPress Ctrl+C to stop the browser.\n');

    // Wait for service worker to be ready (Manifest V3)
    let serviceWorker = context.serviceWorkers()[0];
    if (!serviceWorker) {
      try {
        serviceWorker = await context.waitForEvent('serviceworker', {
          timeout: 10000,
        });
      } catch (error) {
        console.warn('⚠ Warning: Service worker not detected within timeout');
        console.warn('  The extension may still be loading...');
      }
    }

    if (serviceWorker) {
      // Extract extension ID from service worker URL
      const extensionId = serviceWorker.url().split('/')[2];
      console.log('Extension Information:');
      console.log(`  Extension ID: ${extensionId}`);
      console.log(`  Popup URL: chrome-extension://${extensionId}/popup/popup.html`);
      console.log(`  Config URL: chrome-extension://${extensionId}/config/config.html\n`);
    }

    // Handle cleanup on exit
    const cleanup = async () => {
      console.log('\nShutting down browser...');
      try {
        await context.close();
        // Clean up temporary user data directory
        if (fs.existsSync(userDataDir)) {
          fs.rmSync(userDataDir, { recursive: true, force: true });
        }
      } catch (error) {
        // Ignore cleanup errors
      }
      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    // Keep the script running
    await new Promise(() => {});
  } catch (error) {
    console.error('\nError starting browser:');
    console.error(error.message);
    process.exit(1);
  }
})();
