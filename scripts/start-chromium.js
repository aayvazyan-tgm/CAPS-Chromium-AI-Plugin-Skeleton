const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

(async () => {
  try {
    const pathToExtension = path.join(__dirname, '../dist');

    // Verify dist folder exists
    if (!fs.existsSync(pathToExtension)) {
      console.error('Error: dist folder not found. Please run "npm run build" first.');
      process.exit(1);
    }

    console.log('Starting Chromium with extension loaded...');
    console.log(`Extension path: ${pathToExtension}`);

    // Use a persistent profile directory in the project
    const userDataDir = path.join(__dirname, '../.chrome-profile');

    // Create profile directory if it doesn't exist
    if (!fs.existsSync(userDataDir)) {
      fs.mkdirSync(userDataDir, { recursive: true });
      console.log(`Created new profile directory: ${userDataDir}`);
    } else {
      console.log(`Using existing profile: ${userDataDir}`);
    }

    // Clean up cached extension code to force reload of updated extension
    // Preserves: user data (login, history, cookies) AND extension settings (chrome.storage)
    // Clears: compiled code caches (Service Worker, Scripts, V8 bytecode)
    const cacheDirsToClean = [
      path.join(userDataDir, 'Default', 'Service Worker'),
      path.join(userDataDir, 'Default', 'Extension Scripts'),
      path.join(userDataDir, 'Default', 'Extension Rules'),
      path.join(userDataDir, 'Default', 'Extension State'),
      path.join(userDataDir, 'Default', 'Code Cache'),
    ];

    let clearedCount = 0;
    for (const cacheDir of cacheDirsToClean) {
      if (fs.existsSync(cacheDir)) {
        try {
          fs.rmSync(cacheDir, { recursive: true, force: true });
          clearedCount++;
        } catch (err) {
          console.warn(`Warning: Could not clear ${path.basename(cacheDir)}:`, err.message);
        }
      }
    }

    if (clearedCount > 0) {
      console.log(
        `✓ Cleared ${clearedCount} cache director${clearedCount === 1 ? 'y' : 'ies'} - extension will reload fresh`,
      );
    } else {
      console.log('No extension caches found (first run or already clean)');
    }

    // Determine the Chromium/Chrome executable path based on platform
    let chromePath;
    const platform = os.platform();

    if (platform === 'win32') {
      // Windows paths (try common locations)
      const possiblePaths = [
        process.env.LOCALAPPDATA + '\\Chromium\\Application\\chrome.exe',
        process.env.PROGRAMFILES + '\\Google\\Chrome\\Application\\chrome.exe',
        process.env['PROGRAMFILES(X86)'] + '\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      ];
      chromePath = possiblePaths.find((p) => fs.existsSync(p));
    } else if (platform === 'darwin') {
      // macOS paths
      const possiblePaths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
      ];
      chromePath = possiblePaths.find((p) => fs.existsSync(p));
    } else {
      // Linux paths
      const possiblePaths = [
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
      ];
      chromePath = possiblePaths.find((p) => fs.existsSync(p));
    }

    if (!chromePath) {
      console.error('Error: Could not find Chromium or Chrome installation.');
      console.error('Please install Chrome or Chromium, or set CHROME_PATH environment variable.');
      console.error(`Searched locations for ${platform}:`);
      process.exit(1);
    }

    console.log(`Found Chrome/Chromium at: ${chromePath}`);

    // Launch Chrome/Chromium with extension loaded
    const args = [
      `--user-data-dir=${userDataDir}`,
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=9222',
    ];

    console.log('\nLaunching Chromium...');
    const chromeProcess = spawn(chromePath, args, {
      stdio: 'ignore',
      detached: true,
    });

    chromeProcess.unref();

    console.log('\n✓ Chromium launched successfully!');
    console.log('✓ Extension is loaded and ready for testing.');
    console.log(`✓ Profile location: ${userDataDir}`);
    console.log('✓ Remote debugging enabled on port 9222');
    console.log('  CDP endpoint: http://localhost:9222');
    console.log('\nNote: Your settings and browsing data will persist between sessions.');
    console.log('To start fresh, delete the .chrome-profile directory.\n');

    // Exit the script, but Chrome continues running
    process.exit(0);
  } catch (error) {
    console.error('\nError starting Chromium:');
    console.error(error.message);
    process.exit(1);
  }
})();
