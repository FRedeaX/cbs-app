import { queryNode, recursiveLoadParties } from "../../helpers/backend";
import clientRedis from "../../store/redis";
import { getPageInfo } from "./pagination.utils/getPageInfo";
import { tagsOnPage as getTagsOnPage } from "./pagination.utils/tagsOnPage";
import { pageInfo } from "./pagination.utils/type";

interface IPaginationLoad {
  /**
   * GraphQl запрос
   */
  query: queryNode;

  /**
   * Загрузка пагинации для отдельной категории
   */
  categoryName?: string;
}

interface IUpdatedVariables {
  tagNotIn: number[] | undefined;
}

export async function loadByGraphQL<TData>({
  key,
  endCursor,
  query,
  categoryName = "",
}: IPaginationLoad) {
  const pagination: pageInfo[] = [{ number: 1, cursor: "", tags: [] }];
  console.log("paginationLoad");

  const callbackFn = async (data: TData) => {
    pagination.push({
      number: pagination.length + 1,
      cursor: getPageInfo<TData>(data).endCursor,
      tags: await getTagsOnPage(pagination, data),
    });
  };
  const updatedVariablesCallback = () => {
    const { tags: tagNotIn } = pagination.at(-1) as pageInfo;
    return {
      first: 20,
      tagNotIn,
    };
  };

  await recursiveLoadParties<IUpdatedVariables, TData>({
    query,
    variables: {
      tagNotIn: [],
    },
    callbackFn,
    pageInfoCallback: (data: TData) => getPageInfo<TData>(data),
    updatedVariablesCallback,
  });

  clientRedis?.set(key, JSON.stringify(pagination));
}
