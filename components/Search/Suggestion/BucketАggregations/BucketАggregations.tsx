import { Chip } from "@mui/material";
import { FC } from "react";

import { IBucketsAggregations } from "../../../../lib/elastic";

interface IBucketАggregations {
  nodes: Array<IBucketsAggregations> | null | undefined;
}

const BucketАggregations: FC<IBucketАggregations> = ({ nodes }) => {
  if (!nodes || nodes.length === 0) return null;
  console.log(nodes);

  return (
    <>
      {nodes.map((node: IBucketsAggregations) => (
        <Chip key={node.key} label={`${node.key} (${node.doc_count})`} />
      ))}
    </>
  );
};
export default BucketАggregations;
