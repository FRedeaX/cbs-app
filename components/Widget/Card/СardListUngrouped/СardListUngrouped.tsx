import { memo } from "react";

import { Idata, Card } from "../Card";

interface СardListUngroupedProps {
  nodes: Array<Idata>;
  isHorizontal: boolean;
}

// eslint-disable-next-line no-undef
const СardListUngrouped = ({
  nodes,
  isHorizontal,
}: СardListUngroupedProps): JSX.Element[] =>
  nodes.map((node, index) => (
    <Card
      key={node.id}
      data={node}
      isHorizontal={isHorizontal}
      imagePriority={index < 3}
    />
  ));

export default memo(СardListUngrouped);
