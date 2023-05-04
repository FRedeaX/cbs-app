import { delay, exceptionLog } from "../../helpers";
import { Nullable } from "../../helpers/typings/utility-types";
import { RKEY_IMAGE_PLAICEHOLDER_BLUR, clientRedis } from "../../lib/redis";
import { createPlaceholder } from "./utils/createPlaceholder";

export type GetPlaceholderResult = {
  blurDataURL: Nullable<string>;
};

export const getPlaceholder = async (
  id: number | string,
): Promise<GetPlaceholderResult> => {
  try {
    const blurDataURL = await clientRedis.get(
      `${RKEY_IMAGE_PLAICEHOLDER_BLUR}${id}`,
    );

    if (blurDataURL === null) {
      delay(500).then(() => createPlaceholder(id));
    }

    return { blurDataURL };
  } catch (error) {
    exceptionLog(error);
    return { blurDataURL: null };
  }
};
