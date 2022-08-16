import { captureException } from "@sentry/nextjs";

import { FETCH_MENU } from "../../../components/Header/Header";
import { client } from "../../../store/apollo-client";

export const getMenu = async (isCache = true) => {
  const menu = await client
    .query({
      query: FETCH_MENU,
      fetchPolicy: isCache ? "cache-first" : "network-only",
    })
    .then(({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      return data.menus.nodes;
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "FETCH_MENU" });
      return null;
    });
  return menu;
};
