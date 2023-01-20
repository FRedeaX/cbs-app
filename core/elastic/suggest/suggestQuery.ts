import { ApiError } from "next/dist/server/api-utils";

import { esClient } from "../../../lib/elastic/client";
import { reverseKeyboard } from "../../reverseKeyboard";
import { createBodySuggest } from "./createBodySuggest";
import {
  SuggestApiResponse,
  SuggestQueryParams,
  SuggestResponseData,
  SuggestSource,
} from "./type";
import { getHighlight } from "./utility/getHighlight";

export const suggestQuery = async ({
  text,
}: SuggestQueryParams): Promise<SuggestResponseData> => {
  const textTrim = text.trim();
  const reverseLanguageText = reverseKeyboard(textTrim, "EngToRus");

  const data = (await esClient.search<SuggestSource>({
    index: process.env.ES_INDEX_NAME,
    body: createBodySuggest(textTrim, reverseLanguageText),
  })) as SuggestApiResponse;

  if (data.statusCode !== 200)
    throw new ApiError(data.statusCode ?? 500, `${data.warnings}`);

  const hits = getHighlight(data.body.hits.hits, textTrim);

  return {
    ...data.body,
    hits: {
      ...data.body.hits,
      hits,
    },
  };
};
