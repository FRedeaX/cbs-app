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
  const margin = itemMargin * FULL_MARGIN;
  const itemWidthAccASC: number[] = [];
  const itemWidthAccDESC: number[] = [];

  nodes.forEach(({ clientWidth }) => {
    // Пропускаем последний элемент карусели
    // и правую отбивку с правым отступом `rightSideNodeRef`
    if (itemWidthAccDESC.length === nodes.length - 2) return;

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
