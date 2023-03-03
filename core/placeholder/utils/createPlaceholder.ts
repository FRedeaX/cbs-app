import { getPlaiceholder } from "plaiceholder";

import { exceptionLog } from "../../../helpers";
import { client } from "../../../lib/apollo/client";
import { IMAGE_PLAICEHOLDER_BLUR, clientRedis } from "../../../lib/redis";
import {
  GET_SOURCE_THUMBNAIL_URL,
  getSourceThumbnailUrlData,
} from "./imageGQL";

let err = "";
export const createPlaceholder = async (id: number | string): Promise<void> => {
  try {
    const { data, error } = await client.query<getSourceThumbnailUrlData>({
      query: GET_SOURCE_THUMBNAIL_URL,
      variables: { id },
    });

    if (error) throw error;
    if (data.mediaItem === null || data.mediaItem.sourceUrl === "") return;

    err = data.mediaItem.sourceUrl;

    const { base64 } = await getPlaiceholder(data.mediaItem.sourceUrl, {
      size: 10,
    });

    await clientRedis.set(`${IMAGE_PLAICEHOLDER_BLUR}${id}`, base64);
  } catch (error) {
    exceptionLog(err);
  }
};
