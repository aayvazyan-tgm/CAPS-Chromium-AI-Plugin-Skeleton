const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const pathToExtension = path.join(__dirname, '../dist');

// Check if dist folder exists
if (!fs.existsSync(pathToExtension)) {
  console.error('Error: dist folder not found. Please build the extension first.');
  console.error('Run: npm run dev');
  process.exit(1);
}

console.log('Starting Chrome with extension loaded...');
console.log(`Extension path: ${pathToExtension}`);

// Determine Chrome binary path based on platform
const platform = process.platform;
let chromePath;

if (platform === 'win32') {
  // Windows
  chromePath = process.env.CHROME_PATH ||
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
} else if (platform === 'darwin') {
  // macOS
  chromePath = process.env.CHROME_PATH ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
} else {
  // Linux
  chromePath = process.env.CHROME_PATH ||
    'google-chrome';
}

// Chrome flags for loading the extension
const chromeArgs = [
  `--load-extension=${pathToExtension}`,
  `--disable-extensions-except=${pathToExtension}`,
  '--no-first-run',
  '--no-default-browser-check',
];

console.log(`Launching Chrome: ${chromePath}`);
console.log('');
console.log('Extension is loaded and ready for testing.');
console.log('To find your extension ID:');
console.log('1. Navigate to chrome://extensions/');
console.log('2. Enable "Developer mode" if not already enabled');
console.log('3. Look for "Chrome Extension Skeleton" and copy the ID');
console.log('');
console.log('Press Ctrl+C to stop monitoring (Chrome will continue running).');
console.log('');

// Launch Chrome
const chrome = spawn(chromePath, chromeArgs, {
  detached: false,
  stdio: 'ignore',
});

chrome.on('error', (error) => {
  console.error('Failed to start Chrome:', error.message);
  console.error('');
  console.error('You can set a custom Chrome path with:');
  console.error('CHROME_PATH=/path/to/chrome npm start');
  process.exit(1);
});

chrome.on('close', (code) => {
  console.log(`Chrome exited with code ${code}`);
  process.exit(code);
});

// Handle script termination
process.on('SIGINT', () => {
  console.log('\nStopping...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nStopping...');
  process.exit(0);
});
