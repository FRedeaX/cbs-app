import { removeDuplicateTag } from "../../../helpers/backend";
import { pageInfo } from "./type";

export const tagsOnPage = async (
  pagination: pageInfo[],
  data: any,
): Promise<number[]> => {
  const { tags: lastPageTags } = pagination.at(-1) as pageInfo;

  const tags = await removeDuplicateTag(data.posts.nodes).then((response) =>
    response.arrTags.length ? [...response.arrTags, ...lastPageTags] : [],
  );
  return tags;
};
