import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchSearchData } from "..";
import { useDebounce } from "../../../../helpers/frontend/hooks";
import { ISearchParams } from "../type";

export const useSearch = () => {
  const [{ text, category }, setSearch] = useState<ISearchParams>({ text: "" });

  const debouncedSearch = useDebounce<string>(text, 0);

  const textSearch = debouncedSearch.trim();
  const isLongEnough = textSearch.length > 0;
  const { data, isLoading } = useQuery(
    ["search", { text: textSearch, category }],
    fetchSearchData,
    {
      enabled: isLongEnough,
    },
  );

  return { search: setSearch, data, isLoading: isLongEnough && isLoading };
};
