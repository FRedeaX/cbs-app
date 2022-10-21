import { Nullable } from "../../../helpers/typings/utility-types";
import { IFilterList } from "./type";

export const getFilterStringFromList = (list: Nullable<IFilterList>): string =>
  Object.keys(list ?? {}).join();
