import { exceptionLog } from "../../../helpers";

/**
 * Возвращает позицию `scroll` для предыдущего экрана
 */
export const getPrevScroll = (
  itemWidthAccumulated: number[],
  currentScroll: number,
  containerWidth: number,
): number => {
  if (currentScroll - containerWidth <= 0) return 0;

  const prevItemScrollLeft = itemWidthAccumulated.find(
    (item) => item >= currentScroll - containerWidth,
  );

  if (prevItemScrollLeft === undefined) {
    exceptionLog("getPrevScroll undefined");
    return 0;
  }

  return prevItemScrollLeft;
};
