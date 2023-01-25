import { ChangeEvent, useCallback } from "react";

import { handleFocus } from "../../../../../base/utils/handleFocus";
import { useInputContext } from "../context";

type HandleChange = (event: ChangeEvent<HTMLInputElement>) => void;

export const useInput = () => {
  const { ref, setValue, handleSetFocus } = useInputContext();

  const handleChange = useCallback<HandleChange>(
    ({ target }) => {
      setValue(target.value);
      handleSetFocus();
    },
    [handleSetFocus, setValue],
  );

  /**
   * Возвращает фокус в поле ввода.
   */
  const handleReturnsFocus = useCallback(() => {
    handleFocus(ref);
  }, [ref]);

  /**
   * Очищает и устанавливает фокус в поле ввода.
   */
  const handleReset = useCallback(() => {
    setValue("");
    handleReturnsFocus();
  }, [setValue, handleReturnsFocus]);

  return { ref, handleChange, handleReturnsFocus, handleReset };
};
