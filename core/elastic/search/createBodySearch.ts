// eslint-disable-next-line import/no-unresolved
import { SearchRequest } from "@elastic/elasticsearch/api/types";

import { SEARCH_HIT_SIZE } from "../../../constants";
import { Nullable } from "../../../helpers/typings/utility-types";

import * as aggs from "./queryBlock/aggs";
import { highlight } from "./queryBlock/highlight";
import { rangeDate as rangeDateFn, RangeDate } from "./queryBlock/rangeDate";
import { textSearch } from "./queryBlock/textSearch";

export const createBodySearch = (
  text: Nullable<string>,
  reverseLanguageText: string,
  departments: Nullable<string[]>,
  categories: Nullable<string[]>,
  page: number,
  rangeDate: RangeDate,
): SearchRequest["body"] => {
  const isSize = !!(text || departments || categories);
  const isDate = rangeDate.gt || rangeDate.gte || rangeDate.lt || rangeDate.lte;

  const filter = [];
  if (departments) {
    filter.push({ terms: { "departments.name.raw": departments } });
  }
  if (categories) {
    filter.push({ terms: { "categories.name.raw": categories } });
  }
  if (isDate) {
    filter.push(rangeDateFn(rangeDate));
  }

  return {
    from: page * SEARCH_HIT_SIZE,
    size: isSize ? SEARCH_HIT_SIZE : 0,
    query: {
      bool: {
        ...(text && {
          should: [
            textSearch(text, "query_rus"),
            textSearch(reverseLanguageText, "query_eng"),
          ],
        }),
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
                ...(text && {
                  should: [
                    textSearch(text, "query_rus"),
                    textSearch(reverseLanguageText, "query_eng"),
                  ],
                }),
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
                ...(text && {
                  should: [
                    textSearch(text, "query_rus"),
                    textSearch(reverseLanguageText, "query_eng"),
                  ],
                }),
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
