import { AggregationsAggregationContainer } from "@elastic/elasticsearch/api/types";

const departments: AggregationsAggregationContainer = {
  terms: {
    field: "departments.name.raw",
    size: parseInt(process.env.FACET_SIZE ?? "10", 10),
  },
};

const categories: AggregationsAggregationContainer = {
  terms: {
    field: "categories.name.raw",
    order: { _key: "asc" },
    size: parseInt(process.env.FACET_SIZE ?? "10", 10),
  },
};

export { departments, categories };
