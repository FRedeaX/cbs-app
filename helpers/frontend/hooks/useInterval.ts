import { useRef, useEffect } from "react";

import { Maybe, Void } from "@/helpers/typings/utility-types";

/**
 * Выполяет периодические действия.
 * @param cb Функция обратного вызова.
 * @param ms Интервал в миллисекундах.
 *
 * @example
 * useInterval(fn, 1000)
 */
export function useInterval(cb: Void, ms: number) {
  const id = useRef<Maybe<number>>(undefined);

  useEffect(() => {
    id.current = window.setInterval(cb, ms);
    return () => window.clearInterval(id.current);
  }, [cb, ms]);
}
