import { Nullable } from "../../../helpers/typings/utility-types";
import { FilterList } from "./type";

export const getFilterStringFromList = (list: Nullable<FilterList>): string =>
  Object.keys(list ?? {}).join();
