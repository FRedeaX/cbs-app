import { FC, memo } from "react";

import { Card, IData } from "../Card";

interface СardListUngroupedProps {
  nodes: Array<IData>;
  isHorizontal: boolean;
}

const СardListUngrouped: FC<СardListUngroupedProps> = ({
  nodes,
  isHorizontal,
}) => (
  <>
    {nodes.map((node, index) => (
      <Card
        key={node.id}
        data={node}
        isHorizontal={isHorizontal}
        imagePriority={index < 3}
      />
    ))}
  </>
);

export default memo(СardListUngrouped);
