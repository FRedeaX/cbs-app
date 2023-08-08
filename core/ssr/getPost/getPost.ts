import { client } from "@/lib/apollo/client";
import { transformBlocks } from "@/core/backend/transformBlocks";
import { splitDepartmentAndCategories } from "@/helpers/backend";
import { ERROR_MESSAGE } from "@/constants";

import { GetPostQuery, getPostDocument } from "./gql/getPostGQL";

export type GetPost = {
  /**
   * Ярлык записи (Slug).
   */
  slug: string;
};

export const getPost = async ({ slug: id }: GetPost) => {
  const { data, error, errors } = await client.query<GetPostQuery>({
    query: getPostDocument,
    variables: { id, type: "SLUG" },
  });

  if (error !== undefined) throw error;
  if (data === undefined) throw errors;
  const { post } = data;
  if (post === null) throw new Error(ERROR_MESSAGE.DATA_OF_NULL);

  const { blocks, video } = await transformBlocks(post.blocks);

  // Рубрики относящиеся к филиалу (отделу)
  // добавляем в начало массива
  const { categories: splitC, departments: splitD } =
    splitDepartmentAndCategories(post.categories.nodes);
  const categories = {
    nodes: splitD.nodes.concat(splitC.nodes),
  };

  return {
    ...post,
    blocks,
    categories,
    video,
  };
};
