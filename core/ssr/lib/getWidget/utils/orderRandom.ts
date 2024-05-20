import { Nullable } from "@/helpers/typings/utility-types";

type Order = {
  children: {
    nodes: {
      menuOrder: Nullable<number>;
    }[];
  };
};

export const orderRandom = <T extends Order>(data: T): T => {
  const { length } = data.children.nodes;
  const nodes = data.children.nodes.sort((a, b) => {
    const aNode = a.menuOrder ?? Math.random() + length;
    const bNode = b.menuOrder ?? Math.random() + length;
    return aNode - bNode;
  });

  return { ...data, children: { nodes } };
};
