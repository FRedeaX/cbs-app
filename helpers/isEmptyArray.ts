import { Maybe, Nullable } from "./typings/utility-types";

export const isEmptyArray = <T>(array: Maybe<Nullable<T[]>>): boolean =>
  !array?.length;
