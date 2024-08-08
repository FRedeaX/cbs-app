import { transformBlocks } from "@/core/backend/transformBlocks";
import { splitDepartmentAndCategories } from "@/helpers/backend";

import { SSRError } from "../utils/ssrEror";

import { clientGetPostQuery } from "./gql/getPostGQL";

export type GetPost = {
  /**
   * Ярлык записи (Slug).
   */
  slug: string;
};

/**
 * @param metadata Если значение равно true, то результат будет содержать только те данные, которые необходимы для формирования метаданных страницы.
 */
export const getPost = async ({ slug: id }: GetPost, metadata = false) => {
  const { data, error, errors } = await clientGetPostQuery({
    variables: { id, type: "SLUG" },
  });

  if (error !== undefined) {
    throw new SSRError(error.message, { error, slug: id });
  }
  if (data === undefined) throw errors;
  const { post } = data;
  if (post === null) return null;

  const { blocks, videos } = await transformBlocks(post.blocks, metadata);

  if (metadata) return { ...post, blocks, videos };

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
    videos,
  };
};
