import { clientRedis } from "@/lib/redis";
import { exceptionLog } from "@/helpers";

import { initialPagination } from "../constant";

import { ILoadByRedis } from "./loadByRedis";

type Pagination = typeof initialPagination;

export const saveByRedis = async (
  key: ILoadByRedis["key"],
  paginationRedis: Pagination[],
): Promise<void> => {
  try {
    clientRedis.set(key, JSON.stringify(paginationRedis));
  } catch (error) {
    exceptionLog(error);
  }
};
