const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 48, 128, 512];
const outputDir = path.join(__dirname, '..', 'assets', 'icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Draw background
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(0, 0, size, size);

  // Draw border
  ctx.strokeStyle = '#45a049';
  ctx.lineWidth = Math.max(2, size / 32);
  ctx.strokeRect(0, 0, size, size);

  // Draw text "HW"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.floor(size * 0.4)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HW', size / 2, size / 2);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(outputDir, `icon-${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`Created: ${filename}`);
});

console.log('All icons generated successfully!');
