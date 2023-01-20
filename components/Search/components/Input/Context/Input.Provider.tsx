import { useRouter } from "next/router";
import { FC, ReactNode, useCallback, useMemo, useRef, useState } from "react";

import { fill } from "../utils/fill";
import {
  InputContext,
  InputIsFocus,
  InputRef,
  InputValue,
} from "./Input.Context";

export const InputProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<InputRef>(null);
  const { query } = useRouter();
  const [value, setValue] = useState<InputValue>(fill(query.text));
  const [isFocus, setFocus] = useState<InputIsFocus>(false);

  const handleSetFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const handleRemoveFocus = useCallback(() => {
    setFocus(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      ref,
      value,
      setValue,
      isFocus,
      handleSetFocus,
      handleRemoveFocus,
    }),
    [value, isFocus, handleSetFocus, handleRemoveFocus],
  );

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  );
};
