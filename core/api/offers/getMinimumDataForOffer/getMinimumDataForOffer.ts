import { ApiError } from "next/dist/server/api-utils";

import { client } from "@/lib/apollo/client";
import { splitDepartmentAndCategories } from "@/helpers/backend";
import { ERROR_MESSAGE } from "@/constants";

import {
  GetMinimumDataForOfferQuery,
  getMinimumDataForOfferDocument,
} from "./gql/getMinimumDataForOfferGQL";

/**
 * Возвращаем минимально необходимый набор данных
 * для последующих запросов на формирование предложения.
 * @param id текущей записи
 */
export const getMinimumDataForOffer = async (id: string) => {
  const { data, error, errors } =
    await client.query<GetMinimumDataForOfferQuery>({
      query: getMinimumDataForOfferDocument,
      variables: {
        id,
      },
    });
  if (error !== undefined) throw new ApiError(500, error.message);
  if (data === undefined) throw errors;
  const { post } = data;
  if (post === null) throw new ApiError(404, ERROR_MESSAGE.DATA_OF_NULL);

  const { categories, departments } = splitDepartmentAndCategories(
    post.categories.nodes,
  );

  return {
    notIn: id,
    keywords: post.postsFields.keywords,
    categories: categories.nodes.map((c) => c.name).join(","),
    departments: departments.nodes.map((d) => d.name).join(","),
    lteDate: post.date,
  };
};
