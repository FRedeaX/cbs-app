import { Maybe, Nullable } from "../../../../../helpers/typings/utility-types";
import { FilterList } from "./type";

export const fill = (
  filter: Maybe<string | string[]>,
): Nullable<FilterList> => {
  if (typeof filter !== "string") return null;

  return filter.split(",").reduce((acc: FilterList, current) => {
    acc[current] = true;
    return acc;
  }, {});
};
