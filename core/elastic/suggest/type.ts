/* eslint-disable no-underscore-dangle */
import { ApiResponse } from "@elastic/elasticsearch";
import {
  SearchHit,
  SearchHitsMetadata,
  SearchResponse,
} from "@elastic/elasticsearch/api/types";

import { Defaultize, Omit } from "../../../helpers/typings/utility-types";
import { SearchSource } from "../search/type";

export type SuggestQueryParams = {
  text: string;
};

export type SuggestSource = Omit<
  SearchSource,
  "excerpt" | "categories" | "departments"
>;

export type Highlight = [number, number][] | [];

type HighlightRemoved<TDocument> = Omit<SearchHit<TDocument>, "highlight">;
type SourceRequired<TDocument> = Defaultize<
  HighlightRemoved<TDocument>,
  "_source"
>;

export type SuggestHit<TDocument> = {
  highlight: { title: Highlight };
} & SourceRequired<TDocument>;

export type SuggestionList = SuggestHit<SuggestSource>[] &
  HighlightRemoved<SuggestSource>[];

type _SearchHitsMetadata<TDocument> = SearchHitsMetadata<TDocument> & {
  hits: SuggestHit<TDocument>[];
};

type _SearchResponse<TDocument> = SearchResponse<TDocument> & {
  hits: _SearchHitsMetadata<TDocument>;
};

export type SuggestResponseData = _SearchResponse<SuggestSource>;

export type SuggestApiResponse = ApiResponse<SuggestResponseData>;

// export type SuggestResponseData = {
//   title: [SearchCompletionSuggest<SuggestSource>];
// };

// export type Suggest = SearchSuggest<SuggestSource>[];
