export const imgDataToPixelArray = imgData => {
  let pixelArray = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    pixelArray.push({
      red: imgData.data[i],
      green: imgData.data[i + 1],
      blue: imgData.data[i + 2],
      alpha: imgData.data[i + 3]
    });
  }
  return pixelArray;
};

export const pixelArrayToImgData = (pixelArray, width, height) => {
  let array = new Uint8ClampedArray(width * height * 4);

  for (let i = 0, j = 0; i < pixelArray.length; i++, j += 4) {
    array[j] = pixelArray[i].red;
    array[j + 1] = pixelArray[i].green;
    array[j + 2] = pixelArray[i].blue;
    array[j + 3] = pixelArray[i].alpha;
  }

  return new ImageData(array, width, height);
};
