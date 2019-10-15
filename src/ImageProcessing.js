const BINARIZE_THRESHOLD = 255 / 2;

export const invertColors = pixelArray => {
  pixelArray.forEach(pixel => {
    pixel.red = 255 - pixel.red;
    pixel.green = 255 - pixel.green;
    pixel.blue = 255 - pixel.blue;
  });
};

export const binarize = pixelArray => {
  pixelArray.forEach(pixel => {
    const color =
      255 * ((pixel.red + pixel.green + pixel.blue) / 3 > BINARIZE_THRESHOLD);
    pixel.red = color;
    pixel.green = color;
    pixel.blue = color;
  });
};
