import { Maybe } from "../../../../../helpers/typings/utility-types";

export const fill = (page: Maybe<string | string[]>): number =>
  typeof page === "string" ? parseInt(page, 10) : 1;
