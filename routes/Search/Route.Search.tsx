"use client";

import { Container } from "@mui/material";
import classNames from "classnames";
import { FC } from "react";

import { SearchResponseFrontend } from "@/core/elastic/search/type";
import { UAPlatform } from "@/helpers/backend";
import {
  SearchFilters,
  SearchForm,
  SearchInput,
  SearchSuggestion,
} from "@/components/Search/components";
import { InputProvider } from "@/components/Search/components/Input/context";
import { SearchPagination } from "@/components/Search/components/Pagination/Search.Pagination";
import { SuggestionProvider } from "@/components/Search/components/Suggestion/context";
import { useQuerySearch } from "@/components/Search/utils/hooks";

import { SearchAside } from "./Aside/Search.Aside";
import { SearchResultList } from "./Result/Search.ResultList";
import classes from "./Route.Search.module.css";

export type RouteSearchProps = {
  ssrData: SearchResponseFrontend;
  platform: UAPlatform;
};

export const RouteSearch: FC<RouteSearchProps> = ({ ssrData, platform }) => {
  const { data, isLoading } = useQuerySearch(ssrData);

  return (
    <Container maxWidth="xl" sx={{ marginTop: "2em" }}>
      <InputProvider>
        <SuggestionProvider>
          <SearchForm>
            <SearchInput autoFocus />
            <SearchSuggestion />
          </SearchForm>
        </SuggestionProvider>
      </InputProvider>

      <div className={classNames(classes.body, classes[`body_${platform}`])}>
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
        <div>
          <div
            className={classNames(classes.result, {
              [classes["result--loading"]]: isLoading,
            })}>
            <SearchResultList data={data?.hits} />
          </div>

          {data && data.hits.hits.length > 0 && (
            <SearchPagination
              count={data.hits.total.value}
              className={classes.Pagination}
            />
          )}
        </div>
      </div>
    </Container>
  );
};
