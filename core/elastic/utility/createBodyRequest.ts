import { SearchRequest } from "@elastic/elasticsearch/api/types";

import { SEARCH_HIT_SIZE } from "../../../components/Search/components/Pagination/Search.Pagination";
import { SearchParams } from "../../../components/Search/utils/type";
import * as aggs from "../queryBlock/aggs";
import { highlight } from "../queryBlock/highlight";
import { textSearch } from "../queryBlock/textSearch";

export const createBodyRequest = (
  query: SearchParams,
): SearchRequest["body"] => {
  const text = typeof query.text === "string" ? query.text : null;
  const departments = query.departments?.split(",") ?? null;
  const categories = query.categories?.split(",") ?? null;
  const page = parseInt(query.page ?? "1", 10) - 1;

  const isSize = !!(text || departments || categories);

  const filter = [];
  if (departments)
    filter.push({ terms: { "departments.name.raw": departments } });
  if (categories) filter.push({ terms: { "categories.name.raw": categories } });

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
        ...(text && textSearch(text)),
        ...(filter.length > 0 && {
          filter,
        }),
      },
    },
    highlight,
    aggs: {
      departments: {
        global: {},
        aggs: {
          facet: {
            filter: {
              bool: {
                ...(text && textSearch(text)),
                ...(categories && {
                  filter: {
                    terms: {
                      "categories.name.raw": categories,
                    },
                  },
                }),
              },
            },
            aggs: { departments: aggs.departments },
          },
        },
      },
      categories: {
        global: {},
        aggs: {
          facet: {
            filter: {
              bool: {
                ...(text && textSearch(text)),
                ...(departments && {
                  filter: {
                    terms: {
                      "departments.name.raw": departments,
                    },
                  },
                }),
              },
            },
            aggs: { categories: aggs.categories },
          },
        },
      },
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
