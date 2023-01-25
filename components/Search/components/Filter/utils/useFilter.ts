import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { omit } from "../../../../../helpers/omit";
import { Nullable } from "../../../../../helpers/typings/utility-types";
import { fill } from "./fill";
import { getFilterStringFromList } from "./getFilterStringFromList";
import { FilterList } from "./type";

export type HandleOnChange = (
  event: ChangeEvent<HTMLInputElement>,
  checked: boolean,
) => void;

export type useFilterHookResult = {
  list: Nullable<FilterList>;
  handleOnChange: HandleOnChange;
};

export const useFilter = (label: string): useFilterHookResult => {
  const { query, push: routerPush } = useRouter();
  const [filterList, setFilterList] = useState<Nullable<FilterList>>(
    fill(query[label]),
  );

  useEffect(() => {
    setFilterList(fill(query[label]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query[label]]);

  useEffect(
    () => {
      const queryFilter = getFilterStringFromList(filterList);
      routerPush(
        {
          query: queryFilter
            ? { ...omit(query, ["page"]), [label]: queryFilter }
            : omit(query, ["page", label]),
        },
        undefined,
        { shallow: true, scroll: false },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterList, label],
  );

  const handleOnChange = useCallback<HandleOnChange>(
    ({ target: { name } }, checked) => {
      setFilterList((prev) =>
        checked ? { ...prev, [name]: checked } : omit(prev ?? {}, [name]),
      );
    },
    [],
  );

  return { list: filterList, handleOnChange };
};
