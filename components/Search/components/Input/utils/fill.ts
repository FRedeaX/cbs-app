import { MaybeOrNullable } from "@/helpers/typings/utility-types";

export const fill = (text: MaybeOrNullable<string | string[]>): string =>
  typeof text === "string" ? text : "";
