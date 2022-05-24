/* eslint-disable no-console */
import { useCallback, useState } from "react";
import { ISearchResponse } from "../../lib/elastic";

const useSearch = () => {
  const [data, setData] = useState<ISearchResponse | null>();

  const fetchData = useCallback(async (query: string): Promise<void> => {
    await fetch(`${window.location.origin}/api/suggest/_search?query=${query}`)
      .then((response: Response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error: Error) => console.error(error));
  }, []);

  const resetData = useCallback(() => {
    setData(null);
  }, [setData]);

  return { fetchData, resetData, data };
};

export default useSearch;
