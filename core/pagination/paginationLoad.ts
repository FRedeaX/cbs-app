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

/**
 * Возвращает пагинацию, соответствующую следующему набору записей на странице:
 * - 1 - 10
 * - 2 - 20
 * - 3 - 20
 * - n - 20
 */
export async function paginationLoad<TData>({
  key,
  endCursor,
  query,
  id,
  isTags,
  pageInfoCallback,
}: ILoadByRedis & ILoadByGraphQL<TData>): Promise<pageInfo[]> {
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
      isTags,
      pageInfoCallback,
    });
    saveByRedis(key, paginationGraphQL);

    return paginationGraphQL;
  } catch (error) {
    exceptionLog(error);
    return [initialPagination];
  }
}
