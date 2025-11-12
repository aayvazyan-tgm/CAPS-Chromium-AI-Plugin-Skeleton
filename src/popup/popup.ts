// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('openConfig');

  if (button) {
    button.addEventListener('click', () => {
      // Open configuration page in new tab
      void chrome.tabs.create({
        url: chrome.runtime.getURL('config/config.html'),
      });
    });
  }
});
