import { MutableRefObject, createContext } from "react";

import {
  Maybe,
  _NodeListOf as NodeListOf,
  Nullable,
} from "../../../helpers/typings/utility-types";

export type CarouselContextHTMLNode = Nullable<HTMLDivElement>;
export type CarouselContextItemListRef = Maybe<NodeListOf<HTMLElement>>;

export type CarouselContextRefCallback = (
  node: CarouselContextHTMLNode,
) => void;

type CarouselContextProps = {
  /**
   * Cсылка на корневой прокручиваемый элемент `DOM`.
   */
  rootRef: MutableRefObject<CarouselContextHTMLNode>;

  /**
   * Обратный вызов устанавливает
   * ссылку на корневой прокручиваемый элемент `DOM`.
   *
   * Прокручивает контейнер если `indexOfVisibleElement` больше 0.
   */
  rootRefCallback: CarouselContextRefCallback;

  /**
   * Cсылка на крайний левый узел `DOM`.
   */
  leftSideNodeRef: MutableRefObject<CarouselContextHTMLNode>;

  /**
   * Cсылка на крайний правый узел `DOM`.
   */
  rightSideNodeRef: MutableRefObject<CarouselContextHTMLNode>;

  /**
   * Cсылка на `DOM` элемент
   * который содержит список дочерних элементов карусели.
   */
  itemListRef: MutableRefObject<CarouselContextItemListRef>;

  /**
   * Обратный вызов устанавливает ссылку на `DOM` элемент
   * который содержит список дочерних элементов карусели.
   *
   * Заполненяет прямой и обратный массив смещений.
   */
  itemListRefCallback: CarouselContextRefCallback;

  /**
   * Локальное состояние прокрутки `rootRef`.
   */
  scroll: MutableRefObject<number>;

  /**
   * `index` видимого элемента.
   */
  indexOfVisibleElement: MutableRefObject<number>;

  /**
   * Отступ у элемента с одной стороны.
   */
  itemMargin: number;

  /**
   * Массив смещений.
   */
  itemWidthAccumulatedASC: MutableRefObject<number[]>;

  /**
   * Обратный массив смещений.
   */
  itemWidthAccumulatedDESC: MutableRefObject<number[]>;
};

export const CarouselContext =
  createContext<Nullable<CarouselContextProps>>(null);
