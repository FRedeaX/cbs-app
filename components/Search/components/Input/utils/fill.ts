import { Maybe } from "../../../../../helpers/typings/utility-types";

export const fill = (text: Maybe<string | string[]>): string =>
  typeof text === "string" ? text : "";
