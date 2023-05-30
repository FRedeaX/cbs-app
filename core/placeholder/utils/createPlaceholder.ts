import { getPlaiceholder } from "plaiceholder";

import {
  GET_SOURCE_THUMBNAIL_URL,
  getSourceThumbnailUrlData,
} from "./imageGQL";
import { exceptionLog } from "@/helpers";

import { client } from "../../../lib/apollo/client";
import { RKEY_IMAGE_PLAICEHOLDER_BLUR, clientRedis } from "../../../lib/redis";

export const createPlaceholder = async (id: number | string): Promise<void> => {
  let err = "";

  try {
    const { data, errors } = await client.query<getSourceThumbnailUrlData>({
      query: GET_SOURCE_THUMBNAIL_URL,
      variables: { id },
    });

    if (errors) throw errors;
    if (data.mediaItem === null || data.mediaItem.sourceUrl === "") return;

    err = data.mediaItem.sourceUrl;

    const { base64 } = await getPlaiceholder(data.mediaItem.sourceUrl, {
      size: 10,
    });

    await clientRedis.set(`${RKEY_IMAGE_PLAICEHOLDER_BLUR}${id}`, base64);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(err);

    // exceptionLog(err);
  }
};
