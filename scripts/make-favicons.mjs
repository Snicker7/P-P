import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { mkdir, writeFile } from 'node:fs/promises';

const SRC = 'branding.png';
const OUT = 'public';
const ASSETS = 'src/assets';
const PADDING = 0.10; // 10% breathing room inside square favicons

await mkdir(OUT, { recursive: true });
await mkdir(ASSETS, { recursive: true });

// Step 1: trim cream margin from branding.png to get a tight wordmark crop
const trimmedBuffer = await sharp(SRC)
  .trim({ background: '#f8f6eb', threshold: 15 })
  .toBuffer();

// Save the trimmed wordmark for use as the header/footer logo
await sharp(trimmedBuffer).png().toFile(`${ASSETS}/branding-wordmark.png`);
console.log(`Wrote ${ASSETS}/branding-wordmark.png`);

// Step 2: build a padded square version for favicons
const trimmedMeta = await sharp(trimmedBuffer).metadata();
const longestSide = Math.max(trimmedMeta.width, trimmedMeta.height);
const squareSide = Math.round(longestSide * (1 + 2 * PADDING));
const squareBuffer = await sharp({
  create: {
    width: squareSide,
    height: squareSide,
    channels: 4,
    background: '#f8f6eb',
  },
})
  .composite([{ input: trimmedBuffer, gravity: 'center' }])
  .png()
  .toBuffer();

const square = sharp(squareBuffer);

const sizes = { 16: 'favicon-16.png', 32: 'favicon-32.png', 180: 'apple-touch-icon.png', 192: 'icon-192.png', 512: 'icon-512.png' };
for (const [px, name] of Object.entries(sizes)) {
  await square.clone().resize(Number(px), Number(px), { fit: 'contain', background: '#f8f6eb' }).png().toFile(`${OUT}/${name}`);
  console.log(`Wrote ${name}`);
}

const ico = await pngToIco([`${OUT}/favicon-16.png`, `${OUT}/favicon-32.png`]);
await writeFile(`${OUT}/favicon.ico`, ico);
console.log('Wrote favicon.ico');

const manifest = {
  name: 'Lova Media Co.',
  short_name: 'Lova',
  description: 'Utah wedding content creator.',
  start_url: '/',
  display: 'standalone',
  background_color: '#f8f6eb',
  theme_color: '#f8f6eb',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
};
await writeFile(`${OUT}/manifest.webmanifest`, JSON.stringify(manifest, null, 2));
console.log('Wrote manifest.webmanifest');
