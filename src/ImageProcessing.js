export const invertColors = pixelArray => {
  pixelArray.forEach(pixel => {
    pixel.red = 255 - pixel.red;
    pixel.green = 255 - pixel.green;
    pixel.blue = 255 - pixel.blue;
  });
};

export const increaseBrightness = (pixelArray, value) => {
  pixelArray.forEach(pixel => {
    pixel.red += value;
    pixel.green += value;
    pixel.blue += value;
  });
};
