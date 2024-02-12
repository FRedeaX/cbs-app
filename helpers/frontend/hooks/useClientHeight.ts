"use client";

import { useCallback, useEffect, useState } from "react";

import { isFront } from "../../isFront";

/**
 * Вычисляет высоту вьюпорта
 */
const getClientHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

/**
 * Провоцирует перерисовку при ресайзе окна и возвращает высоту вьюпорта
 */
export const useClientHeight = () => {
  const [clientHeight, setClientHeight] = useState<number | undefined>(
    isFront ? getClientHeight() : undefined,
  );

  const recalculateHeight = useCallback(
    () => setClientHeight(getClientHeight()),
    [],
  );

  useEffect(() => {
    window.addEventListener("resize", recalculateHeight);

    return () => {
      window.removeEventListener("resize", recalculateHeight);
    };
  }, [recalculateHeight]);

  return clientHeight;
};
