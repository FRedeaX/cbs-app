/* eslint-disable no-console */
import { useCallback, useState } from "react";
import { API_ES_KEY, API_ES_URL } from "../../config/constants";

interface IData {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: string;
    };
    max_score: number;
    hits: Array<{
      _index: string;
      _type: string;
      _id: number;
      _score: number;
      _source: {
        post_title: string;
        post_excerpt: string;
        permalink: string;
        thumbnail: { src: string };
      };
    } | null>;
  };
}

const useSearch = () => {
  const [data, setData] = useState<IData>();

  const fetchData = useCallback(async (query: string): Promise<void> => {
    const body = JSON.stringify({
      query: {
        multi_match: {
          query,
          fields: ["post_title", "post_excerpt", "post_content"],
        },
      },
      _source: ["post_title", "post_excerpt", "permalink", "thumbnail.src"],
    });

    await fetch(API_ES_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_ES_KEY,
      },
      body,
    })
      .then((response: Response) => response.json())
      .then((result) => setData(result))
      .catch((error: Error) => console.error(error));
  }, []);

  return { fetchData, data };
};

export default useSearch;
