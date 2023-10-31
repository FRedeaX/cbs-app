import { Maybe, Nullable } from "./typings/utility-types";

type MaybeOrNullable<T> = Maybe<Nullable<T>>;
type Params = Record<string, MaybeOrNullable<string | string[]>>;

/**
 * Добавляем `query` параметры к `url`.
 */
export const createQueryLink = <TParams extends Params>(
  url: string,
  params: TParams,
) => {
  const query = Object.entries(params);
  const _url = new URL(url, process.env.NEXT_PUBLIC_ORIGIN);

  query.forEach(([key, value]) => {
    if (typeof value === "string") _url.searchParams.append(key, value);
    if (Array.isArray(value)) _url.searchParams.append(key, value.join(","));
  });

  return _url.href;
};
