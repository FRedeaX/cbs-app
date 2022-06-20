import {
  Children,
  cloneElement,
  FC,
  memo,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { IntersectionObserverHookRefCallback } from "../../helpers/frontend/hooks/useIntersectionObserver";

interface CaruselListProps {
  children: ReactNode;
  nodeListRefCallback: IntersectionObserverHookRefCallback;
}

const CaruselList: FC<CaruselListProps> = ({
  children,
  nodeListRefCallback,
}) => {
  const childrenListRef = useRef<Element[]>([]);
  const isSetChildrenRef = useRef<boolean>(false);

  const setRefs = useCallback(
    (node: Element, index: number): void => {
      if (node === null) return;

      childrenListRef.current[index] = node;
      if (index === Children.count(children) - 1 && !isSetChildrenRef.current) {
        nodeListRefCallback(childrenListRef.current);
        isSetChildrenRef.current = true;
      }
    },
    [children, nodeListRefCallback],
  );

  console.log("@CaruselList");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Children.map(children, (child: any, index: number) =>
    cloneElement(child, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: (ref: Element) => {
        setRefs(ref, index);
      },
    }),
  );
};

function areEqual(prevProps: CaruselListProps, nextProps: CaruselListProps) {
  return (
    Children.count(prevProps.children) === Children.count(nextProps.children)
  );
}

export default memo(CaruselList, areEqual);
