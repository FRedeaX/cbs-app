import { exceptionLog } from "../../../helpers";
import { clientRedis } from "../../../lib/redis";
import { ILoadByRedis } from "./loadByRedis";
import { pageInfo } from "./type";

export const saveByRedis = async (
  key: ILoadByRedis["key"],
  paginationRedis: pageInfo[],
): Promise<void> => {
  try {
    clientRedis.set(key, JSON.stringify(paginationRedis));
  } catch (error) {
    exceptionLog(error);
  }
};
