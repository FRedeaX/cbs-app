import { MutableRefObject, createContext } from "react";

import { Nullable, Void } from "../../../../../helpers/typings/utility-types";

export type InputRef = Nullable<HTMLInputElement>;

export type InputValue = string;
type HandleSetValue = (value: InputValue) => void;

export type InputIsFocus = boolean;

type Context = {
  ref: MutableRefObject<InputRef>;
  value: InputValue;
  setValue: HandleSetValue;

  /**
   * Состояние фокуса на поле ввода.
   */
  isFocus: InputIsFocus;

  /**
   * Меняет состояние на сфокусированное.
   */
  handleSetFocus: Void;

  /**
   * Меняет состояние на расфокусированное.
   */
  handleRemoveFocus: Void;
};

export const InputContext = createContext<Nullable<Context>>(null);
