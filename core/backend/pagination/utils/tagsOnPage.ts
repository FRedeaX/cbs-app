import { removeDuplicateTag } from "../../../../helpers/backend";
import { Pagination } from "./type";

export const tagsOnPage = async (
  pagination: Pagination[],
  data: any,
): Promise<number[]> => {
  const { tags: lastPageTags } = pagination.at(-1) as Pagination;

  const tags = await removeDuplicateTag(data.posts.nodes).then((response) =>
    response.arrTags.length ? [...response.arrTags, ...lastPageTags] : [],
  );
  return tags;
};
