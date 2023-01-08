import { convertArrayToObject } from "./convertArrayToObject";
import { SearchResponseBackend, SearchResponseFrontend } from "./type";

export const convertAggregationsToObject = (
  data: SearchResponseBackend,
): SearchResponseFrontend =>
  ({
    ...data,
    aggregations: {
      ...data.aggregations,
      departments: {
        ...data.aggregations.departments,
        buckets: convertArrayToObject(data.aggregations.departments.buckets),
      },
      categories: {
        ...data.aggregations.categories,
        buckets: convertArrayToObject(data.aggregations.categories.buckets),
      },
    },
  } as SearchResponseFrontend);
