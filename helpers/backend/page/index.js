import { captureException } from "@sentry/nextjs";
// eslint-disable-next-line import/no-cycle
import { transformBlocks } from "..";
import { FETCH_PAGE } from "../../../components/Pages/Page";
import { client } from "../../../store/apollo-client";

const getPage = async (id) => {
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

export default getPage;
