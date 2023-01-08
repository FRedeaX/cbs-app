/**
 * Рассчитывает отступ для центрирования элементов внутри контейнера.
 */
export const offsetSides = (
  containerWidth: number,
  nodeSum: number,
  itemMargin: number,
): number => (containerWidth - nodeSum) / 2 - itemMargin;
