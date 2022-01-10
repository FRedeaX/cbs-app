import { FETCH_MENU } from "../../../components/Header/Header";
import { client } from "../../../store/apollo-client";

export const preparingPaths = (nodes) =>
  nodes
    .filter(({ node }) => node.template.templateName !== "Redirect")
    .map(({ node }) => ({
      params: {
        pageSlug: node.slug,
      },
    }));

export const getMenu = async (isCache = true) => {
  const menu = await client
    .query({
      query: FETCH_MENU,
      fetchPolicy: isCache ? "cache-first" : "network-only",
    })
    .then(({ data }) => data.menus.nodes);
  return menu;
};
