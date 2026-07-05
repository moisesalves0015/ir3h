import { Jimp } from 'jimp';

async function inspect() {
  const image = await Jimp.read("C:/Users/utente/.gemini/antigravity-ide/brain/b46c91c7-f81d-4f8a-8701-3a5ff8d57a25/media__1783236592778.png");
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  console.log("Image size:", width, "x", height);
  
  // Find solid bounding box based on: a > 10 && !(r > 245 && g > 245 && b > 245)
  let yMin = height;
  let yMax = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx+1];
      const b = image.bitmap.data[idx+2];
      const a = image.bitmap.data[idx+3];
      
      const isBackground = (a < 10) || (r > 245 && g > 245 && b > 245);
      if (!isBackground) {
        if (y < yMin) yMin = y;
        if (y > yMax) yMax = y;
      }
    }
  }
  
  console.log(`Solid vertical bounds: yMin=${yMin}, yMax=${yMax} (height=${yMax - yMin + 1})`);
}
inspect();
