import { FETCH_MENU } from "../../../components/Header/Header";
import { client } from "../../../store/apollo-client";
import { exceptionLog } from "../../exceptionLog";

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
    .catch((error) => {
      exceptionLog(error);
      return null;
    });
  return menu;
};
