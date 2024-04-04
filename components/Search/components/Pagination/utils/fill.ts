import { MaybeOrNullable } from "@/helpers/typings/utility-types";

export const fill = (page: MaybeOrNullable<string | string[]>): number =>
  typeof page === "string" ? parseInt(page, 10) : 1;
