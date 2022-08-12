import { captureException } from "@sentry/nextjs";

import { FETCH_PAGE } from "../../../components/Pages/Page/Page.utils";
import { client } from "../../../store/apollo-client";
import { transformBlocks } from "../transformBlocks";

export const getPage = async (id) => {
  const page = await client
    .query({
      query: FETCH_PAGE,
      variables: {
        id,
        type: "URI",
      },
      fetchPolicy: "network-only",
    })
    .then(async ({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.page === null) throw new Error("data.page of null");

      return {
        ...data.page,
        ...(await transformBlocks(data.page.blocks)),
      };
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "FETCH_PAGE" });
      return null;
    });
  return page;
};
