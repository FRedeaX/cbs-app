export interface ISearchParams {
  text: string;
  category?: string;
}

export interface IFilterList {
  [name: string]: boolean;
}
