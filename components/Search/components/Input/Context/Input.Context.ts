import { createContext } from "react";

import { noop } from "../../../../../helpers";

export type InputValue = string;
type HendleSetValue = (value: InputValue) => void;

type Context = {
  value: InputValue;
  setValue: HendleSetValue;
};

export const InputContext = createContext<Context>({
  value: "",
  setValue: noop,
});
