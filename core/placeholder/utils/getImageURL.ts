import { client } from "@/lib/apollo/client";
import { ERROR_MESSAGE } from "@/constants";

import {
  GET_SOURCE_THUMBNAIL_URL,
  getSourceThumbnailUrlData,
} from "./imageGQL";

/**
 * Получаем ссылку на изображение (`размер: THUMBNAIL`) по id.
 * @param id databaseId
 * @returns link
 */
export const getImageURL = async (id: number | string) => {
  const { data, errors } = await client.query<getSourceThumbnailUrlData>({
    query: GET_SOURCE_THUMBNAIL_URL,
    variables: { id },
  });

  if (errors) throw errors;
  if (data.mediaItem === null || data.mediaItem.sourceUrl === "") {
    throw new Error(ERROR_MESSAGE.DATA_OF_NULL);
  }

  return data.mediaItem.sourceUrl;
};
