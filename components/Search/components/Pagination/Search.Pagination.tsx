import { Pagination } from "@mui/material";
import { FC } from "react";

import { usePagination } from "../../utils/hooks";

export const SEARCH_HIT_SIZE = 10;

type SearchPaginationProps = {
  count: number;
  className?: string;
};

export const SearchPagination: FC<SearchPaginationProps> = ({
  count,
  className,
}) => {
  const { page, handleChange } = usePagination();

  if (count <= SEARCH_HIT_SIZE) return null;

  return (
    <Pagination
      count={Math.ceil(count / SEARCH_HIT_SIZE)}
      page={page}
      shape="rounded"
      className={className}
      onChange={handleChange}
    />
  );
};
