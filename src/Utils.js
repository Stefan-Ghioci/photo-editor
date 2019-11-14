export const imgDataToPixelArray = imgData => {
  let pixelArray = [];
  let row = [];

  for (let i = 0; i < imgData.data.length; i += 4) {
    row.push({
      red: imgData.data[i],
      green: imgData.data[i + 1],
      blue: imgData.data[i + 2],
      alpha: imgData.data[i + 3]
    });

    if (row.length === imgData.width) {
      pixelArray.push([...row]);
      row = [];
    }
  }
  return pixelArray;
};

export const pixelArrayToImgData = (pixelArray, width, height) => {
  let array = new Uint8ClampedArray(width * height * 4);

  let k = 0;
  for (let i = 0; i < pixelArray.length; i++)
    for (let j = 0; j < pixelArray[i].length; j++) {
      array[k] = pixelArray[i][j].red;
      array[k + 1] = pixelArray[i][j].green;
      array[k + 2] = pixelArray[i][j].blue;
      array[k + 3] = pixelArray[i][j].alpha;
      k += 4;
    }
  return new ImageData(array, width, height);
};

export const getNormalisedPixelValue = value => {
  return Math.max(0, Math.min(value, 255));
};
