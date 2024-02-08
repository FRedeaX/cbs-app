/**
 * Возвращает размер элемента и его позицию относительно viewport.
 *
 * @returns getBoundingClientRect
 */
export const getBox = (element: EventTarget) =>
  (element as HTMLElement).getBoundingClientRect();
