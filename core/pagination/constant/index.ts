type Pagination = {
  number: number;
  cursor: string;
  tags: number[];
};

export const initialPagination: Pagination = {
  number: 1,
  cursor: "",
  tags: [],
};
