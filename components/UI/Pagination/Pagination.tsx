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
  /**
   * Альтернативный путь к 1 странице.
   */
  firstPageLink?: string;
} & Omit<MUIPaginationProps, "renderItem">;

export const Pagination: FC<PaginationProps> = ({
  count,
  uri,
  firstPageLink,
  page,
  ...props
}) => {
  const { query } = useRouter();

  const currentPage =
    page ?? ((typeof query.page === "string" && parseInt(query.page, 10)) || 1);

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
          href={
            item.page === 1
              ? `${firstPageLink ?? uri}`
              : `${uri}/page/${item.page}`
          }
          {...item}
        />
      )}
    />
  );
};
