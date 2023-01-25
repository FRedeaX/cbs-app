import { Nullable } from "../../../../../helpers/typings/utility-types";
import { FilterList } from "./type";

/**
 * Извлекает из объекта ключи и возвращает строку.
 */
export const getFilterStringFromList = (list: Nullable<FilterList>): string =>
  Object.keys(list ?? {}).join();
