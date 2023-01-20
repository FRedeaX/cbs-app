import { useContext } from "react";

import { InputContext } from "./Input.Context";

export * from "./Input.Provider";

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (context === undefined || context === null) {
    throw new Error("useInputContext must be used within a InputProvider");
  }
  return context;
};
