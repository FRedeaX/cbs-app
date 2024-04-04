"use client";

import { useCallback, useEffect, useState } from "react";

import { isFront } from "../../isFront";

/**
 * Вычисляет положение прокрутки.
 */
const getClientScroll = () =>
  window.scrollY || window.pageYOffset || document.body.scrollTop;

/**
 * Провоцирует перерисовку при прокрутке окна и возвращает положение прокрутки.
 */
export const useClientScroll = () => {
  const [clientScroll, setClientScroll] = useState<number | undefined>(
    isFront ? getClientScroll() : undefined,
  );

  const recalculateScroll = useCallback(() => {
    setClientScroll(getClientScroll());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", recalculateScroll);

    return () => {
      window.removeEventListener("scroll", recalculateScroll);
    };
  }, [recalculateScroll]);

  return clientScroll;
};
