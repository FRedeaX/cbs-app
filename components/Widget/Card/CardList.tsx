import СardListGrouped from "./СardListGrouped/СardListGrouped";
import СardListUngrouped from "./СardListUngrouped/СardListUngrouped";

interface CardListProps {
  nodes: Array<object>;
  isGroupCards: boolean;
  isHorizontal: boolean;
}

const CardList = ({
  nodes,
  isGroupCards = false,
  isHorizontal = false,
}: CardListProps) => {
  if (isGroupCards === true) {
    return <СardListGrouped data={nodes} />;
  }

  return <СardListUngrouped nodes={nodes} isHorizontal={isHorizontal} />;
};
export default CardList;
