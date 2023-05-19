import {
  IRecursiveLoadParties,
  queryNode,
  recursiveLoadParties,
} from "../../../helpers/backend";
import { tagsOnPage as getTagsOnPage } from "./tagsOnPage";
import { pageInfo } from "./type";

type Variables = {
  id: string;
  tagNotIn?: number[];
};

export type ILoadByGraphQL<TData> = {
  /**
   * `GraphQL` запрос должен принимать переменные `cursor`, `first`, `id?`.
   */
  query: queryNode;

  /**
   * Загрузка пагинации по ID
   */
  id?: string;

  isTags?: boolean;
} & Pick<IRecursiveLoadParties<TData, Variables>, "pageInfoCallback">;

export async function loadByGraphQL<TData>({
  query,
  id = "",
  isTags = false,
  pageInfoCallback,
}: ILoadByGraphQL<TData>) {
  const pagination: pageInfo[] = [{ number: 1, cursor: "", tags: [] }];

  const callbackFn = async (data: TData) => {
    pagination.push({
      number: pagination.length + 1,
      cursor: pageInfoCallback(data).endCursor,
      tags: isTags ? await getTagsOnPage(pagination, data) : [],
    });
  };
  const updatedVariablesCallback = () => {
    const paginationItem = pagination.at(-1);

    if (paginationItem) {
      return {
        first: 20,
        tagNotIn: paginationItem.tags,
      };
    }

    return {};
  };

  await recursiveLoadParties<TData, Variables>({
    query,
    variables: {
      id,
    },
    callbackFn,
    pageInfoCallback,
    updatedVariablesCallback,
  });

  return pagination;
}
