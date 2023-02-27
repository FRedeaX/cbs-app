import { exceptionLog } from "../../../helpers";

/**
 * Возвращает `index` позиции в массиве смещений для следующего экрана.
 */
export const getNextScroll = (
  itemList: number[],
  currentScroll: number,
  containerWidth: number,
): number => {
  if (currentScroll + containerWidth >= itemList[0]) return 0;

  const nextItemScrollLeft = itemList.findIndex(
    (item) => item <= currentScroll + containerWidth,
  );

  if (nextItemScrollLeft === undefined) {
    exceptionLog("nextItemScrollLeft undefined");
    return 0;
  }

  return nextItemScrollLeft;
};
