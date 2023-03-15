import { useEffect, useRef } from "react";

import { useClientScroll } from "../../../helpers/frontend/hooks";

export const useHeaderScroll = () => {
  const currentScroll = useClientScroll();
  const prevScrollYRef = useRef(0);
  const isHeaderHiddenRef = useRef(false);

  useEffect(() => {
    if (currentScroll === undefined) return;
    const prevScrollY = prevScrollYRef.current;
    const isHeaderHidden = isHeaderHiddenRef.current;

    if (
      currentScroll > 80 &&
      prevScrollY !== 0 &&
      prevScrollY < currentScroll &&
      !isHeaderHidden
    ) {
      // Скрываем
      document.body.style.setProperty("--is-header-fixed", "0");
      isHeaderHiddenRef.current = !isHeaderHidden;
    } else if (
      (currentScroll === 0 || prevScrollY > currentScroll) &&
      isHeaderHiddenRef.current
    ) {
      // Показываем
      document.body.style.setProperty("--is-header-fixed", "1");
      isHeaderHiddenRef.current = !isHeaderHidden;
    }
    prevScrollYRef.current = currentScroll;
  }, [currentScroll]);
};
