// find a color gradient to match the album cover
// source:
// https://dev.to/producthackers/creating-a-color-palette-with-javascript-44ip

import { MusicData } from '@/data/musicData';

function quantization(
  rgbValues: {
    r: number;
    g: number;
    b: number;
  }[],
  depth: number
): {
  r: number;
  g: number;
  b: number;
}[] {
  const MAX_DEPTH = 4; // recursion depth

  // Base case
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev, curr) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;

        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );

    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);

    return [color];
  }
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
}

const findBiggestColorRange = (
  rgbValues: {
    r: number;
    g: number;
    b: number;
  }[]
) => {
  let rMin = Number.MAX_VALUE;
  let gMin = Number.MAX_VALUE;
  let bMin = Number.MAX_VALUE;

  let rMax = Number.MIN_VALUE;
  let gMax = Number.MIN_VALUE;
  let bMax = Number.MIN_VALUE;

  rgbValues.forEach((pixel) => {
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return 'r';
  } else if (biggestRange === gRange) {
    return 'g';
  } else {
    return 'b';
  }
};

function buildRgb(imageData: ImageData): {
  r: number;
  g: number;
  b: number;
}[] {
  const rgbValues = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    rgbValues.push({
      r: imageData.data[i],
      g: imageData.data[i + 1],
      b: imageData.data[i + 2],
    });
  }
  return rgbValues;
}

function findAverage(
  quantized: {
    r: number;
    g: number;
    b: number;
  }[]
) {
  const rgb = quantized.reduce(
    (
      prev: {
        r: number;
        g: number;
        b: number;
      },
      curr: {
        r: number;
        g: number;
        b: number;
      }
    ) => {
      prev.r += curr.r;
      prev.g += curr.g;
      prev.b += curr.b;

      return prev;
    },
    {
      r: 0,
      g: 0,
      b: 0,
    }
  );
  rgb.r = Math.round(rgb.r / quantized.length);
  rgb.g = Math.round(rgb.g / quantized.length);
  rgb.b = Math.round(rgb.b / quantized.length);
  return rgb;
}

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function findGradient(data: MusicData): Promise<string> {
  // if any error occurs, just return black
  return new Promise((resolve, reject) => {
    if (data) {
      const img = new Image();
      img.src = data.albumCover;
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        if (imageData) {
          const rgb = buildRgb(imageData);
          const quantized = quantization(rgb, 0);
          const average = findAverage(quantized);
          const averageColor = rgbToHex(average.r, average.g, average.b);
          resolve(averageColor);
        } else {
          resolve('#000000');
        }
      };
      img.onerror = () => {
        resolve('#000000');
      };
    }
    resolve('#000000');
  });
}
