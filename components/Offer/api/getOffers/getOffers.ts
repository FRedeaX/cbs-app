import { searchQuery } from "@/core/elastic";
import { SearchParams } from "@/core/elastic/type";
import { exceptionLog } from "@/helpers";

import { offerAdapter } from "./adapter";
import { getMinimumDataForOffer } from "./getMinimumDataForOffer";

const fetcher = (arggs: SearchParams) => searchQuery(arggs).then(offerAdapter);

/** @param id ярлык текущей записи */
export const getOffers = async (id: string) => {
  try {
    const { excludedId, keywords, categories, departments, lteDate } =
      await getMinimumDataForOffer(id);

    const similarPostsData = keywords
      ? fetcher({ text: keywords, lteDate, excludedId })
      : null;

    const postsByCategoryData = fetcher({
      categories,
      departments,
      lteDate,
      excludedId,
    });

    const [similarPosts, postsByCategory] = await Promise.all([
      similarPostsData,
      postsByCategoryData,
    ]);

    return { similarPosts, postsByCategory };
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
