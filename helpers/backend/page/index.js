import { captureException } from "@sentry/nextjs";

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
    .then(({ data }) => transformBlocks(data.page))
    .catch((err) => {
      captureException(err, "FETCH_PAGE");
      return null;
    });
  return page;
};

export default getPage;
