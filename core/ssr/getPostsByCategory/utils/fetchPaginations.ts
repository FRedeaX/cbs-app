import { RKEY_POSTS_BY_CATEGORY } from "@/lib/redis";

import * as pagination from "../../../pagination";
import { ILoadByRedis } from "../../../pagination/utils";

type FetchPaginations = Pick<ILoadByRedis, "endCursor"> & {
  slug: string;
};

export const fetchPaginations = async ({
  endCursor,
  slug,
}: FetchPaginations) => {
  const paginations =
    await pagination.load<pagination.gql.PostsPaginationByCategoryGQL>({
      key: `${RKEY_POSTS_BY_CATEGORY}${slug}`,
      query: pagination.gql.POSTS_PAGINATION_BY_CATEGORY_GQL,
      id: slug,
      endCursor,
      pageInfoCallback: (data) => data.category.posts.pageInfo,
    });

  return paginations;
};
