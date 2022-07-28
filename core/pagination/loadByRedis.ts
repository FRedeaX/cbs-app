import { exceptionLog } from "../../helpers";
import clientRedis from "../../store/redis";
import { pageInfo } from "./pagination.utils/type";

interface ILoadByRedis {
  /**
   * Ключ для проверки и загрузки из Redis
   */
  key: string;

  /**
   * Сursor первой страницы для ревалидации кэша
   */
  endCursor: string;
}

export const loadByRedis = async (
  key: ILoadByRedis["key"],
  endCursor?: ILoadByRedis["endCursor"],
): Promise<pageInfo[] | null> => {
  try {
    const response = (await clientRedis?.get(key)) as string | null;
    if (response === null) return null;

    const pagination = await JSON.parse(response);

    if (endCursor === pagination[1]?.cursor || endCursor === undefined) {
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
