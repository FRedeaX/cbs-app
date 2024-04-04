import { transformBlocks } from "@/core/backend/transformBlocks";
import { Nullable } from "@/helpers/typings/utility-types";

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

export const fetchPage = async ({
  uri: id,
  first = 10,
  cursor = "",
}: FetchPage) => {
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
  if (data.page === null || isSkipPage(data.page)) {
    return { page: null, children: null };
  }

  const { children, ...page } = data.page;
  const { blocks, videos } = await transformBlocks(page.blocks);

  const childrenData: Nullable<typeof children> =
    blocks.length === 0 ? { nodes: [], pageInfo: children.pageInfo } : null;

  if (childrenData !== null) {
    type ChildrenList = Promise<typeof children["nodes"][0]>[];
    const childrenList = children.nodes.reduce<ChildrenList>((acc, element) => {
      if (isSkipPage(element)) return acc;
      acc.push(addsFeaturesToPage(element));
      return acc;
    }, []);

    childrenData.nodes = await Promise.all(childrenList);
  }

  return {
    page: {
      ...page,
      blocks,
      videos,
    },
    children: childrenData,
  };
};
