import { SearchResponse } from "@elastic/elasticsearch/api/types";

import { Nullable } from "../../helpers/typings/utility-types";

type SearchCategoryNode = {
  name: string;
  slug: string;
};

export type SearchSource = {
  title: string;
  excerpt?: string;
  link: string;
  thumbnail: { url: string };
  categories: SearchCategoryNode[];
  departments: SearchCategoryNode[];
};
export type SearchHitsNode = {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  highlight: {
    content: Array<string>;
    title: Array<string>;
    "title.text": Array<string>;
  };
  _source: SearchSource;
};

type SearchHitsTotal = {
  value: number;
  relation: string;
};

export type SearchHits = {
  total: SearchHitsTotal;
  hits: SearchHitsNode[] | [];
  max_score: number;
};

export type BucketsAggregations = {
  key: string;
  doc_count: number;
}[];

export type ListBucketsAggregations = {
  [key: string]: number;
};

type Aggregation<T> = {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets: T;
};

type Aggregations<TAggs, TFacet> = {
  departments: Aggregation<Nullable<TAggs>>;
  categories: Aggregation<Nullable<TAggs>>;
  facets: {
    doc_count: number;
    departments: Aggregation<TFacet>;
    categories: Aggregation<TFacet>;
  };
};

export type SearchResponseBackend = {
  aggregations: Aggregations<BucketsAggregations, BucketsAggregations>;
} & SearchResponse<SearchHits>;

export type SearchResponseFrontend = {
  aggregations: Aggregations<ListBucketsAggregations, BucketsAggregations>;
  hits: SearchHits;
} & SearchResponse<SearchHits>;
