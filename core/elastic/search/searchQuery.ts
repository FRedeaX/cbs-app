import { SearchParams } from "../../../components/Search/utils/type";
import { esClient } from "../../../lib/elastic/client";
import { createBodySearch } from "./createBodySearch";
import {
  SearchHits,
  SearchResponseBackend,
  SearchResponseFrontend,
} from "./type";
import { convertAggregationsToObject } from "./utility/convertAggregationsToObject";

export const searchQuery = async (
  query: SearchParams,
): Promise<SearchResponseFrontend> => {
  const data = await esClient.search<SearchHits>({
    index: process.env.ES_INDEX_NAME,
    body: createBodySearch(query),
  });

  if (data.statusCode !== 200)
    throw new Error(`statusCode: ${data.statusCode} message: ${data.warnings}`);

  const result = convertAggregationsToObject(
    data.body as SearchResponseBackend,
  );

  return result;
};
