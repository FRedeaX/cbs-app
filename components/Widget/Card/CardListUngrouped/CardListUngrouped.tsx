import { FC, memo } from "react";

import { Card, IData } from "../Card";

interface CardListUngroupedProps {
  nodes: IData[];
  isHorizontal: boolean;
}

const CardListUngrouped: FC<CardListUngroupedProps> = ({
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

export default memo(CardListUngrouped);
