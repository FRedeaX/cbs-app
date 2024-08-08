import { transformBlocks } from "@/core/backend/transformBlocks";

import { addsFeaturesToPage } from "../../utils/addsFeaturesToPage";
import { isSkipPage } from "../../utils/isSkipPage";
import { SSRError } from "../../utils/ssrEror";
import { clientGetPageQuery } from "../gql/getPageGQL";

export type FetchPage = {
  /**
   * URI без `page` сегмента и номера страницы.
   */
  uri: string;
  /**
   * Количество элементов, возвращаемых после курсора.
   * @default 10
   */
  first?: number;
  /**
   * Курсор, используется вместе с аргументом `first`
   * для указания места в наборе данных.
   * @default ""
   */
  cursor?: string;
};

/**
 * @param metadata Если значение равно true, то результат будет содержать только те данные, которые необходимы для формирования метаданных страницы.
 */
export const fetchPage = async (
  { uri: id, first = 10, cursor = "" }: FetchPage,
  metadata = false,
) => {
  const { data, error, errors } = await clientGetPageQuery({
    variables: {
      id,
      idType: "URI",
      first,
      cursor,
    },
  });

  if (error !== undefined) {
    throw new SSRError(error.message, { error, uri: id, first, cursor });
  }
  if (data === undefined) throw errors;
  if (data.page === null || isSkipPage(data.page)) return null;

  const { children, ...page } = data.page;
  const { blocks, videos } = await transformBlocks(page.blocks, metadata);

  const childrenList = children.nodes.length !== 0 ? children : null;

  if (childrenList !== null && !metadata) {
    type ChildrenData = Promise<typeof children["nodes"][0]>[];
    const childrenData = children.nodes.reduce<ChildrenData>((acc, element) => {
      if (isSkipPage(element)) return acc;
      acc.push(addsFeaturesToPage(element));
      return acc;
    }, []);

    childrenList.nodes = await Promise.all(childrenData);
  }

  return {
    // page: {
    ...page,
    blocks,
    videos,
    // },
    children: childrenList,
  };
};
