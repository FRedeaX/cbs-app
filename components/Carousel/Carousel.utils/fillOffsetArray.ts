import { _NodeListOf as NodeListOf } from "../../../helpers/typings/utility-types";
import { FULL_MARGIN } from "../Carousel.const";

/**
 * Заполняет прямой и обратный массив смещений (offset Left)
 *
 * @param itemMargin Отступ у элемента с одной стороны
 */
export const fillOffsetArray = (
  nodes: NodeListOf<HTMLElement>,
  itemMargin: number,
) => {
  const margin = itemMargin < 0 ? 0 : itemMargin * FULL_MARGIN;

  const itemWidthAccASC: number[] = [0];
  const itemWidthAccDESC: number[] = [0];

  nodes.forEach(({ clientWidth }) => {
    // Пропускаем последний элемент карусели
    if (itemWidthAccDESC.length === nodes.length) return;

    const lastValue = itemWidthAccASC[itemWidthAccASC.length - 1] ?? 0;
    itemWidthAccASC.push(clientWidth + margin + lastValue);

    const firstValue = itemWidthAccDESC[0] ?? 0;
    itemWidthAccDESC.unshift(clientWidth + margin + firstValue);
  });

  return {
    itemWidthAccASC,
    itemWidthAccDESC,
  };
};
