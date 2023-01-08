export type SearchParams = {
  text?: string;
  categories?: string;
  departments?: string;
  page?: string;
};

export type FilterList = {
  [name: string]: boolean;
};
