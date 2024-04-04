"use client";

import { useCallback, useState } from "react";

import { Void } from "../../typings/utility-types";

/**
 * @param initialState false
 */
export const useToggle = (
  initialState = false,
): [boolean, Void, { setTrue: Void; setFalse: Void }] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback<Void>(() => {
    setState((prev) => !prev);
  }, []);

  const setTrue = useCallback<Void>(() => {
    setState(true);
  }, []);

  const onClose = useCallback<Void>(() => {
    setState(false);
  }, []);

  return [state, toggle, { setTrue, setFalse: onClose }];
};
