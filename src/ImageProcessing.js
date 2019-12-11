import { getNormalisedPixelValue } from "./Utils";

const BINARIZE_THRESHOLD = 255 / 2;

const computeGrayscale = pixel =>
  pixel.red * 0.21 + pixel.green * 0.72 + pixel.blue * 0.07;

const computeBW = pixel => 255 * (computeGrayscale(pixel) > BINARIZE_THRESHOLD);

const computeContrastIncrease = value =>
  ((Math.sin((Math.PI * value) / 255 - Math.PI / 2) + 1) / 2) * 255;

const computeRangeCompression = value =>
  (255 / Math.log(256)) * Math.log(1 + value);

export const invert = pixelArray => {
  pixelArray.forEach(row =>
    row.forEach(pixel => {
      pixel.red = 255 - pixel.red;
      pixel.green = 255 - pixel.green;
      pixel.blue = 255 - pixel.blue;
    })
  );
};

export const binarize = pixelArray => {
  pixelArray.forEach(row =>
    row.forEach(pixel => {
      const bw = computeBW(pixel);
      pixel.red = bw;
      pixel.green = bw;
      pixel.blue = bw;
    })
  );
};

export const grayscale = pixelArray => {
  pixelArray.forEach(row =>
    row.forEach(pixel => {
      const grayscale = computeGrayscale(pixel);
      pixel.red = grayscale;
      pixel.green = grayscale;
      pixel.blue = grayscale;
    })
  );
};

export const increaseContrast = pixelArray => {
  pixelArray.forEach(row =>
    row.forEach(pixel => {
      pixel.red = computeContrastIncrease(pixel.red);
      pixel.green = computeContrastIncrease(pixel.green);
      pixel.blue = computeContrastIncrease(pixel.blue);
    })
  );
};

export const rangeCompress = pixelArray => {
  pixelArray.forEach(row =>
    row.forEach(pixel => {
      pixel.red = computeRangeCompression(pixel.red);
      pixel.green = computeRangeCompression(pixel.green);
      pixel.blue = computeRangeCompression(pixel.blue);
    })
  );
};

export const extractBit = pixelArray => {
  pixelArray.forEach(row =>
    row.forEach(pixel => {
      const bits = 7;
      pixel.red = (pixel.red & bits) !== bits ? 255 : pixel.red;
      pixel.green = (pixel.green & bits) !== bits ? 255 : pixel.green;
      pixel.blue = (pixel.blue & bits) !== bits ? 255 : pixel.blue;
    })
  );
};

export const diff = (pixelArray, diffPixelArray) => {
  for (let i = 0; i < pixelArray.length; i++)
    for (let j = 0; j < pixelArray[i].length; j++) {
      let pixel = pixelArray[i][j];
      let diffPixel = diffPixelArray[i][j];
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

export const laplacian = pixelArray => {
  let tempArray = JSON.parse(JSON.stringify(pixelArray));

  const matrix = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]
  ];

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      let newPixel = { red: 0, green: 0, blue: 0 };

      for (let k = -1; k <= 1; k++)
        for (let l = -1; l <= 1; l++) {
          const weight = matrix[1 + k][1 + l];

          newPixel.red += pixelArray[i + k][j + l].red * weight;
          newPixel.green += pixelArray[i + k][j + l].green * weight;
          newPixel.blue += pixelArray[i + k][j + l].blue * weight;
        }

      tempArray[i][j].red = getNormalisedPixelValue(newPixel.red);
      tempArray[i][j].green = getNormalisedPixelValue(newPixel.green);
      tempArray[i][j].blue = getNormalisedPixelValue(newPixel.blue);
    }

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      pixelArray[i][j].red = tempArray[i][j].red;
      pixelArray[i][j].green = tempArray[i][j].green;
      pixelArray[i][j].blue = tempArray[i][j].blue;
    }
};

export const bandPass = pixelArray => {
  let tempArray1 = JSON.parse(JSON.stringify(pixelArray));
  let tempArray2 = JSON.parse(JSON.stringify(pixelArray));

  const lowPassMatrix1 = [
    [1 / 16, 1 / 8, 1 / 16],
    [1 / 8, 1 / 4, 1 / 8],
    [1 / 16, 1 / 8, 1 / 16]
  ];

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      let newPixel = { red: 0, green: 0, blue: 0 };

      for (let k = -1; k <= 1; k++)
        for (let l = -1; l <= 1; l++) {
          const weight = lowPassMatrix1[1 + k][1 + l];

          newPixel.red += pixelArray[i + k][j + l].red * weight;
          newPixel.green += pixelArray[i + k][j + l].green * weight;
          newPixel.blue += pixelArray[i + k][j + l].blue * weight;
        }

      tempArray1[i][j].red = newPixel.red;
      tempArray1[i][j].green = newPixel.green;
      tempArray1[i][j].blue = newPixel.blue;
    }

  const lowPassMatrix2 = [
    [0, 1 / 8, 0],
    [1 / 8, 1 / 2, 1 / 8],
    [0, 1 / 8, 0]
  ];

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      let newPixel = { red: 0, green: 0, blue: 0 };

      for (let k = -1; k <= 1; k++)
        for (let l = -1; l <= 1; l++) {
          const weight = lowPassMatrix2[1 + k][1 + l];

          newPixel.red += pixelArray[i + k][j + l].red * weight;
          newPixel.green += pixelArray[i + k][j + l].green * weight;
          newPixel.blue += pixelArray[i + k][j + l].blue * weight;
        }

      tempArray2[i][j].red = newPixel.red;
      tempArray2[i][j].green = newPixel.green;
      tempArray2[i][j].blue = newPixel.blue;
    }

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      pixelArray[i][j].red = getNormalisedPixelValue(
        tempArray2[i][j].red - tempArray1[i][j].red);
      pixelArray[i][j].green = getNormalisedPixelValue(
        tempArray2[i][j].green - tempArray1[i][j].green);
      pixelArray[i][j].blue = getNormalisedPixelValue(
        tempArray2[i][j].blue - tempArray1[i][j].blue);
    }
};

export const highPass = pixelArray => {
  let tempArray = JSON.parse(JSON.stringify(pixelArray));

  const matrix = [
    [1 / 16, 1 / 8, 1 / 16],
    [1 / 8, 1 / 4, 1 / 8],
    [1 / 16, 1 / 8, 1 / 16]
  ];

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      let newPixel = { red: 0, green: 0, blue: 0 };

      for (let k = -1; k <= 1; k++)
        for (let l = -1; l <= 1; l++) {
          const weight = matrix[1 + k][1 + l];

          newPixel.red += pixelArray[i + k][j + l].red * weight;
          newPixel.green += pixelArray[i + k][j + l].green * weight;
          newPixel.blue += pixelArray[i + k][j + l].blue * weight;
        }

      tempArray[i][j].red = getNormalisedPixelValue(newPixel.red);
      tempArray[i][j].green = getNormalisedPixelValue(newPixel.green);
      tempArray[i][j].blue = getNormalisedPixelValue(newPixel.blue);
    }

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      pixelArray[i][j].red = getNormalisedPixelValue(
        pixelArray[i][j].red - tempArray[i][j].red);
      pixelArray[i][j].green = getNormalisedPixelValue(
        pixelArray[i][j].green - tempArray[i][j].green);
      pixelArray[i][j].blue = getNormalisedPixelValue(
        pixelArray[i][j].blue - tempArray[i][j].blue);
    }
};

export const directional = pixelArray => {
  let tempArray = JSON.parse(JSON.stringify(pixelArray));

  const directions = [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]
  ];

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      const pixel = pixelArray[i][j];
      let avgPixels = [];

      for (let m = 0; m < 4; m++) {
        let avgPixel = { red: 0, green: 0, blue: 0 };

        for (let k = -1; k <= 1; k++)
          for (let l = -1; l <= 1; l++) {
            const weight = directions[m][1 + k][1 + l];
            avgPixel.red += pixelArray[i + k][j + l].red * weight;
            avgPixel.green += pixelArray[i + k][j + l].green * weight;
            avgPixel.blue += pixelArray[i + k][j + l].blue * weight;
          }
        avgPixel.red /= 3;
        avgPixel.green /= 3;
        avgPixel.blue /= 3;
        avgPixels.push(avgPixel);
      }

      let minDiff = Math.abs(
        avgPixels[0].red +
        avgPixels[0].green +
        avgPixels[0].blue -
        pixel.red -
        pixel.green -
        pixel.blue
      );
      let bestPixel = avgPixels[0];

      for (let m = 1; m < 4; m++) {
        const diff = Math.abs(
          avgPixels[m].red +
          avgPixels[m].green +
          avgPixels[m].blue -
          pixel.red -
          pixel.green -
          pixel.blue
        );
        if (diff < minDiff) {
          bestPixel = avgPixels[m];
          minDiff = diff;
        }
      }

      tempArray[i][j].red = bestPixel.red;
      tempArray[i][j].green = bestPixel.green;
      tempArray[i][j].blue = bestPixel.blue;
    }

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      pixelArray[i][j].red = tempArray[i][j].red;
      pixelArray[i][j].green = tempArray[i][j].green;
      pixelArray[i][j].blue = tempArray[i][j].blue;
    }
};

const xor = (a, b) => (a ? 1 : 0) ^ (b ? 1 : 0);

const isBlack = (pixel) =>
  pixel.red === 0 && pixel.green === 0 && pixel.blue === 0;

const isEdge = (pixelArray, i, j) => {
  const pixel = pixelArray[i][j];
  const up = pixelArray[i - 1][j];
  const down = pixelArray[i + 1][j];
  const left = pixelArray[i][j - 1];
  const right = pixelArray[i][j + 1];

  return xor(isBlack(pixel), isBlack(up) || isBlack(down)) ||
    xor(isBlack(pixel), isBlack(left) || isBlack(right));
};

export const edge = (pixelArray) => {
  let tempArray = JSON.parse(JSON.stringify(pixelArray));

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {

      if (!isEdge(pixelArray, i, j)) {
        tempArray[i][j].red = 255;
        tempArray[i][j].green = 255;
        tempArray[i][j].blue = 255;

      } else {
        tempArray[i][j].red = 0;
        tempArray[i][j].green = 0;
        tempArray[i][j].blue = 0;
      }
    }

  for (let i = 1; i < pixelArray.length - 1; i++)
    for (let j = 1; j < pixelArray[i].length - 1; j++) {
      pixelArray[i][j].red = tempArray[i][j].red;
      pixelArray[i][j].green = tempArray[i][j].green;
      pixelArray[i][j].blue = tempArray[i][j].blue;
    }
};

export const skeleton = (pixelArray) => {
  let dist_matrix = Array.from(Array(pixelArray.length),
    _ => Array(pixelArray[0].length).fill(0));

  let maxDist = 0;

  for (let i = 0; i < pixelArray.length; i++) {
    for (let j = 0; j < pixelArray[i].length; j++) {
      if (!isBlack(pixelArray[i][j]))
        continue;

      let search = 0;

      let found = false;
      let dist = 0;

      try {
        while (!found) {
          for (let k = -search; k <= search; k++)
            for (let l = -search; l <= search; l++)
              if (isEdge(pixelArray, i + k, j + l)) {
                dist = search;
                found = true;
              }
          search++;
        }
      } catch (ignored) {
      }

      dist_matrix[i][j] = dist;

      if (dist > maxDist)
        maxDist = dist;
    }
  }

  // let temp_dist_matrix = JSON.parse(JSON.stringify(dist_matrix));
  //
  // let search = 2;
  // for (let i = search; i < dist_matrix.length - search; i++) {
  //   for (let j = search; j < dist_matrix[i].length - search; j++) {
  //     for (let k = -search; k <= search; k++)
  //       for (let l = -search; l <= search; l++)
  //         if (dist_matrix[i][j] < dist_matrix[i + k][j + l])
  //           temp_dist_matrix[i][j] = 0;
  //   }
  // }
  // for (let i = 0; i < dist_matrix.length; i++) {
  //   for (let j = 0; j < dist_matrix[i].length; j++) {
  //     dist_matrix[i][j] = temp_dist_matrix[i][j];
  //   }
  // }

  for (let i = 0; i < pixelArray.length; i++) {
    for (let j = 0; j < pixelArray[i].length; j++) {
      pixelArray[i][j].red = 255 - 255 * dist_matrix[i][j] / maxDist;
      pixelArray[i][j].green = 255 - 255 * dist_matrix[i][j] / maxDist;
      pixelArray[i][j].blue = 255 - 255 * dist_matrix[i][j] / maxDist;
    }
  }

  return dist_matrix;
};

export const reconstruct = (pixelArray, dist_matrix) => {
  for (let i = 0; i < dist_matrix.length; i++) {
    for (let j = 0; j < dist_matrix[i].length; j++) {
      let dist = dist_matrix[i][j];
      if (dist !== 0) {
        for (let k = -dist; k <= dist; k++)
          for (let l = -dist; l <= dist; l++) {
            if ((Math.pow(Math.abs(k), 2)) + Math.pow(Math.abs(l), 2) <=
              Math.pow(dist, 2)) {
              pixelArray[i + k][j + l].red = 0;
              pixelArray[i + k][j + l].green = 0;
              pixelArray[i + k][j + l].blue = 0;
            }
          }
      }
    }
  }
};
