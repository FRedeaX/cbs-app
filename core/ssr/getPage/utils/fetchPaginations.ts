import { RKEY_PAGE } from "@/lib/redis";
import { ILoadByRedis } from "@/core/pagination/utils";

import * as pagination from "../../../pagination";

type FetchPaginations = Pick<ILoadByRedis, "endCursor"> & {
  /**
   * URI без `page` сегмента и номера страницы.
   */
  uri: string;
};

export const fetchPaginations = async ({
  endCursor,
  uri,
}: FetchPaginations) => {
  const paginations =
    await pagination.load<pagination.gql.ChildrenPagePaginationGQL>({
      key: `${RKEY_PAGE}${uri}`,
      query: pagination.gql.CHILDREN_PAGE_PAGINATION,
      id: uri,
      endCursor,
      pageInfoCallback: (data) => data.page.children.pageInfo,
    });

  return paginations;
};
