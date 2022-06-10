import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const DEFAULT_ROOT_MARGIN = "0px";
const DEFAULT_THRESHOLD = [0];

export type IntersectionObserverHookArgs = IntersectionObserverInit;

export type IntersectionObserverHookRefCallbackNode =
  | Element
  | Element[]
  | null;

export type IntersectionObserverHookRefCallback = (
  node: IntersectionObserverHookRefCallbackNode,
) => void;

export type IntersectionObserverHookRootRefCallbackNode =
  IntersectionObserverHookArgs["root"];

export type IntersectionObserverHookRootRefCallback = (
  node: IntersectionObserverHookRootRefCallbackNode,
) => void;

export type IntersectionObserverHookResult = [
  IntersectionObserverHookRefCallback,
  {
    entry: IntersectionObserverEntry | IntersectionObserverEntry[] | undefined;
    rootRef: IntersectionObserverHookRootRefCallbackNode;
    rootRefCallback: IntersectionObserverHookRootRefCallback;
    // isVisible: boolean;
  },
];

// Взято из https://github.com/onderonur/react-intersection-observer-hook/blob/master/src/useIntersectionObserver.ts
function useIntersectionObserver(
  args: IntersectionObserverHookArgs,
): IntersectionObserverHookResult {
  const rootMargin = args?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const threshold = args?.threshold ?? DEFAULT_THRESHOLD;

  const nodeRef = useRef<IntersectionObserverHookRefCallbackNode>(null);
  const rootRef = useRef<IntersectionObserverHookRootRefCallbackNode>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [entry, setEntry] = useState<
    IntersectionObserverEntry | IntersectionObserverEntry[]
  >();
  // const isVisible = Boolean(entry?.isIntersecting);

  const unobserve = useCallback(() => {
    // Disconnect the current observer (if there is one)
    const currentObserver = observerRef.current;
    currentObserver?.disconnect();
    observerRef.current = null;
  }, []);

  const observeCallback = useCallback(
    (
      newEntry: SetStateAction<
        IntersectionObserverEntry | IntersectionObserverEntry[] | undefined
      >,
    ) => {
      console.log(newEntry);

      // setEntry(newEntry);
    },
    [],
  );
  const observe = useCallback(() => {
    const node = nodeRef.current;
    if (node) {
      const root = rootRef.current;
      const options = { root, rootMargin, threshold };

      // Create a observer for current "node" with given options.
      const observer = new IntersectionObserver(observeCallback, options);
      // const observer = new IntersectionObserver(
      //   (entry) => callback(entry),
      //   options,
      // );

      // observer.observe(node[0]);

      if (typeof node === "object") {
        node.forEach((item: Element) => {
          observer.observe(item);
        });
      } else {
        observer.observe(node);
      }

      observerRef.current = observer;
    }
  }, [observeCallback, rootMargin, threshold]);

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

  return [refCallback, { entry, rootRef, rootRefCallback }];
}

export default useIntersectionObserver;
