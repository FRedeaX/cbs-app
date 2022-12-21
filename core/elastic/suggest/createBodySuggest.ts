import { SearchRequest } from "@elastic/elasticsearch/api/types";

import { fuzzy } from "./queryBlock/fuzzy";
import { match } from "./queryBlock/match";

export const createBodySuggest = (
  text: string,
  reverseLanguageText: string,
): SearchRequest["body"] => ({
  query: {
    bool: {
      should: [
        match("title", text, "title_rus"),
        match("title", reverseLanguageText, "title_eng"),
        fuzzy("title", text, "title_rus"),
        fuzzy("title", reverseLanguageText, "title_eng"),
      ],
    },
  },
  _source: ["title"],
});
