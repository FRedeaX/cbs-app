import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

import { fetchSearchData } from "..";
import { SearchResponseFrontend } from "../../../../lib/elastic/type";
import { SearchParams } from "../type";

export const useSearch = (ssrData: SearchResponseFrontend) => {
  const { text, categories, departments, page } = useRouter()
    .query as SearchParams;
  const [state, setState] = useState<SearchResponseFrontend>(ssrData);

  const textSearch = text?.trim() ?? "";
  const isLongEnough = !!(
    departments ||
    categories ||
    page ||
    (!departments && !categories && !page && state.hits.hits.length > 0)
  );

  const { data, isValidating } = useSWR(
    isLongEnough
      ? {
          apiUrl: process.env.NEXT_PUBLIC_API_ES_URL,
          text: textSearch,
          categories,
          departments,
          page,
        }
      : null,
    fetchSearchData,
    {
      fallbackData: state,
      onSuccess: (_data) => setState(isLongEnough ? _data : ssrData),
    },
  );
  // const [data, setData] = useState(undefined);
  // useEffect(() => {
  //   fetchSearchData({
  //     apiUrl: process.env.NEXT_PUBLIC_API_ES_URL,
  //     text: textSearch,
  //     categories,
  //     departments,
  //   }).then((d) => setData(d));
  // }, [categories, departments, textSearch]);

  return { data, isLoading: isValidating };
};
