import { client } from "@/lib/apollo/client";
import { removeDuplicateTag } from "@/core/post";
import { flatPromise } from "@/helpers";

import { addsFeaturesToPost } from "../../utils/addsFeaturesToPost";
import { PostListQuery, postListQuery } from "../gql/postListGQL";

export type FetchPosts = {
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
  /**
   * Массив идентификаторов (`databaseId`) тегов,
   * используемый для исключения объектов из набора данных.
   */
  tagNotIn?: number[];
};

export const fetchPosts = async ({
  first = 10,
  cursor = "",
  tagNotIn,
}: FetchPosts = {}) => {
  const { data, error } = await client.query<PostListQuery>({
    query: postListQuery,
    variables: { first, cursor, tagNotIn },
  });
  if (error !== undefined) throw error;
  const { nodes } = data.posts;
  if (nodes.length === 0) return { data: null, pageInfo: null };

  const uniquePosts = removeDuplicateTag<typeof nodes[0]>(nodes).data;

  const postsList = await flatPromise(uniquePosts, async (element) => {
    const tag = element.tags.nodes[0];
    if (tag) {
      return flatPromise(tag.posts.nodes, addsFeaturesToPost).then((item) => ({
        ...element,
        tags: {
          nodes: [
            {
              ...element.tags.nodes[0],
              posts: {
                nodes: item,
              },
            },
          ],
        },
      }));
    }
    return addsFeaturesToPost(element);
  });

  return { data: postsList, pageInfo: data.posts.pageInfo };
};
