import { client } from "../../../lib/apollo/client";
import {
  FETCH_CHILDREN_PAGE,
  FetchChildrenPageGQL,
} from "./gql/fetchChildrenPageGQL";

type GetChildrenPage = {
  /**
   * Загрузка дочерних страниц по ID.
   */
  id: string;
  /**
   * Курсор, используется вместе с аргументом `first`
   * для указания места в наборе данных для получения данных.
   * @default ""
   */
  cursor?: string;
  /**
   * Количество элементов, возвращаемых после курсора.
   * @default 10
   */
  first?: number;
};

export const getChildrenPage = async ({
  id,
  cursor = "",
  first = 10,
}: GetChildrenPage): Promise<FetchChildrenPageGQL> => {
  const { data, error } = await client.query({
    query: FETCH_CHILDREN_PAGE,
    variables: {
      id,
      idType: "URI",
      cursor,
      first,
    },
    fetchPolicy: "network-only",
  });

  if (error !== undefined) throw new Error(error.message);
  if (data.page === null) throw new Error("data.page of null");
  if (data.page.children.nodes.length === 0)
    throw new Error("children.length of null");

  return data.page;
};
