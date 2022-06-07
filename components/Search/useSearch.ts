/* eslint-disable no-console */
import { useCallback, useState } from "react";
import { ISearchResponse } from "../../lib/elastic";

const useSearch = () => {
  const [data, setData] = useState<ISearchResponse | null>();

  const suggestData = useCallback(async (query: string): Promise<void> => {
    const q = query.trim();
    if (q.length === 0) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_ES_URL}?query=${q}`)
      .then((response: Response) => response.json())
      .then((result) => {
        setData(result);
      })
      .catch((error: Error) => console.error(error));
  }, []);

  const resetData = useCallback(() => {
    setData(null);
  }, [setData]);

  return { suggestData, resetData, data };
};

export default useSearch;
