import {
  _pageInfoCallback,
  queryNode,
  recursiveLoadParties,
} from "../../../helpers/backend";
import { pageInfo } from "./type";

export interface ILoadByGraphQL<TData> {
  /**
   * GraphQl запрос
   */
  query: queryNode;

  /**
   * Загрузка пагинации по ID
   */
  id?: string;

  pageInfoCallback: _pageInfoCallback<TData>;
}

interface IUpdatedVariables {
  id: string;
  tagNotIn: number[] | undefined;
}

export async function loadByGraphQL<TData>({
  query,
  id = "",
  pageInfoCallback,
}: ILoadByGraphQL<TData>) {
  const pagination: pageInfo[] = [{ number: 1, cursor: "", tags: [] }];

  const callbackFn = async (data: TData) => {
    pagination.push({
      number: pagination.length + 1,
      cursor: pageInfoCallback(data).endCursor,
      tags: [], // categoryName === "" ? await getTagsOnPage(pagination, data) : [],
    });
  };
  const updatedVariablesCallback = () => {
    const { tags: tagNotIn } = pagination.at(-1) as pageInfo;
    return {
      id,
      first: 20,
      tagNotIn,
    };
  };

  await recursiveLoadParties<IUpdatedVariables, TData>({
    query,
    variables: {
      id,
      tagNotIn: [],
    },
    callbackFn,
    pageInfoCallback,
    updatedVariablesCallback,
  });

  return pagination;
}
