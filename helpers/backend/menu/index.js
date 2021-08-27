import { client } from "~/store/apollo-client";
import { FETCH_MENU } from "~/components/Header/Header";

export const preparingPaths = (nodes) =>
  nodes
    .filter(({ node }) => node.template.templateName !== "Redirect")
    .map(({ node }) => ({
      params: {
        pageSlug: node.slug,
      },
    }));

export const getMenu = async (isCache = true) =>
  await client
    .query({
      query: FETCH_MENU,
      fetchPolicy: isCache ? "cache-first" : "network-only",
    })
    .then(({ data }) => data.menus.nodes);
