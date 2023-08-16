import { GetPathsToPosts } from "../../types";

export const createPath = (slug: string): GetPathsToPosts[0] => ({
  params: { slug },
});
