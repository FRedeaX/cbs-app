import { Box, Typography } from "@mui/material";
import { FC } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import {
  Pagination,
  PaginationProps,
} from "@/components/UI/Pagination/Pagination";
import { IData } from "@/components/Widget/Card/Card";
import CardList from "@/components/Widget/Card/CardList";

import { sxPagination, sxSection, sxTitle } from "./style/page.style";

type HomePageProps = {
  posts: Nullable<IData[]>;
  pagination?: Nullable<PaginationProps>;
  categoryName?: string;
};

export const HomePage: FC<HomePageProps> = ({
  posts,
  pagination,
  categoryName,
}) =>
  posts && posts.length ? (
    <Box sx={sxSection} component="section">
      <Typography sx={sxTitle} variant="sectionTitle">
        {categoryName === undefined
          ? "Мероприятия"
          : `Категория: ${categoryName}`}
      </Typography>
      <CardList
        nodes={posts}
        isGroupCards={!categoryName}
        isHorizontal={!!categoryName}
      />
      {pagination && (
        <Pagination
          sx={sxPagination}
          count={pagination.count}
          uri={pagination.uri}
          firstPageLink="/"
        />
      )}
    </Box>
  ) : null;
