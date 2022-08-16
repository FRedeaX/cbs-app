import { memo } from "react";

import { Card, IData } from "../Card";

interface СardListUngroupedProps {
  nodes: Array<IData>;
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
