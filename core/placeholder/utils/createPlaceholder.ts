import { getPlaiceholder } from "plaiceholder";

import { RKEY_IMAGE_PLAICEHOLDER_BLUR, clientRedis } from "@/lib/redis";

import { getImageURL } from "./getImageURL";

export type CreatePlaceholder = {
  /**
   * `id` для получения ссылки на изображение
   * если `url` не предоставлен и сохранения в `Redis`.
   */
  id: number | string;
  /**
   * Ссылка на изображение.
   */
  url?: string;
};

/**
 * Создаем плейсхолдер и сохраняем в `Redis` с указанным `id`.
 */
export const createPlaceholder = async ({
  id,
  url,
}: CreatePlaceholder): Promise<void> => {
  try {
    const sourceUrl = url ?? (await getImageURL(id));

    const buffer = await fetch(sourceUrl).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );

    const { base64 } = await getPlaiceholder(buffer, {
      size: 10,
    });

    await clientRedis.set(`${RKEY_IMAGE_PLAICEHOLDER_BLUR}${id}`, base64);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);

    // exceptionLog(err);
  }
};
