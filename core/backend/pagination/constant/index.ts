export type Pagination = {
  number: number;
  cursor: string;
  tags: number[];
};

export const initialPagination = {
  number: 1,
  cursor: "",
  tags: [],
};
