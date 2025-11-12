const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const pathToExtension = path.join(__dirname, '../dist');

  console.log('Starting Chrome with extension loaded...');
  console.log(`Extension path: ${pathToExtension}`);

  // Launch browser with extension
  const context = await chromium.launchPersistentContext('', {
    headless: false, // Extensions only work in headed mode
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
    // Use chrome channel for better extension support
    channel: 'chrome',
  });

  console.log('Browser started successfully!');
  console.log('Extension is loaded and ready for testing.');
  console.log('Press Ctrl+C to stop the browser.');

  // Wait for service worker to be ready (Manifest V3)
  let serviceWorker = context.serviceWorkers()[0];
  if (!serviceWorker) {
    try {
      serviceWorker = await context.waitForEvent('serviceworker', {
        timeout: 10000,
      });
    } catch (error) {
      console.warn('Warning: Service worker not detected within timeout');
    }
  }

  if (serviceWorker) {
    // Extract extension ID from service worker URL
    const extensionId = serviceWorker.url().split('/')[2];
    console.log(`\nExtension ID: ${extensionId}`);
    console.log(`Popup URL: chrome-extension://${extensionId}/popup/popup.html`);
    console.log(`Config URL: chrome-extension://${extensionId}/config/config.html`);
  }

  // Keep the script running
  await new Promise(() => {});
})();
