/**
 * Рассчитывает допустимое смещение элемента
 * относительно родительского элемента.
 *
 * @param scale Масштаб
 * @param targetSize Размер элемента
 * @param containerSize Размер родительского элемента
 */
export const calcOffset = (
  scale: number,
  targetSize: number,
  containerSize: number,
) => (targetSize * scale - containerSize) / 2;
