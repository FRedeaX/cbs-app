import { useCallback, useState } from "react";

import { Void } from "../../typings/utility-types";

export const useToggle = (initialState = false): [boolean, Void] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback<Void>(() => setState((prev) => !prev), []);
  return [state, toggle];
};
