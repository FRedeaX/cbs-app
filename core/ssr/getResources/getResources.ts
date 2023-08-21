import { exceptionLog } from "@/helpers";
import { ERROR_MESSAGE } from "@/constants";

import { clientGetResourcesQuery } from "./gql/getResourcesGQL";

export const getResources = async () => {
  try {
    const { data, error, errors } = await clientGetResourcesQuery({
      variables: { id: "resources" },
    });

    if (error !== undefined) throw error;
    if (data === undefined) throw errors;
    const { page } = data;
    if (page === null) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);

    const { length } = page.children.nodes;
    const nodes = page.children.nodes.sort((a, b) => {
      const aNode = a.menuOrder ?? Math.random() + length;
      const bNode = b.menuOrder ?? Math.random() + length;
      return aNode - bNode;
    });

    return { ...page, children: { nodes } };
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
