import { Container, Typography } from "@mui/material";
import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { Article, ArticleProps } from "@/components/Article/Article";
import {
  Pagination,
  PaginationProps,
} from "@/components/UI/Pagination/Pagination";
import { PostCard, PostCardItem } from "src/entities/card/Post";

import {
  sxCardBox,
  sxContainer,
  sxHeaderBox,
  sxPagination,
} from "./Route.Page.style";

type CardItem = PostCardItem & {
  id: string;
};

type RoutePageProps = {
  page: ArticleProps;
  childrenPage: Nullable<{
    nodes: CardItem[];
  }>;
  pagination?: Nullable<PaginationProps>;
  pageNumber?: number;
};

export const RoutePage: FC<RoutePageProps> = ({
  page,
  childrenPage,
  pagination,
  pageNumber,
}) =>
  childrenPage === null ? (
    <Article
      title={page.title}
      blocks={page.blocks}
      href={page.href}
      imageUrl={page.imageUrl}
      isPreview={page.isPreview}
    />
  ) : (
    <Container
      sx={sxContainer}
      component="section"
      maxWidth="md"
      disableGutters>
      <div sx={sxHeaderBox}>
        <Typography align="center" variant="h1" gutterBottom={!!pageNumber}>
          {page.title}
        </Typography>
        {pageNumber && (
          <Typography align="center" variant="overline">
            {pageNumber} страница
          </Typography>
        )}
      </div>
      <div sx={sxCardBox}>
        {childrenPage.nodes.map((item) => (
          <PostCard key={item.id} data={item} />
        ))}
      </div>
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
