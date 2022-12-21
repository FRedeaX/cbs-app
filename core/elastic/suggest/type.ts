import { SearchResponse } from "@elastic/elasticsearch/api/types";

import { Omit } from "../../../helpers/typings/utility-types";
import { SearchSource } from "../search/type";

export type SuggestQueryParams = {
  text: string;
};

export type SuggestSource = Omit<
  SearchSource,
  "excerpt" | "categories" | "departments"
>;

export type SuggestResponseData = SearchResponse<SuggestSource>;

// export type SuggestResponseData = {
//   title: [SearchCompletionSuggest<SuggestSource>];
// };

// export type Suggest = SearchSuggest<SuggestSource>[];
