import { FETCH_PAGE } from "../../../components/Pages/Page/Page.utils";
import { transformBlocks } from "../../../core/backend/transformBlocks";
import { client } from "../../../lib/apollo/client";
import { exceptionLog } from "../../exceptionLog";

export const getPage = async (id) => {
  const page = await client
    .query({
      query: FETCH_PAGE,
      variables: {
        id,
        idType: "URI",
      },
      fetchPolicy: "network-only",
    })
    .then(async ({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.page === null) return null;

      return {
        ...data.page,
        ...(await transformBlocks(data.page.blocks)),
      };
    })
    .catch((error) => {
      exceptionLog(error);
      return null;
    });
  return page;
};
