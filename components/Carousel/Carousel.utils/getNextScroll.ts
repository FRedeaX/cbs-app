import { exceptionLog } from "../../../helpers";

/**
 * Возвращает позицию `scroll` для следующего экрана
 */
export const getNextScroll = (
  itemList: number[],
  currentScroll: number,
  containerWidth: number,
): number => {
  const nextItemScrollLeft = itemList.find(
    (item) => item <= currentScroll + containerWidth,
  );

  if (nextItemScrollLeft === undefined) {
    exceptionLog("nextItemScrollLeft undefined");
    return 0;
  }

  return nextItemScrollLeft;
};
