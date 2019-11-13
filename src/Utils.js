export const imgDataToPixelArray = imgData => {
  let pixelArray = [];
  let column = 0;
  let row = [];

  for (let i = 0; i < imgData.data.length; i += 4) {
    
    column++;
    row.push({
      red: imgData.data[i],
      green: imgData.data[i + 1],
      blue: imgData.data[i + 2],
      alpha: imgData.data[i + 3]
    });

    if (column === imgData.width) {
      pixelArray.push(row);
      
      row = [];
      column = 0;
    }
  }
  return pixelArray;
};

export const pixelArrayToImgData = (pixelArray, width, height) => {
  let array = new Uint8ClampedArray(width * height * 4);

  let j = 0;
  pixelArray.forEach(row => {
    row.forEach(pixel => {
      array[j] = pixel.red;
      array[j + 1] = pixel.green;
      array[j + 2] = pixel.blue;
      array[j + 3] = pixel.alpha;
      j += 4;
    });
  });

  return new ImageData(array, width, height);
};
