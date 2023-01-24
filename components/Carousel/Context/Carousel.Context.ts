import { MutableRefObject, createContext } from "react";

import { Nullable } from "../../../helpers/typings/utility-types";

export type CarouselContextHTMLNode = Nullable<HTMLDivElement>;

export type CarouselContextItemListRefCallback = (
  node: CarouselContextHTMLNode,
) => void;

export type CarouselContextScrollToIndex = (index?: number) => void;

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
   * Обратный вызов на родителе
   * который содержит список дочерних элементов карусели
   */
  itemListRefCallback: CarouselContextItemListRefCallback;

  /**
   * Локальное состояние прокрутки `rootRef`
   */
  scroll: MutableRefObject<number>;

  /**
   * `index` видимого элемента
   */
  indexOfVisibleElement: MutableRefObject<number>;

  /**
   * Прокручивает контейнер к элементу
   *
   * @param index
   */
  scrollToIndex: CarouselContextScrollToIndex;

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
};

export const CarouselContext =
  createContext<Nullable<CarouselContextProps>>(null);
