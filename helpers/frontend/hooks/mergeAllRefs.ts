import { MutableRefObject, Ref } from "react";

import { Maybe, Nullable } from "../../typings/utility-types";

export function mergeAllRefs<TElement extends HTMLElement>(
  ...refs: Maybe<Ref<TElement>>[]
) {
  return (node: Nullable<TElement>) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<Nullable<TElement>>).current = node;
      }
    });
  };
}
