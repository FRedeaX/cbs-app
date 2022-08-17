import {
  FETCH_CHILDREN_PAGE,
  FETCH_PAGE,
} from "../../../components/Pages/Page/Page.utils";
import { client } from "../../../store/apollo-client";
import { exceptionLog } from "../../exceptionLog";
import { transformBlocks } from "../transformBlocks";

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
      if (data.page === null) throw new Error("data.page of null");

      return {
        ...data.page,
        ...(await transformBlocks(data.page.blocks)),
      };
    })
    .catch((err) => {
      exceptionLog({ ...err, cstMessage: "FETCH_PAGE" });
      return null;
    });
  return page;
};

export async function getChildrenPage({ id, cursor = "", first = 10 }) {
  const page = await client
    .query({
      query: FETCH_CHILDREN_PAGE,
      variables: {
        id,
        idType: "URI",
        cursor,
        first,
      },
      fetchPolicy: "network-only",
    })
    .then(async ({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.page === null) throw new Error("data.page of null");
      if (data.page.children.nodes.length === 0)
        throw new Error("children.length of null");

      return data.page;
    })
    .catch((err) => {
      exceptionLog({ ...err, cstMessage: "FETCH_PAGE" });
      return null;
    });
  return page;
}
