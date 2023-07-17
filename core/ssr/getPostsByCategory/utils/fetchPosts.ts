import { client } from "@/lib/apollo/client";

import { addsFeaturesToPost } from "../../utils/addsFeaturesToPost";
import {
  PostsByCategoryQuery,
  postsByCategoryQuery,
} from "../gql/postsByCategoryGQL";

export type FetchPosts = {
  /**
   * Ярлык категории (Slug).
   */
  slug: string;
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

export const fetchPosts = async ({
  slug: id,
  first = 10,
  cursor = "",
}: FetchPosts) => {
  const { data, error } = await client.query<PostsByCategoryQuery>({
    query: postsByCategoryQuery,
    variables: { id, first, cursor },
  });
  if (error !== undefined) throw error;
  const { nodes } = data.category.posts;
  if (nodes.length === 0) return { data: null, pageInfo: null };

  const postsListData = nodes.map((post) => addsFeaturesToPost(post));
  const postsList = await Promise.all(postsListData);

  return { data: postsList, pageInfo: data.category.posts.pageInfo };
};
