/* eslint-disable react/jsx-props-no-spreading */
import {
  Pagination as MUIPagination,
  PaginationProps as MUIPaginationProps,
  PaginationItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

import { Link } from "../Link/Link";

export type PaginationProps = {
  uri: string;
} & Omit<MUIPaginationProps, "page" | "renderItem">;

export const Pagination: FC<PaginationProps> = ({ count, uri, ...props }) => {
  const {
    query: { page },
  } = useRouter();
  const currentPage = (typeof page === "string" && parseInt(page, 10)) || 1;

  return (
    <MUIPagination
      count={count}
      page={currentPage}
      siblingCount={currentPage >= 5 ? 2 : 1}
      shape="rounded"
      {...props}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={item.page === 1 ? `${uri}` : `${uri}/page/${item.page}`}
          {...item}
        />
      )}
    />
  );
};
