import { Maybe, Nullable } from "../../../helpers/typings/utility-types";
import { BucketsAggregations, ListBucketsAggregations } from "../type";

export const convertArrayToObject = (
  nodes: Maybe<Nullable<BucketsAggregations>>,
): Nullable<ListBucketsAggregations> => {
  if (!nodes?.length) return null;

  return nodes.reduce((acc: ListBucketsAggregations, current) => {
    acc[current.key] = current.doc_count;

    return acc;
  }, {});
};
