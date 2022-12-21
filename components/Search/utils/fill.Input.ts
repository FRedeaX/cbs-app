import { Maybe } from "../../../helpers/typings/utility-types";

export const fillInput = (text: Maybe<string | string[]>): string =>
  typeof text === "string" ? text : "";
