import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useDebounce } from "../../helpers/frontend/hooks/useDebounce";
import { fetchSuggestData } from "./Search.utils";

const useSearch = () => {
  const [searchString, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(searchString, 150);

  const query = debouncedSearch.trim();
  const isLongEnough = query.length > 0;
  const { data, isLoading } = useQuery(
    ["search", debouncedSearch],
    fetchSuggestData,
    {
      enabled: isLongEnough,
    },
  );

  return { search: setSearch, data, isLoading: isLongEnough && isLoading };
};

export default useSearch;
