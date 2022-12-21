import { ApiError } from "next/dist/server/api-utils";

import { esClient } from "../../../lib/elastic/client";
import { reverseKeyboard } from "../../reverseKeyboard";
import { createBodySuggest } from "./createBodySuggest";
import { SuggestQueryParams, SuggestResponseData, SuggestSource } from "./type";

export const suggestQuery = async ({
  text,
}: SuggestQueryParams): Promise<SuggestResponseData> => {
  const reverseLanguageText = reverseKeyboard(text, "EngToRus");

  const data = await esClient.search<SuggestSource>({
    index: process.env.ES_INDEX_NAME,
    body: createBodySuggest(text, reverseLanguageText),
  });

  if (data.statusCode !== 200)
    throw new ApiError(data.statusCode ?? 500, `${data.warnings}`);

  return data.body;
};
