import {
  Children,
  cloneElement,
  FC,
  memo,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import { IntersectionObserverHookRefCallback } from "../../helpers/frontend/hooks/useIntersectionObserver";

interface CaruselListProps {
  children: ReactElement[];
  nodeListRefCallback: IntersectionObserverHookRefCallback;
}

const CaruselList: FC<CaruselListProps> = ({
  children,
  nodeListRefCallback,
}) => {
  const childrenListRef = useRef<Element[]>([]);
  // const isSetChildrenRef = useRef<boolean>(false);

  const setRefs = useCallback(
    (node: Element, index: number): void => {
      if (node === null) return;

      childrenListRef.current[index] = node;
      if (index === Children.count(children) - 1) {
        nodeListRefCallback(childrenListRef.current);
        // isSetChildrenRef.current = true;
      }
    },
    [children, nodeListRefCallback],
  );

  return Children.map(children, (child: ReactElement, index: number) =>
    cloneElement(child, {
      ref: (ref: Element) => {
        setRefs(ref, index);
      },
    }),
  );
};

function areEqual(prevProps: CaruselListProps, nextProps: CaruselListProps) {
  return (
    prevProps.children[0].key === nextProps.children[0].key &&
    Children.count(prevProps.children) === Children.count(nextProps.children)
  );
}

export default memo(CaruselList, areEqual);
