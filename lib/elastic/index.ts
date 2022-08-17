export interface ISearchHitsNode {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  highlight: {
    content: Array<string>;
    title: Array<string>;
    "title.text": Array<string>;
  };
  _source: {
    title: string;
    excerpt?: string;
    link: string;
    thumbnail: { url: string };
  };
}

export interface IBucketsAggregations {
  key: string;
  doc_count: number;
}

export interface ISearchResponse {
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
    hits: Array<ISearchHitsNode> | [];
  };
  aggregations: {
    category: {
      doc_count_error_upper_bound: number;
      sum_other_doc_count: number;
      buckets: Array<IBucketsAggregations>;
    };
  };
}
