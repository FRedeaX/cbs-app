import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { omit } from "../../../../helpers";
import { Maybe } from "../../../../helpers/typings/utility-types";

const fill = (page: Maybe<string | string[]>): number =>
  typeof page === "string" ? parseInt(page, 10) : 1;

export const usePagination = () => {
  const { query, push: routerPush } = useRouter();
  const [page, setPage] = useState<number>(fill(query.page));

  useEffect(() => {
    setPage(fill(query.page));
  }, [query.page]);

  useEffect(() => {
    routerPush(
      {
        query: page > 1 ? { ...query, page } : omit(query, ["page"]),
      },
      undefined,
      { shallow: true, scroll: true },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChange = useCallback(
    (event: ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [],
  );

  return { page, handleChange };
};
