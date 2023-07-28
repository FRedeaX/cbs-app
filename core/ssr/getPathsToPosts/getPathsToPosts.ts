import { client } from "@/lib/apollo/client";
import { ERROR_MESSAGE } from "@/constants";

import {
  GetPathsToPostsGQL,
  getPathsToPostsQuery,
} from "./gql/getPathsToPostsGQL";

type PathToPost = {
  params: {
    slug: string;
  };
};

type GetPathsToPostsResult = PathToPost[];

export const getPathsToPosts = async (): Promise<GetPathsToPostsResult> => {
  const { data, error } = await client.query<GetPathsToPostsGQL>({
    query: getPathsToPostsQuery,
  });
  if (error !== undefined) throw error;
  const { nodes } = data.posts;
  if (nodes.length === 0) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);

  return nodes.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
};
