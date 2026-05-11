import sharp from 'sharp';

const SRC = 'branding.png';
const OUT = 'public/og-default.png';

await sharp(SRC)
  .resize({ width: 1200, height: 630, fit: 'contain', background: '#f8f6eb' })
  .png()
  .toFile(OUT);

console.log(`Wrote ${OUT}`);
