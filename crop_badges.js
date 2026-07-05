import { Jimp } from 'jimp';
import path from 'path';
import fs from 'fs';

async function cropBadges() {
  const imgPath = "C:/Users/utente/.gemini/antigravity-ide/brain/b46c91c7-f81d-4f8a-8701-3a5ff8d57a25/media__1783236592778.png";
  const targetDir = "c:/Users/utente/.gemini/antigravity-ide/scratch/shein-clone/public/images";
  
  if (!fs.existsSync(imgPath)) {
    console.error("Source image not found:", imgPath);
    return;
  }
  
  try {
    const image = await Jimp.read(imgPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    console.log(`Loaded image size: ${width}x${height}`);
    
    const names = ["ap", "age", "vip", "heart"];
    const colWidth = Math.floor(width / 4);
    
    for (let i = 0; i < 4; i++) {
      const xStartCol = i * colWidth;
      
      // Clone this vertical slice
      const slice = image.clone().crop({ x: xStartCol, y: 0, w: colWidth, h: height });
      const sliceW = slice.bitmap.width;
      const sliceH = slice.bitmap.height;
      
      // Find bounding box of the badge in this slice
      let xMin = sliceW;
      let xMax = 0;
      let yMin = sliceH;
      let yMax = 0;
      let foundSolid = false;
      
      for (let y = 0; y < sliceH; y++) {
        for (let x = 0; x < sliceW; x++) {
          const idx = (y * sliceW + x) * 4;
          const r = slice.bitmap.data[idx];
          const g = slice.bitmap.data[idx + 1];
          const b = slice.bitmap.data[idx + 2];
          const a = slice.bitmap.data[idx + 3];
          
          // Pixel is solid if it has opacity and is not pure white background
          const isBackground = (a < 10) || (r > 245 && g > 245 && b > 245);
          if (!isBackground) {
            if (x < xMin) xMin = x;
            if (x > xMax) xMax = x;
            if (y < yMin) yMin = y;
            if (y > yMax) yMax = y;
            foundSolid = true;
          }
        }
      }
      
      if (!foundSolid) {
        console.log(`No solid pixels found in column ${i}`);
        continue;
      }
      
      // Add a small 2px padding around the crop
      const padding = 2;
      const cropX = Math.max(0, xMin - padding);
      const cropY = Math.max(0, yMin - padding);
      const cropW = Math.min(sliceW - cropX, (xMax - xMin) + 1 + (padding * 2));
      const cropH = Math.min(sliceH - cropY, (yMax - yMin) + 1 + (padding * 2));
      
      const badge = slice.crop({ x: cropX, y: cropY, w: cropW, h: cropH });
      const badgeW = badge.bitmap.width;
      const badgeH = badge.bitmap.height;
      
      // Make background transparent (if white)
      for (let y = 0; y < badgeH; y++) {
        for (let x = 0; x < badgeW; x++) {
          const idx = (y * badgeW + x) * 4;
          const r = badge.bitmap.data[idx];
          const g = badge.bitmap.data[idx + 1];
          const b = badge.bitmap.data[idx + 2];
          const a = badge.bitmap.data[idx + 3];
          
          if (a < 10 || (r > 240 && g > 240 && b > 240)) {
            badge.bitmap.data[idx] = 0;
            badge.bitmap.data[idx + 1] = 0;
            badge.bitmap.data[idx + 2] = 0;
            badge.bitmap.data[idx + 3] = 0; // Alpha to 0
          }
        }
      }
      
      const outPath = path.join(targetDir, `badge_${names[i]}.png`);
      await badge.write(outPath);
      console.log(`Saved precise crop: ${outPath} (${badgeW}x${badgeH})`);
    }
    
    console.log("All badges cropped perfectly!");
  } catch (err) {
    console.error("Error cropping badges:", err);
  }
}

cropBadges();
