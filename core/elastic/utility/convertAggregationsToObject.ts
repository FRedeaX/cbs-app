import { SearchResponseBackend, SearchResponseFrontend } from "../type";
import { convertArrayToObject } from "./convertArrayToObject";

export const convertAggregationsToObject = (
  data: SearchResponseBackend,
): SearchResponseFrontend =>
  ({
    ...data,
    aggregations: {
      ...data.aggregations,
      departments: {
        ...data.aggregations.departments,
        facet: {
          departments: {
            ...data.aggregations.departments.facet.departments,
            buckets: convertArrayToObject(
              data.aggregations.departments.facet.departments.buckets,
            ),
          },
        },
      },
      categories: {
        ...data.aggregations.categories,
        facet: {
          categories: {
            ...data.aggregations.categories.facet.categories,
            buckets: convertArrayToObject(
              data.aggregations.categories.facet.categories.buckets,
            ),
          },
        },
      },
    },
  } as SearchResponseFrontend);
