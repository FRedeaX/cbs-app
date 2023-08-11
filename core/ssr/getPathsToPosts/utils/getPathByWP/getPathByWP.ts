import { exceptionLog } from "@/helpers";
import { ERROR_MESSAGE } from "@/constants";

import { clientGetPathsToPostsQuery } from "../../gql/getPathsToPostsGQL";
import { createPath } from "../createPath/createPath";

export const getPathByWP = async () => {
  try {
    const { data, error, errors } = await clientGetPathsToPostsQuery();

    if (error !== undefined) throw error;
    if (data === undefined) throw errors;
    const { nodes } = data.posts;
    if (nodes.length === 0) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);

    return nodes.map((element) => createPath(element.slug));
  } catch (error) {
    exceptionLog(error);
    return [];
  }
};
