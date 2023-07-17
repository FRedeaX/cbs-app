import { client } from "@/lib/apollo/client";
import { exceptionLog } from "@/helpers";

import { FETCH_POSTER, PosterGQL } from "./gql/posterGQL";
import { dateConversion, sort } from "./utils";

export const getPosters = async () => {
  try {
    const { data, error } = await client.query<PosterGQL>({
      query: FETCH_POSTER,
    });

    if (error !== undefined) throw error;
    if (data.posters.nodes.length === 0) return null;

    const convert = dateConversion(data.posters.nodes);
    const posters = sort(convert);

    return posters;
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
