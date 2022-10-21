import { MutableRefObject, Ref, RefCallback, useMemo } from "react";

import { Maybe, Nullable } from "../../typings/utility-types";

const setRef = <T>(
  ref:
    | MutableRefObject<Nullable<T>>
    | ((instance: Nullable<T>) => void)
    | null
    | undefined,
  value: Nullable<T>,
): void => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
};

export const useForkRef = <Instance>(
  ...refs: Array<Maybe<Ref<Instance>>>
): Nullable<RefCallback<Instance>> =>
  useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, [refs]);
