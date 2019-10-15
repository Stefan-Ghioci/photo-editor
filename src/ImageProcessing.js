const BINARIZE_THRESHOLD = 255 / 2;

const computeGrayscale = pixel =>
  pixel.red * 0.21 + pixel.green * 0.72 + pixel.blue * 0.07;

const computeBW = pixel => 255 * (computeGrayscale(pixel) > BINARIZE_THRESHOLD);

const computeContrastIncrease = value =>
  ((Math.sin((Math.PI * value) / 255 - Math.PI / 2) + 1) / 2) * 255;

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
