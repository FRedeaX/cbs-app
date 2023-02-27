/**
 * Разделяет массив на 2 подмассива по следующим условиям:
 *
 *  - images.legth <= 2 return { big: [0, 1], small: [] }
 *  - images.legth === 3 return { big: [0], small: [1, 2] }
 *  - images.legth === 4 return { big: [0], small: [1, 2, 3] }
 *  - images.legth >= 5 return { big: [0, 1], small: [2, 3, 4, .. 9] }
 */
export const splitByLines = <T>(array: T[]) => {
  if (array.length > 2 && array.length < 5) {
    return { big: array.slice(0, 1), small: array.slice(1) };
  }

  return { big: array.slice(0, 2), small: array.slice(2, 10) };
};
