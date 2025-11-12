// Background service worker for Manifest V3
console.log('Background service worker started');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Extension installed');
    // Set default settings
    chrome.storage.sync.set({
      enableFeature: true
    });
  } else if (details.reason === 'update') {
    console.log('Extension updated');
  }
});

// Keep service worker alive (if needed)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  sendResponse({ status: 'ok' });
  return true; // Keep message channel open for async response
});
