import { exceptionLog } from "../../../helpers";
import { Pagination, initialPagination } from "./constant";
import {
  ILoadByGraphQL,
  ILoadByRedis,
  loadByGraphQL,
  loadByRedis,
  saveByRedis,
} from "./utils";

/**
 * Возвращает пагинацию, соответствующую следующему набору записей на странице:
 * - 1 - 10
 * - 2 - 20
 * - 3 - 20
 * - n - 20
 */
export async function load<TData>({
  key,
  endCursor,
  query,
  id,
  isTags,
  pageInfoCallback,
}: ILoadByRedis & ILoadByGraphQL<TData>): Promise<Pagination[]> {
  try {
    const paginationRedis: Pagination[] | null = await loadByRedis({
      key,
      endCursor,
    });
    if (paginationRedis !== null) {
      return paginationRedis;
    }

    const paginationGraphQL: Pagination[] = await loadByGraphQL<TData>({
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
