import { AggregationsAggregationContainer } from "@elastic/elasticsearch/api/types";

import { FACET_SIZE } from "../../../../constant/index";

const departments: AggregationsAggregationContainer = {
  terms: {
    field: "departments.name.raw",
    size: FACET_SIZE,
  },
};

const categories: AggregationsAggregationContainer = {
  terms: {
    field: "categories.name.raw",
    order: { _key: "asc" },
    size: FACET_SIZE,
  },
};

export { departments, categories };
