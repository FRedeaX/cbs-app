import { clientRedis } from "@/lib/redis";
import { exceptionLog } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";

import { initialPagination } from "../constant";

type Pagination = typeof initialPagination;

export interface ILoadByRedis {
  /**
   * Ключ для проверки и загрузки из Redis
   */
  key: string;

  /**
   * Сursor первой страницы для валидации кэша
   */
  endCursor?: Nullable<string>;
}

export const loadByRedis = async ({
  key,
  endCursor,
}: ILoadByRedis): Promise<Pagination[] | null> => {
  try {
    const response = await clientRedis?.get(key);
    if (response === null) return null;

    const pagination = await JSON.parse(response);

    // Возвращаем пагинацию, если
    // endCursor не предоставлен или
    // endCursor равен ссылке на вторую страницу
    if (!endCursor || endCursor === pagination?.[1].cursor) {
      // eslint-disable-next-line no-console
      console.log(`load pagination: ${key}`);
      return pagination;
    }

    return null;
  } catch (error) {
    exceptionLog(error);
    return null;
  }
};
