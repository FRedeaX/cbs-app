"use client";

import { MutableRefObject, createContext } from "react";

import { Maybe, Nullable } from "../../../helpers/typings/utility-types";

export type CarouselContextHTMLNode = Nullable<HTMLDivElement>;
export type CarouselContextItemListRef = Maybe<HTMLElement[]>;

export type CarouselContextRefCallback = (
  node: CarouselContextHTMLNode,
) => void;

export type CarouselContextProps = {
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
   * Cсылка на `DOM` элемент,
   * который содержит список дочерних элементов карусели.
   */
  itemListRef: MutableRefObject<CarouselContextItemListRef>;

  /**
   * Обратный вызов устанавливает ссылку на `DOM` элемент,
   * который содержит список дочерних элементов карусели.
   *
   * Заполненяет прямой и обратный массив смещений.
   */
  itemListRefCallback: CarouselContextRefCallback;

  /**
   * Локальное состояние scrollLeft.
   */
  scroll: MutableRefObject<number>;

  /**
   * `index` элемента, к которому был выполнен переход.
   */
  indexOfVisibleElement: MutableRefObject<number>;

  /**
   * Массив смещений.
   */
  itemWidthAccumulatedASC: MutableRefObject<number[]>;

  /**
   * Обратный массив смещений.
   */
  itemWidthAccumulatedDESC: MutableRefObject<number[]>;

  /**
   * Отступ у элемента с одной стороны.
   *
   * @default 0
   */
  itemMargin: number;

  /**
   * Тип движения карусели.
   *
   * @default scroll
   */
  typeMovement: "scroll" | "transform";
};

export const CarouselContext =
  createContext<Nullable<CarouselContextProps>>(null);
