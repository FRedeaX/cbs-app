import { useEffect, useRef } from "react";

import { useClientScroll } from "../../../helpers/frontend/hooks";

export const useHeaderScroll = () => {
  const currentScroll = useClientScroll();
  const prevScrollYRef = useRef(0);
  const isHeaderVisibleRef = useRef(false);

  useEffect(() => {
    if (currentScroll === undefined) return;
    const prevScrollY = prevScrollYRef.current;
    const isHeaderVisible = isHeaderVisibleRef.current;

    if (currentScroll > 80 && prevScrollY < currentScroll && isHeaderVisible) {
      // Скрываем
      document.body.style.setProperty("--is-header-fixed", "0");
      isHeaderVisibleRef.current = false;
    } else if (
      currentScroll === 0 ||
      (prevScrollY > currentScroll && !isHeaderVisible)
    ) {
      // Показываем
      document.body.style.setProperty("--is-header-fixed", "1");
      isHeaderVisibleRef.current = true;
    }
    prevScrollYRef.current = currentScroll;
  }, [currentScroll]);
};
