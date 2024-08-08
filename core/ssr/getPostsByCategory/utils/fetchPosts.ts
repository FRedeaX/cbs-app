import { client } from "@/lib/apollo/client";

import { addsFeaturesToPost } from "../../utils/addsFeaturesToPost";
import { SSRError } from "../../utils/ssrEror";
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

/**
 * @param metadata Если значение равно true, то результат будет содержать только те данные, которые необходимы для формирования метаданных страницы.
 */
export const fetchPosts = async (
  { slug: id, first = 10, cursor = "" }: FetchPosts,
  metadata = false,
) => {
  const { data, error, errors } = await client.query<PostsByCategoryQuery>({
    query: postsByCategoryQuery,
    variables: { id, first, cursor },
  });
  if (error !== undefined) {
    throw new SSRError(error.message, { error, slug: id, first, cursor });
  }
  if (data === undefined) throw errors;
  if (data.category === null) return null;

  const postList = data.category.posts;
  if (postList.nodes.length === 0) return null;

  if (!metadata) {
    const postListData = postList.nodes.map((post) => addsFeaturesToPost(post));
    postList.nodes = await Promise.all(postListData);
  }

  return postList;
};
