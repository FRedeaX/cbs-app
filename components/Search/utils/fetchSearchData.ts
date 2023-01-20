import { Maybe } from "../../../helpers/typings/utility-types";
import { createSearchLink } from "./createSearchLink";

export type FetchSearchData = {
  pathname: string;
};

export const fetchSearchData = async <Data = unknown>({
  pathname,
  ...queryKey
}: FetchSearchData & { [key: string]: Maybe<string> }): Promise<Data> => {
  const response = await fetch(createSearchLink(queryKey, pathname));
  if (!response.ok) throw new Error("Network response error");

  return response.json();
};
