import {
  Children,
  FC,
  ReactElement,
  cloneElement,
  memo,
  useCallback,
  useRef,
} from "react";

import { IntersectionObserverHookRefCallback } from "../../helpers/frontend/hooks/useIntersectionObserver";

interface ICarouselListProps {
  children: ReactElement[];
  nodeListRefCallback: IntersectionObserverHookRefCallback;
}

const CarouselList: FC<ICarouselListProps> = ({
  children,
  nodeListRefCallback,
}) => {
  const childrenListRef = useRef<Element[]>([]);

  const setRefs = useCallback(
    (node: Element, index: number): void => {
      if (node === null) return;

      childrenListRef.current[index] = node;
      if (index === Children.count(children) - 1) {
        nodeListRefCallback(childrenListRef.current);
      }
    },
    [children, nodeListRefCallback],
  );

  return (
    <>
      {Children.map(children, (child: ReactElement, index: number) =>
        cloneElement(child, {
          "data-idx": index + 1,
          ref: (ref: Element) => {
            setRefs(ref, index);
          },
        }),
      )}
    </>
  );
};

function areEqual(
  prevProps: ICarouselListProps,
  nextProps: ICarouselListProps,
) {
  return (
    prevProps.children[0]?.key === nextProps.children[0]?.key &&
    prevProps.children[0]?.props.className ===
      nextProps.children[0]?.props.className &&
    Children.count(prevProps.children) === Children.count(nextProps.children)
  );
}

export default memo(CarouselList, areEqual);
