import { Box, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { RouteContainer } from "../../components/RouteContainer/RouteContainer";
import {
  SearchFilters,
  SearchForm,
  SearchInput,
  Suggestion,
} from "../../components/Search/components";
import { SearchPagination } from "../../components/Search/components/Pagination/Search.Pagination";
import { useQuerySearch } from "../../components/Search/utils/hooks";
import { SearchResponseFrontend } from "../../core/elastic/search/type";
import { SearchAside, UAPlatform } from "./Aside/Search.Aside";
import { SearchResultList } from "./Result/Search.ResultList";
import classes from "./Route.Search.module.css";

export type RouteSearchProps = {
  ssrData: SearchResponseFrontend;
} & UAPlatform;

// eslint-disable-next-line arrow-body-style
export const RouteSearch: FC<RouteSearchProps> = ({ ssrData, platform }) => {
  const { data, isLoading } = useQuerySearch(ssrData);
  const isHorizontal = useMediaQuery("(min-width: 1100px)");

  console.log(data);

  return (
    <RouteContainer className={classes.root}>
      <SearchForm>
        <SearchInput />
        <Suggestion />
      </SearchForm>

      <Box className={classes.body}>
        <SearchAside
          className={classes.Aside}
          count={data?.hits.hits.length && data?.hits.total.value}
          platform={platform}>
          <SearchFilters
            legend="Филиал (отдел)"
            name="departments"
            nodes={data?.aggregations.departments.facet.departments.buckets}
            facet={data?.aggregations.facets.departments.buckets}
          />
          <SearchFilters
            legend="Категория"
            name="categories"
            nodes={data?.aggregations.categories.facet.categories.buckets}
            facet={data?.aggregations.facets.categories.buckets}
          />
        </SearchAside>
        <Box>
          <Box
            className={classNames(classes.result, {
              [classes["result--loading"]]: isLoading,
            })}>
            <SearchResultList data={data?.hits} isHorizontal={isHorizontal} />
          </Box>

          {data && data.hits.hits.length > 0 && (
            <SearchPagination
              count={data.hits.total.value}
              className={classes.Pagination}
            />
          )}
        </Box>
      </Box>
    </RouteContainer>
  );
};
