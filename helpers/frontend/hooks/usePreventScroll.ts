import { RefObject, useEffect } from "react";

import { scrollLocker } from "../..";

type usePreventScrollProps = {
  /**
   * Включает/отключает прокрутку у элемента.
   */
  enabled: boolean;

  /**
   * Ссылка на DOM-элемент, у которого нужно заблокировать прокрутку.
   *
   * @default document.body
   */
  containerRef?: RefObject<HTMLElement>;
};

/**
 * Реакт-хук, запрещающий прокрутку содержимого на элементе.
 */
export const usePreventScroll = ({
  enabled,
  containerRef,
}: usePreventScrollProps) => {
  useEffect(() => {
    const container = containerRef ? containerRef.current : null;

    if (enabled) {
      scrollLocker.lock(container);
    } else {
      scrollLocker.unlock(container);
    }

    return () => {
      scrollLocker.unlock(container);
    };
  }, [containerRef, enabled]);
};
