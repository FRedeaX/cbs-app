import { SearchRequest } from "@elastic/elasticsearch/api/types";

import { SearchParams } from "../../components/Search/Search.utils/type";
import { SEARCH_HIT_SIZE } from "../../components/Search/components/Pagination/Search.Pagination";
import * as aggs from "./aggs";
import { highlight } from "./highlight";

export const createBodyRequest = (
  query: SearchParams,
): SearchRequest["body"] => {
  const text = typeof query.text === "string" ? query.text : null;
  const departments = query.departments?.split(",") ?? null;
  const categories = query.categories?.split(",") ?? null;
  const page = parseInt(query.page ?? "1", 10) - 1;

  const isSize = !!(text || departments || categories);

  return {
    from: page * SEARCH_HIT_SIZE,
    size: isSize ? SEARCH_HIT_SIZE : 0,
    suggest: {
      gotsuggest: {
        text: query.text ?? "",
        term: { field: "title.text" },
      },
    },
    query: {
      bool: {
        ...(text && {
          must: {
            multi_match: {
              query: text,
              // analyzer: "rus_eng_key_analyzer",
              fields: ["title.text", "title", "content"],
            },
          },
        }),
        ...(departments && {
          filter: [
            {
              terms: { "departments.name.raw": departments },
            },
          ],
        }),
      },
    },
    ...(categories && {
      post_filter: {
        terms: { "categories.name.raw": categories },
      },
    }),
    highlight,
    aggs: {
      all: {
        global: {},
        aggs: {
          keyword: {
            filter: {
              bool: {
                ...(text && {
                  must: {
                    multi_match: {
                      query: text,
                      // analyzer: "rus_eng_key_analyzer",
                      fields: ["title.text", "title", "content"],
                    },
                  },
                }),
              },
            },
            aggs: {
              departments: aggs.departments,
            },
          },
        },
      },
      categories: aggs.categories,
      facets: {
        global: {},
        aggs: {
          departments: aggs.departments,
          categories: aggs.categories,
        },
      },
    },
    _source: [
      "title",
      "excerpt",
      "link",
      "thumbnail",
      "categories",
      "departments",
    ],
  };
};
