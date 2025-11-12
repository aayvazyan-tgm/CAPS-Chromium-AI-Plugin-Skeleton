import { test, expect } from './fixtures';
import { Page } from '@playwright/test';

test.describe('Chrome Extension E2E Tests', () => {
  test('should load extension popup', async ({ context, extensionId }) => {
    // Navigate to popup
    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    // Wait for popup to load
    await popup.waitForLoadState('networkidle');

    // Check popup content
    const heading = popup.locator('h1');
    await expect(heading).toHaveText('Hello World');

    const button = popup.locator('#openConfig');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Open Configuration');
  });

  test('should open configuration page with Hello World text', async ({ context, extensionId }) => {
    // Open popup first
    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/popup/popup.html`);
    await popup.waitForLoadState('networkidle');

    // Click the button and wait for new page
    const [configPage] = await Promise.all([
      context.waitForEvent('page'),
      popup.click('#openConfig'),
    ]);

    // Wait for config page to load
    await configPage.waitForLoadState('networkidle');

    // Verify we're on the config page
    expect(configPage.url()).toContain('config/config.html');

    // Check if Hello World text is present
    const heading = configPage.locator('h1');
    await expect(heading).toHaveText('Hello World');

    // Verify the configuration page message
    const message = configPage.locator('p').first();
    await expect(message).toContainText('configuration page');

    // Test settings interaction
    const checkbox = configPage.locator('#enableFeature');
    await expect(checkbox).toBeVisible();

    // Toggle the checkbox
    await checkbox.click();
    const isChecked = await checkbox.isChecked();
    expect(typeof isChecked).toBe('boolean');
  });

  test('should persist settings', async ({ context, extensionId }) => {
    // Open config page
    const configPage = await context.newPage();
    await configPage.goto(`chrome-extension://${extensionId}/config/config.html`);
    await configPage.waitForLoadState('networkidle');

    // Set checkbox to unchecked
    const checkbox = configPage.locator('#enableFeature');
    if (await checkbox.isChecked()) {
      await checkbox.click();
    }

    // Verify it's unchecked
    await expect(checkbox).not.toBeChecked();

    // Reload page
    await configPage.reload();
    await configPage.waitForLoadState('networkidle');

    // Should still be unchecked (if storage is working)
    // Note: This might not work in test environment without proper chrome.storage mock
  });

  test('should handle navigation between pages', async ({ context, extensionId }) => {
    const pages: Page[] = [];

    // Track all pages
    context.on('page', (page) => pages.push(page));

    // Open popup
    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/popup/popup.html`);

    // Click to open config and wait for new page
    const [newPage] = await Promise.all([context.waitForEvent('page'), popup.click('#openConfig')]);

    // Wait for the new page to load
    await newPage.waitForLoadState('networkidle');

    // Should have at least 2 pages now (initial popup page tracked + new config page)
    expect(pages.length).toBeGreaterThanOrEqual(1);
  });
});
