import { delay, exceptionLog } from "../../helpers";
import { Nullable } from "../../helpers/typings/utility-types";
import { IMAGE_PLAICEHOLDER_BLUR, clientRedis } from "../../lib/redis";
import { createPlaceholder } from "./utils/createPlaceholder";

type placeholder = {
  blurDataURL: Nullable<string>;
};

export const getPlaceholder = async (
  id: number | string,
): Promise<placeholder> => {
  try {
    const blurDataURL = await clientRedis.get(
      `${IMAGE_PLAICEHOLDER_BLUR}${id}`,
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
