export interface ISearchHitsNode {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  highlight: {
    content: Array<string>;
    title: Array<string>;
  };
  _source: {
    title: string;
    excerpt?: string;
    link: string;
    thumbnail: { url: string };
  };
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
}
