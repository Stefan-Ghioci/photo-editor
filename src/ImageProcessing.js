const BINARIZE_THRESHOLD = 255 / 2;

const computeGrayscale = pixel =>
  pixel.red * 0.21 + pixel.green * 0.72 + pixel.blue * 0.07;

const computeBW = pixel => 255 * (computeGrayscale(pixel) > BINARIZE_THRESHOLD);

const computeContrastIncrease = value =>
  ((Math.sin((Math.PI * value) / 255 - Math.PI / 2) + 1) / 2) * 255;

const computeRangeCompression = value =>
  (255 / Math.log(256)) * Math.log(1 + value);

export const invert = pixelArray => {
  pixelArray.forEach(pixel => {
    pixel.red = 255 - pixel.red;
    pixel.green = 255 - pixel.green;
    pixel.blue = 255 - pixel.blue;
  });
};

export const binarize = pixelArray => {
  pixelArray.forEach(pixel => {
    const bw = computeBW(pixel);
    pixel.red = bw;
    pixel.green = bw;
    pixel.blue = bw;
  });
};

export const grayscale = pixelArray => {
  pixelArray.forEach(pixel => {
    const grayscale = computeGrayscale(pixel);
    pixel.red = grayscale;
    pixel.green = grayscale;
    pixel.blue = grayscale;
  });
};

export const increaseContrast = pixelArray => {
  pixelArray.forEach(pixel => {
    pixel.red = computeContrastIncrease(pixel.red);
    pixel.green = computeContrastIncrease(pixel.green);
    pixel.blue = computeContrastIncrease(pixel.blue);
  });
};

export const rangeCompress = pixelArray => {
  pixelArray.forEach(pixel => {
    pixel.red = computeRangeCompression(pixel.red);
    pixel.green = computeRangeCompression(pixel.green);
    pixel.blue = computeRangeCompression(pixel.blue);
  });
};

export const extractBit = pixelArray => {
  pixelArray.forEach(pixel => {
    const bits = 15;
    pixel.red = (pixel.red & bits) !== bits ? 255 : pixel.red;
    pixel.green = (pixel.green & bits) !== bits ? 255 : pixel.green;
    pixel.blue = (pixel.blue & bits) !== bits ? 255 : pixel.blue;
  });
};

export const diff = (pixelArray, diffPixelArray) => {
  for (let i = 0; i < pixelArray.length; i++) {
    let pixel = pixelArray[i];
    let diffPixel = diffPixelArray[i];
    const tolerance = 25;
    if (
      Math.abs(pixel.red - diffPixel.red) <= tolerance &&
      Math.abs(pixel.green - diffPixel.green) <= tolerance &&
      Math.abs(pixel.blue - diffPixel.blue) <= tolerance
    ) {
      pixel.red = 255;
      pixel.green = 255;
      pixel.blue = 255;
    }
  }
};
