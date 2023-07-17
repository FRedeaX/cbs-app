import { removeDuplicateTag } from "@/core/post";

import { initialPagination } from "../constant";

type Pagination = typeof initialPagination;

export const tagsOnPage = (pagination: Pagination[], data: any): number[] => {
  const { tags: lastPageTags } = pagination.at(-1) as Pagination;
  const { tags } = removeDuplicateTag(data.posts.nodes);

  return tags.length ? [...tags, ...lastPageTags] : [];
};
