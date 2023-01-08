import { MutableRefObject, TouchEvent, WheelEvent, createContext } from "react";

import { Nullable } from "../../../helpers/typings/utility-types";

export type CarouselContextHTMLNode = Nullable<HTMLDivElement>;

export type CarouselContextSetItemWidth = (width: number) => void;

export type CarouselContextHandleOnScroll = (
  event: TouchEvent<HTMLDivElement> | WheelEvent<HTMLDivElement>,
) => void;

type CarouselContextProps = {
  /**
   * Cсылка на корневой прокручиваемый элемент `DOM`
   */
  rootRef: MutableRefObject<CarouselContextHTMLNode>;

  /**
   * Cсылка на крайний левый узел `DOM`
   */
  leftSideNodeRef: MutableRefObject<CarouselContextHTMLNode>;

  /**
   * Cсылка на крайний правый узел `DOM`
   */
  rightSideNodeRef: MutableRefObject<CarouselContextHTMLNode>;

  /**
   * Локальное состояние прокрутки `rootRef`
   */
  scroll: MutableRefObject<number>;

  /**
   * Отступ у элемента с одной стороны
   */
  itemMargin: number;

  /**
   * Массив смещений
   */
  itemWidthAccumulatedASC: MutableRefObject<number[]>;

  /**
   * Обратный массив смещений
   */
  itemWidthAccumulatedDESC: MutableRefObject<number[]>;

  /**
   * Заполняет прямой и обратный массив смещений (offset Left)
   * @param width
   */
  setItemWidth: CarouselContextSetItemWidth;

  /**
   * Синхронизирует положение прокрутки `DOM` с локальным значением,
   * т.к. `onClick` для возможности прокрутить еще
   * в момент анимации использует локальное значение
   */
  handleOnScroll: CarouselContextHandleOnScroll;
};

export const CarouselContext =
  createContext<Nullable<CarouselContextProps>>(null);
