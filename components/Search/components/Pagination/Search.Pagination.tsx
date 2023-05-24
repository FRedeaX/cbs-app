import { Pagination } from "@mui/material";
import { FC } from "react";

import { SEARCH_HIT_SIZE } from "../../../../constants";
import { usePagination } from "./utils/usePagination";

type SearchPaginationProps = {
  count: number;
  className?: string;
};

export const SearchPagination: FC<SearchPaginationProps> = ({
  /**
   * Количество результатов.
   */
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
