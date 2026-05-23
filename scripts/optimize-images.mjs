import { readdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public', 'images');

const dirs = ['hero', 'og'];

async function convertToWebP() {
  for (const subdir of dirs) {
    const imgDir = join(publicDir, subdir);
    if (!existsSync(imgDir)) {
      console.log(`Directory not found: ${imgDir}`);
      continue;
    }

    const files = readdirSync(imgDir).filter(f => f.endsWith('.png'));
    console.log(`Found ${files.length} PNGs in ${subdir}/`);

    let sharp;
    try {
      sharp = (await import('sharp')).default;
    } catch {
      console.log('  sharp not available, skipping WebP conversion');
      console.log('  Install with: npm install sharp');
      continue;
    }

    for (const file of files) {
      const inputPath = join(imgDir, file);
      const outputPath = join(imgDir, file.replace('.png', '.webp'));

      if (existsSync(outputPath)) {
        // Skip if WebP already exists and is newer than PNG
        const pngStat = (await import('fs')).statSync(inputPath);
        const webpStat = (await import('fs')).statSync(outputPath);
        if (webpStat.mtimeMs > pngStat.mtimeMs) continue;
      }

      try {
        await sharp(inputPath)
          .webp({ quality: 80, effort: 4 })
          .toFile(outputPath);
        console.log(`  ✓ ${file} → ${file.replace('.png', '.webp')}`);
      } catch (err) {
        console.error(`  ✗ ${file}: ${err.message}`);
      }
    }
  }
  console.log('Done!');
}

convertToWebP();
