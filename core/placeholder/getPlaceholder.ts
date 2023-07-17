import { RKEY_IMAGE_PLAICEHOLDER_BLUR, clientRedis } from "@/lib/redis";
import { delay, exceptionLog } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";

import {
  CreatePlaceholder,
  createPlaceholder,
} from "./utils/createPlaceholder";

export type GetPlaceholderResult = {
  blurDataURL: Nullable<string>;
};

/**
 * Возвращаем плейсхолдер из Redis, если найден
 * или возвращает null и запускает создание в фоне
 */
export const getPlaceholder = async ({
  id,
  url,
}: CreatePlaceholder): Promise<GetPlaceholderResult> => {
  try {
    const blurDataURL = await clientRedis.get(
      `${RKEY_IMAGE_PLAICEHOLDER_BLUR}${id}`,
    );

    if (blurDataURL === null) {
      delay(500).then(() => createPlaceholder({ id, url }));
    }

    return { blurDataURL };
  } catch (error) {
    exceptionLog(error);
    return { blurDataURL: null };
  }
};
