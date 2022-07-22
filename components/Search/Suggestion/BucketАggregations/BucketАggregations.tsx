/* eslint-disable no-underscore-dangle */
import { Chip } from "@mui/material";
import { FC } from "react";

import { IBucketsAggregations } from "../../../../lib/elastic";

const BucketАggregations: FC<{ nodes?: Array<IBucketsAggregations> }> = ({
  nodes,
}) => {
  if (!nodes || nodes.length === 0) return null;
  console.log(nodes);

  return nodes.map((node: IBucketsAggregations) => (
    <Chip key={node.key} label={`${node.key} (${node.doc_count})`} />
  ));
};
export default BucketАggregations;
