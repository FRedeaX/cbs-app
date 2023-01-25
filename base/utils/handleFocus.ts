import { MutableRefObject } from "react";

import { delay } from "../../helpers";
import { Maybe, Nullable } from "../../helpers/typings/utility-types";

/**
 * Устанавливает фокус.
 *
 * @param ref ссылка на `HTMLElement`
 */
export const handleFocus = (
  ref:
    | ((instance: HTMLElement | null) => void)
    | Nullable<MutableRefObject<Maybe<Nullable<HTMLElement>>>>,
) => {
  if (typeof ref !== "object") return;
  delay(0).then(() => {
    ref?.current?.focus();
  });
};
