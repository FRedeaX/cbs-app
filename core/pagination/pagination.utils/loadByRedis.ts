import { exceptionLog } from "../../../helpers";
import clientRedis from "../../../store/redis";
import { pageInfo } from "./type";

export interface ILoadByRedis {
  /**
   * Ключ для проверки и загрузки из Redis
   */
  key: string;

  /**
   * Сursor первой страницы для валидации кэша
   */
  endCursor?: string;
}

export const loadByRedis = async ({
  key,
  endCursor,
}: ILoadByRedis): Promise<pageInfo[] | null> => {
  try {
    const response = (await clientRedis?.get(key)) as string | null;
    if (response === null) return null;

    const pagination = await JSON.parse(response);

    if (
      endCursor === undefined ||
      (pagination[1] !== undefined && endCursor === pagination[1].cursor)
    ) {
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
