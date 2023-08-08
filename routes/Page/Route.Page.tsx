import { Box, Container, Typography } from "@mui/material";
import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { Article, ArticleProps } from "@/components/Article/Article";
import { SEO } from "@/components/SEO/SEO";
import {
  Pagination,
  PaginationProps,
} from "@/components/UI/Pagination/Pagination";
import { IData } from "@/components/Widget/Card/Card";
import CardListUngrouped from "@/components/Widget/Card/CardListUngrouped/CardListUngrouped";

import {
  sxCardBox,
  sxContainer,
  sxHeaderBox,
  sxPagination,
} from "./Route.Page.style";

type RoutePageProps = {
  page: ArticleProps;
  childrenPage: Nullable<{
    nodes: IData[];
  }>;
  pagination?: Nullable<PaginationProps>;
  pageNumber?: number;
  isPreview?: boolean;
};

export const RoutePage: FC<RoutePageProps> = ({
  page,
  childrenPage,
  pagination,
  pageNumber,
  isPreview,
}) =>
  childrenPage === null ? (
    <Article
      title={page.title}
      blocks={page.blocks}
      href={page.href}
      isPreview={isPreview}
    />
  ) : (
    <Container
      sx={sxContainer}
      component="section"
      maxWidth="md"
      disableGutters>
      {pageNumber && <SEO title={`${page.title} — Cтраница ${pageNumber}`} />}
      <Box sx={sxHeaderBox}>
        <Typography align="center" variant="h1" gutterBottom={!!pageNumber}>
          {page.title}
        </Typography>
        {pageNumber && (
          <Typography align="center" variant="overline">
            {pageNumber} страница
          </Typography>
        )}
      </Box>
      <Box sx={sxCardBox}>
        <CardListUngrouped nodes={childrenPage.nodes} isHorizontal />
      </Box>
      {pagination && (
        <Pagination
          sx={sxPagination}
          count={pagination.count}
          uri={pagination.uri}
          page={pageNumber}
        />
      )}
    </Container>
  );
