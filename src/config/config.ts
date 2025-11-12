document.addEventListener('DOMContentLoaded', () => {
  const checkbox = document.getElementById('enableFeature') as HTMLInputElement;

  // Load saved settings
  chrome.storage.sync.get(['enableFeature'], (result) => {
    if (checkbox && result.enableFeature !== undefined) {
      checkbox.checked = result.enableFeature;
    }
  });

  // Save settings on change
  if (checkbox) {
    checkbox.addEventListener('change', () => {
      chrome.storage.sync.set({
        enableFeature: checkbox.checked
      });
    });
  }
});
