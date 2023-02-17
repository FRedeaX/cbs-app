import { CarouselContextProps } from "../Context/Carousel.Context";

type ScrollBehavior = "auto" | "smooth";

type ScrollToOptions = {
  left: number;
  behavior?: ScrollBehavior;
  scrollTime?: number;
} & Pick<CarouselContextProps, "typeMovement">;

export const SCROLL_TIME = 468;

/**
 * Прокручивает контейнер с помощью `scroll` или `transform`.
 */
export const scrollTo = (
  node: HTMLDivElement,
  { left, behavior, typeMovement, scrollTime = SCROLL_TIME }: ScrollToOptions,
) => {
  if (typeMovement === "scroll") {
    node.scrollTo({ left, behavior });
  } else {
    const childrenNode = node.children[0] as HTMLDivElement;

    childrenNode.style.transition = `transform ${scrollTime}ms ease`;
    childrenNode.style.transform = `translateX(${left * -1}px)`;
  }
};
