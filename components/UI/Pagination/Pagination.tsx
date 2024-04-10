"use client";

/* eslint-disable react/jsx-props-no-spreading */
import {
  Pagination as MUIPagination,
  PaginationProps as MUIPaginationProps,
  PaginationItem,
} from "@mui/material";
import { FC } from "react";

import { Link } from "../Link/Link";

export type PaginationProps = {
  uri: string;
  /**
   * Альтернативный путь к 1 странице.
   * @default uri
   */
  firstPageLink?: string;
} & Omit<MUIPaginationProps, "renderItem">;

export const Pagination: FC<PaginationProps> = ({
  count = 1,
  uri,
  firstPageLink,
  page,
  ...props
}) =>
  count > 1 ? (
    <MUIPagination
      count={count}
      page={page}
      siblingCount={page ?? 1 >= 5 ? 2 : 1}
      hideNextButton={page === count}
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
  ) : null;
