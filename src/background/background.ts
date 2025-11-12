// Background service worker for Manifest V3

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings
    void chrome.storage.sync.set({
      enableFeature: true,
    });
  }
});

// Keep service worker alive (if needed)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  sendResponse({ status: 'ok' });
  return true; // Keep message channel open for async response
});

export {};
