import { SearchParams } from "../../components/Search/utils/type";
import { esClient } from "../../core/elastic-client";
import { convertAggregationsToObject } from "./convertAggregationsToObject";
import { createBodyRequest } from "./createBodyRequest";
import {
  SearchHits,
  SearchResponseBackend,
  SearchResponseFrontend,
} from "./type";

export const searchQuery = async (
  query: SearchParams,
): Promise<SearchResponseFrontend> => {
  const data = await esClient
    .search<SearchHits>({
      index: process.env.ES_INDEX_NAME,
      body: createBodyRequest(query),
    })
    .then((result) => {
      if (result.statusCode !== 200) {
        throw new Error(`statusCode: ${result.statusCode}`);
      }
      return result.body as SearchResponseBackend;
    })
    .then((result) => convertAggregationsToObject(result));
  return data;
};
