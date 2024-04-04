import { ERROR_MESSAGE } from "@/constants";

import { SSRError } from "./ssrEror";

export const findCategoryName = (
  categories: { slug: string; name: string }[],
  slug: string,
) => {
  const name = categories.find((node) => node.slug === slug)?.name;
  if (name === undefined) {
    throw new SSRError(ERROR_MESSAGE.DATA_OF_NULL, { slug });
  }

  return name;
};
