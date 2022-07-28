import { _pageInfo } from "../../../helpers/backend";

export function getPageInfo<TData>(data: TData): _pageInfo {
  if (data?.category?.posts) {
    console.log("category1");

    return data.category.posts.pageInfo;
  }

  return data.posts.pageInfo;
}
