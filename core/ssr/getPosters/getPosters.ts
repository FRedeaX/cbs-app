import { exceptionLog } from "@/helpers";

import { clientGetPosterQuery } from "./gql/posterGQL";
import { dateConversion, sort } from "./utils";

export const getPosters = async () => {
  try {
    const { data, error, errors } = await clientGetPosterQuery();

    if (error !== undefined) throw error;
    if (data === undefined) throw errors;
    if (data.posters.nodes.length === 0) return null;

    const convert = dateConversion(data.posters.nodes);
    const posters = sort(convert);

    return posters;
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
