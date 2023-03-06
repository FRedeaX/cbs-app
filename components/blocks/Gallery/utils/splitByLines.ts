type splitByLinesResult<T> = {
  big: T[];
  small: T[];
};

/**
 * *1.5 - соотношение 2:3*
 *
 * Разделяет массив на 2 подмассива по следующим условиям:
 *
 *  - array.legth <= 2 return { big: [0, 1], small: [] }
 *  - array.legth === 3
 *    - aspectRatio <= 1.5 return { big: [0, 1, 2], small: [] }
 *    - aspectRatio > 1.5 return { big: [0], small: [1, 2] }
 *  - array.legth === 4
 *    - aspectRatio <= 1.5 return { big: [0, 1, 2, 3], small: [] }
 *    - aspectRatio > 1.5 return { big: [0], small: [1, 2, 3] }
 *  - array.legth >= 5 return { big: [0, 1], small: [2, 3, 4, .. 9] }
 *
 * @param array Массив изображений.
 * @param aspectRatio Соотношение сторон первого изображения.
 */
export const splitByLines = <T>(
  array: T[],
  aspectRatio: number,
): splitByLinesResult<T> => {
  if (array.length > 2 && array.length < 5) {
    if (aspectRatio < 1.5) {
      return { big: array, small: [] };
    }

    return { big: array.slice(0, 1), small: array.slice(1) };
  }

  return { big: array.slice(0, 2), small: array.slice(2, 10) };
};
