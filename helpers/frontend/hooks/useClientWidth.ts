import { useCallback, useEffect, useState } from "react";

import { isFront } from "../../isFront";

/**
 * Вычисляет высоту вьюпорта
 */
const getClientWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

/**
 * Провоцирует перерисовку при ресайзе окна и возвращает высоту вьюпорта
 */
export const useClientWidth = () => {
  const [clientWidth, setClientWidth] = useState<number | undefined>(
    isFront ? getClientWidth() : undefined,
  );

  const recalculateWidth = useCallback(
    () => setClientWidth(getClientWidth()),
    [],
  );

  useEffect(() => {
    window.addEventListener("resize", recalculateWidth);

    return () => {
      window.removeEventListener("resize", recalculateWidth);
    };
  }, [recalculateWidth]);

  return clientWidth;
};
