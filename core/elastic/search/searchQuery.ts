import { ApiError } from "next/dist/server/api-utils";

import { esClient } from "../../../lib/elastic/client";
import { reverseKeyboard } from "../../reverseKeyboard";

import { createBodySearch } from "./createBodySearch";
import {
  SearchHits,
  SearchParams,
  SearchResponseBackend,
  SearchResponseFrontend,
} from "./type";
import { convertAggregationsToObject } from "./utility/convertAggregationsToObject";

export const searchQuery = async (
  query: SearchParams,
): Promise<SearchResponseFrontend> => {
  const text = typeof query.text === "string" ? query.text.trim() : null;
  const reverseLanguageText = text ? reverseKeyboard(text, "EngToRus") : "";
  const departments = query.departments?.split(",") ?? null;
  const categories = query.categories?.split(",") ?? null;
  const page = parseInt(query.page ?? "1", 10) - 1;
  const rangeDate = {
    gt: typeof query.gtDate === "string" ? query.gtDate : undefined,
    gte: typeof query.gteDate === "string" ? query.gteDate : undefined,
    lt: typeof query.ltDate === "string" ? query.ltDate : undefined,
    lte: typeof query.lteDate === "string" ? query.lteDate : undefined,
  };

  const data = await esClient.search<SearchHits>({
    index: process.env.ES_INDEX_NAME,
    body: createBodySearch(
      text,
      reverseLanguageText,
      departments,
      categories,
      page,
      rangeDate,
    ),
  });

  if (data.statusCode !== 200)
    throw new ApiError(data.statusCode ?? 500, `${data.warnings}`);

  const result = convertAggregationsToObject(
    data.body as SearchResponseBackend,
  );

  return result;
};
