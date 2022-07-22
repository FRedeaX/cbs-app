import { useCallback, useEffect, useRef } from "react";

const DEFAULT_ROOT_MARGIN = "0px";
const DEFAULT_THRESHOLD = [0];
interface IntersectionObserverInit {
  rootMargin?: string;
  threshold?: number | number[];
}
interface IntersectionObserverCallback {
  (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
}

export type IntersectionObserverHookArgs = IntersectionObserverInit;

export type IntersectionObserverHookRefNode = Element | Element[] | null;

export type IntersectionObserverHookRefCallback = (
  node: IntersectionObserverHookRefNode,
) => void;

export type IntersectionObserverHookRootRefNode = Element | Document | null;

export type IntersectionObserverHookRootRefCallback = (
  node: IntersectionObserverHookRootRefNode,
) => void;

export type IntersectionObserverHookResult = [
  IntersectionObserverHookRefCallback,
  {
    // entry: IntersectionObserverEntry | IntersectionObserverEntry[] | undefined;
    rootRef: IntersectionObserverHookRootRefNode;
    rootRefCallback: IntersectionObserverHookRootRefCallback;
  },
];

// Взято из https://github.com/onderonur/react-intersection-observer-hook/blob/master/src/useIntersectionObserver.ts
function useIntersectionObserver(
  args: IntersectionObserverHookArgs,
  callback: IntersectionObserverCallback,
): IntersectionObserverHookResult {
  const rootMargin = args?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const threshold = args?.threshold ?? DEFAULT_THRESHOLD;

  const nodeRef = useRef<IntersectionObserverHookRefNode>(null);
  const rootRef = useRef<IntersectionObserverHookRootRefNode>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const unobserve = useCallback(() => {
    // Disconnect the current observer (if there is one)
    const currentObserver = observerRef.current;
    currentObserver?.disconnect();
    observerRef.current = null;
  }, []);

  const observe = useCallback(() => {
    const node = nodeRef.current;
    if (node) {
      const root = rootRef.current;
      const options = { root, rootMargin, threshold };

      const observer = new IntersectionObserver(callback, options);

      if (Array.isArray(node)) {
        node.forEach((item) => {
          observer.observe(item);
        });
      } else {
        observer.observe(node);
      }

      observerRef.current = observer;
    }
  }, [callback, rootMargin, threshold]);

  const initializeObserver = useCallback(() => {
    unobserve();
    observe();
  }, [observe, unobserve]);

  const refCallback = useCallback<IntersectionObserverHookRefCallback>(
    (node) => {
      nodeRef.current = node;
      initializeObserver();
    },
    [initializeObserver],
  );

  const rootRefCallback = useCallback<IntersectionObserverHookRootRefCallback>(
    (rootNode) => {
      rootRef.current = rootNode;
      initializeObserver();
    },
    [initializeObserver],
  );

  useEffect(() => {
    initializeObserver();
    return () => {
      unobserve();
    };
  }, [initializeObserver, unobserve]);

  return [refCallback, { rootRef: rootRef.current, rootRefCallback }];
}

export default useIntersectionObserver;
