import { isFront } from "./isFront";
import { Nullable } from "./typings/utility-types";

/**
 * Добавляет запрет на прокрутку содержимого на DOM-элементе.
 *
 * @param container Ссылка на DOM-элемент. По-умолчанию: `document.body`
 */
export const lock = (container?: Nullable<HTMLElement>) => {
  if (!isFront) return;

  const element = container ?? document.body;

  element.style.overflow = "hidden";
  element.style.marginRight = "var(--scrollbar-width)";
};

/**
 * Убирает запрет на прокрутку содержимого на DOM-элементе.
 *
 * @param container Ссылка на DOM-элемент. По-умолчанию: `document.body`
 */
export const unlock = (container?: Nullable<HTMLElement>) => {
  if (!isFront) return;

  const element = container ?? document.body;

  element.style.overflow = "";
  element.style.marginRight = "";
};
