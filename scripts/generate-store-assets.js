const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const assets = [
  { name: 'screenshot-1280x800', width: 1280, height: 800, dir: 'screenshots' },
  { name: 'screenshot-640x400', width: 640, height: 400, dir: 'screenshots' },
  { name: 'small-tile-440x280', width: 440, height: 280, dir: 'promotional' },
  { name: 'large-tile-920x680', width: 920, height: 680, dir: 'promotional' },
  { name: 'marquee-1400x560', width: 1400, height: 560, dir: 'promotional' }
];

assets.forEach(asset => {
  const outputDir = path.join(__dirname, '..', 'store-assets', asset.dir);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const canvas = createCanvas(asset.width, asset.height);
  const ctx = canvas.getContext('2d');

  // Draw gradient background
  const gradient = ctx.createLinearGradient(0, 0, asset.width, asset.height);
  gradient.addColorStop(0, '#4CAF50');
  gradient.addColorStop(1, '#45a049');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, asset.width, asset.height);

  // Draw border
  ctx.strokeStyle = '#2e7d32';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, asset.width, asset.height);

  // Draw title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.floor(asset.height * 0.15)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Hello World Extension', asset.width / 2, asset.height / 2 - asset.height * 0.1);

  // Draw subtitle
  ctx.font = `${Math.floor(asset.height * 0.08)}px Arial`;
  ctx.fillText('Chrome Extension Skeleton', asset.width / 2, asset.height / 2 + asset.height * 0.05);

  // Draw dimension label
  ctx.font = `${Math.floor(asset.height * 0.06)}px Arial`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText(`${asset.width}x${asset.height}`, asset.width / 2, asset.height / 2 + asset.height * 0.15);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(outputDir, `${asset.name}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`Created: ${filename}`);
});

console.log('All store assets generated successfully!');
