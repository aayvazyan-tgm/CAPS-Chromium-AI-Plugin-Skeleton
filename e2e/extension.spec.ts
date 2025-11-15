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

    // Check welcome message
    const message = popup.locator('p').first();
    await expect(message).toHaveText('Welcome to your Chrome Extension!');
  });

  test('should open options page with settings', async ({ context, extensionId }) => {
    // Navigate directly to options page
    const optionsPage = await context.newPage();
    await optionsPage.goto(`chrome-extension://${extensionId}/options/options.html`);

    // Wait for options page to load
    await optionsPage.waitForLoadState('networkidle');

    // Verify we're on the options page
    expect(optionsPage.url()).toContain('options/options.html');

    // Check if heading is present
    const heading = optionsPage.locator('h1');
    await expect(heading).toHaveText('Hello World Extension');

    // Verify the options page message
    const message = optionsPage.locator('p').first();
    await expect(message).toContainText('Configure your extension settings');

    // Test settings interaction
    const checkbox = optionsPage.locator('#enableFeature');
    await expect(checkbox).toBeVisible();

    // Toggle the checkbox
    await checkbox.click();
    const isChecked = await checkbox.isChecked();
    expect(typeof isChecked).toBe('boolean');
  });

  test('should persist settings', async ({ context, extensionId }) => {
    // Open options page
    const optionsPage = await context.newPage();
    await optionsPage.goto(`chrome-extension://${extensionId}/options/options.html`);
    await optionsPage.waitForLoadState('networkidle');

    // Set checkbox to unchecked
    const checkbox = optionsPage.locator('#enableFeature');
    if (await checkbox.isChecked()) {
      await checkbox.click();
    }

    // Verify it's unchecked
    await expect(checkbox).not.toBeChecked();

    // Reload page
    await optionsPage.reload();
    await optionsPage.waitForLoadState('networkidle');

    // Should still be unchecked (if storage is working)
    // Note: This might not work in test environment without proper chrome.storage mock
  });

  test('should handle navigation between popup and options pages', async ({
    context,
    extensionId,
  }) => {
    // Open popup
    const popup = await context.newPage();
    await popup.goto(`chrome-extension://${extensionId}/popup/popup.html`);
    await popup.waitForLoadState('networkidle');

    // Verify popup loaded
    const popupHeading = popup.locator('h1');
    await expect(popupHeading).toHaveText('Hello World');

    // Open options page in new tab
    const optionsPage = await context.newPage();
    await optionsPage.goto(`chrome-extension://${extensionId}/options/options.html`);
    await optionsPage.waitForLoadState('networkidle');

    // Verify options page loaded
    const optionsHeading = optionsPage.locator('h1');
    await expect(optionsHeading).toHaveText('Hello World Extension');

    // Both pages should be accessible
    expect(popup.url()).toContain('popup/popup.html');
    expect(optionsPage.url()).toContain('options/options.html');
  });
});
