import { ImageData } from "../components/Gallery.Row/Gallery.Row";

type SplitByLinesResult = {
  first: ImageData[];
  last: ImageData[];
};

/**
 * *1.5 - соотношение 2:3*
 *
 * Разделяет массив на 2 подмассива по следующим условиям:
 *
 * - array.legth <= 2 return { first: [0, 1], last: [] }
 * - aspectRatioFirst < 1.5 { first: [0, ... n], last: [n, ... 9] }
 *   - first.length < 2 && array.length > 4 { first: [0, 1, ... n], last: [n, ... 9] }
 * - aspectRatioLast < 1.5 { first: [0, 1, ...last], last: [] }
 *
 * @param array Массив изображений.
 */
export const splitByLines = (
  array: ImageData[],
  // aspectRatio: number,
): SplitByLinesResult => {
  const first: ImageData[] = [];
  const last: ImageData[] = [];
  let aspectRatioFirst = 0;
  let aspectRatioLast = 0;

  if (array.length <= 2) return { first: array, last: [] };

  array.forEach((element) => {
    if (aspectRatioFirst < 1.5 || (first.length < 2 && array.length > 4)) {
      first.push(element);
      aspectRatioFirst += element.width / element.height;
    } else {
      aspectRatioLast += element.width / element.height;
      last.push(element);
    }
  });

  if (aspectRatioLast < 1.5) {
    first.push(...last);
    last.splice(0);
  }

  return { first, last };
};
