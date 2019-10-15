const BINARIZE_THRESHOLD = 255 / 2;

const getGrayscaleColor = pixel =>
  pixel.red * 0.21 + pixel.green * 0.72 + pixel.blue * 0.07;

const getBWColor = pixel =>
  255 * (getGrayscaleColor(pixel) > BINARIZE_THRESHOLD);

export const invertColors = pixelArray => {
  pixelArray.forEach(pixel => {
    pixel.red = 255 - pixel.red;
    pixel.green = 255 - pixel.green;
    pixel.blue = 255 - pixel.blue;
  });
};

export const binarize = pixelArray => {
  pixelArray.forEach(pixel => {
    const bwColor = getBWColor(pixel);
    pixel.red = bwColor;
    pixel.green = bwColor;
    pixel.blue = bwColor;
  });
};

export const grayscale = pixelArray => {
  pixelArray.forEach(pixel => {
    const grayscaleColor = getGrayscaleColor(pixel);
    pixel.red = grayscaleColor;
    pixel.green = grayscaleColor;
    pixel.blue = grayscaleColor;
  });
};
