/* eslint-disable no-console */

/* eslint-disable @typescript-eslint/no-empty-interface */
import { exceptionLog } from "../../helpers";
import { initialPagination } from "./pagination.const";
import {
  ILoadByGraphQL,
  ILoadByRedis,
  loadByGraphQL,
  loadByRedis,
  pageInfo,
  saveByRedis,
} from "./pagination.utils";

interface IPaginationLoad<TData> extends ILoadByGraphQL<TData> {
  key: ILoadByRedis["key"];
  endCursor?: ILoadByRedis["endCursor"];
}

export async function paginationLoad<TData>({
  key,
  endCursor,
  query,
  id,
  pageInfoCallback,
}: IPaginationLoad<TData>): Promise<pageInfo[]> {
  try {
    const paginationRedis: pageInfo[] | null = await loadByRedis({
      key,
      endCursor,
    });
    if (paginationRedis !== null) {
      return paginationRedis;
    }

    const paginationGraphQL: pageInfo[] = await loadByGraphQL<TData>({
      query,
      id,
      pageInfoCallback,
    });
    saveByRedis(key, paginationGraphQL);

    return paginationGraphQL;
  } catch (error) {
    exceptionLog(error);
    return [initialPagination];
  }
}
