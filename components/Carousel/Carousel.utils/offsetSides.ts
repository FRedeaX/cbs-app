/**
 * Рассчитывает отступ для центрирования элементов внутри контейнера.
 *
 * @param containerWidth ширина контейнера
 * @param currentScroll текущее значение
 * @param newScroll новое (следующее) значение
 * @param itemMargin отступ у элемента с одной стороны
 */
export const offsetSides = (
  containerWidth: number,
  currentScroll: number,
  newScroll: number,
  itemMargin: number,
): number => {
  // Eсли следующий элемент занимает всю ширину экрана nodeSum не рассчитываем
  const isItemFullWidth = newScroll % containerWidth;
  // Если сумма ширины элементов на экране 0, то смещение равно 0.
  const nodeSum = isItemFullWidth && Math.abs(currentScroll - newScroll);

  return nodeSum === 0 ? 0 : (containerWidth - nodeSum) / 2 - itemMargin;
};
