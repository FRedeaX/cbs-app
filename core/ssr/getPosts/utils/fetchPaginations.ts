import { RKEY_POSTS } from "@/lib/redis";

import * as pagination from "../../../pagination";
import { ILoadByRedis } from "../../../pagination/utils";

type FetchPaginations = Pick<ILoadByRedis, "endCursor">;

export const fetchPaginations = async ({
  endCursor,
}: FetchPaginations = {}) => {
  const paginations = await pagination.load<pagination.gql.PostsPaginationGQL>({
    key: RKEY_POSTS,
    query: pagination.gql.POSTS_PAGINATION_GQL,
    endCursor,
    isTags: true,
    pageInfoCallback: (data) => data.posts.pageInfo,
  });

  return paginations;
};
