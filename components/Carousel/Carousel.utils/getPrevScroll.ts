import { exceptionLog } from "../../../helpers";

/**
 * Возвращает `index` позиции в массиве смещений для предыдущего экрана.
 */
export const getPrevScroll = (
  itemList: number[],
  currentScroll: number,
  containerWidth: number,
): number => {
  if (currentScroll - containerWidth <= 0) return 0;

  const prevItemScrollLeft = itemList.findIndex(
    (item) => item >= currentScroll - containerWidth,
  );

  if (prevItemScrollLeft === undefined) {
    exceptionLog("getPrevScroll undefined");
    return 0;
  }

  return prevItemScrollLeft;
};
