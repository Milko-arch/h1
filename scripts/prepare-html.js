import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distHtmlPath = path.join(rootDir, 'dist', 'index.html');

if (!fs.existsSync(distHtmlPath)) {
  console.error('Error: dist/index.html not found! Run vite build first.');
  process.exit(1);
}

let html = fs.readFileSync(distHtmlPath, 'utf8');

// Convert inline module script to deferred standard script so it works on file:/// protocol and across all browsers
html = html.replace(/<script\s+type="module"\s+crossorigin>/gi, '<script defer>');
html = html.replace(/<script\s+type="module">/gi, '<script defer>');

// Make sure #root exists in the body
if (!html.includes('id="root"')) {
  html = html.replace('</body>', '<div id="root"></div></body>');
}

// Write to targets
const targets = [
  path.join(rootDir, 'footprints.html'),
  path.join(rootDir, 'public', 'footprints.html'),
  path.join(rootDir, 'dist', 'footprints.html')
];

for (const target of targets) {
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(target, html, 'utf8');
  const sizeKb = (fs.statSync(target).size / 1024).toFixed(1);
  console.log(`Saved standalone singlefile to ${path.relative(rootDir, target)} (${sizeKb} KB)`);
}
