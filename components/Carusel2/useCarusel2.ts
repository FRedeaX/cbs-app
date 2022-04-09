import { useCallback, useRef } from "react";

export default function useCarusel2() {
  const scrolledRef = useRef<Element | null>(null);
  const refCallback = useCallback((node) => {
    scrolledRef.current = node;
  }, []);

  const hendleScroll = useCallback((direction: "next" | "prev"): void => {
    console.log(direction);
  }, []);

  const onKeyDownHendler = ({ key }: any) => {
    if (key === "ArrowRight" || key === "d") hendleScroll("next");
    if (key === "ArrowLeft" || key === "a") hendleScroll("prev");
  };

  return [refCallback, { hendleScroll, onKeyDownHendler }];
}
