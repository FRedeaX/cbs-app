import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { getMinimumDataForOffer } from "@/core/api/offers";
import { ResponseOfferData } from "@/core/api/offers/types";
import { convertData } from "@/core/api/offers/utils";
import { SearchParams, SearchResponseFrontend } from "@/core/elastic/type";
import { exceptionLog, fetcherData } from "@/helpers";
import { ERROR_MESSAGE } from "@/constants";

const url = process.env.NEXT_PUBLIC_API_ES_URL;
const fetcher = (
  arggs: Parameters<
    typeof fetcherData<SearchResponseFrontend, SearchParams>
  >[0],
) =>
  fetcherData<SearchResponseFrontend, SearchParams>({ ...arggs }).then((data) =>
    convertData(data.hits.hits),
  );

export default async function offerHandler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseOfferData>,
) {
  try {
    const { id } = req.query;
    if (typeof id !== "string") {
      throw new ApiError(400, `${ERROR_MESSAGE.API_QUERY_KEY_UNDEFINED} "id"`);
    }

    const { keywords, categories, departments, lteDate } =
      await getMinimumDataForOffer(id);

    const similarPostsData = keywords
      ? fetcher({
          url,
          text: keywords,
          lteDate,
          excludedId: id,
        })
      : null;

    const postsByCategoryData = fetcher({
      url,
      categories,
      departments,
      lteDate,
      excludedId: id,
    });

    const [similarPosts, postsByCategory] = await Promise.all([
      similarPostsData,
      postsByCategoryData,
    ]);

    res.status(200).json({ similarPosts, postsByCategory });
  } catch (error) {
    exceptionLog(error);
    if (error instanceof ApiError) {
      res.status(500).end();
    } else {
      res.status(500).end();
    }
  }
}
