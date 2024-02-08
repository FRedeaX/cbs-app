import { calcOffset } from "./calcOffset";

type Vector = [number, number];

/**
 * Рассчитывает допустимое смещение элемента
 * относительно родительского элемента (для каждой оси).
 *
 * @param scale Масштаб
 * @param target Элемент
 * @param container Родительский элемент
 */
export const getOffset = (
  scale: number,
  target: EventTarget,
  container: HTMLElement,
): Vector => [
  Math.max(
    calcOffset(
      scale,
      (target as HTMLElement).clientWidth,
      container.clientWidth,
    ),
    0,
  ),
  Math.max(
    calcOffset(
      scale,
      (target as HTMLElement).clientHeight,
      container.clientHeight,
    ),
    0,
  ),
];
