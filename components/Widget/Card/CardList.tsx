import { IData } from "./Card";
import CardListGrouped from "./CardListGrouped/CardListGrouped";
import CardListUngrouped from "./CardListUngrouped/CardListUngrouped";

interface CardListProps {
  nodes: IData[];
  isGroupCards: boolean;
  isHorizontal: boolean;
}

const CardList = ({
  nodes,
  isGroupCards = false,
  isHorizontal = false,
}: CardListProps) => {
  if (isGroupCards === true) {
    return <CardListGrouped data={nodes} />;
  }

  return <CardListUngrouped nodes={nodes} isHorizontal={isHorizontal} />;
};
export default CardList;
