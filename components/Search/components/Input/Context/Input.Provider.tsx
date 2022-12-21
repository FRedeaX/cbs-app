import { useRouter } from "next/router";
import { FC, ReactNode, useMemo, useState } from "react";

import { fillInput } from "../../../utils/fill.Input";
import { InputContext, InputValue } from "./Input.Context";

export const InputProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { query } = useRouter();
  const [value, setValue] = useState<InputValue>(fillInput(query.text));

  const contextValue = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value],
  );

  return (
    <InputContext.Provider value={contextValue}>
      {children}
    </InputContext.Provider>
  );
};
