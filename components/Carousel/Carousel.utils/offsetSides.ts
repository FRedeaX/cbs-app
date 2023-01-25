/**
 * Рассчитывает отступ для центрирования элементов внутри контейнера.
 * Если сумма ширины элементов на экране 0, то смещение равно 0.
 *
 * @param containerWidth ширина контейнера
 * @param nodeSum сумма ширины элементов на экране
 * @param itemMargin отступ у элемента с одной стороны
 */
export const offsetSides = (
  containerWidth: number,
  nodeSum: number,
  itemMargin: number,
): number => (nodeSum === 0 ? 0 : (containerWidth - nodeSum) / 2 - itemMargin);
