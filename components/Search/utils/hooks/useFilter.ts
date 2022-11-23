import { Maybe } from "graphql/jsutils/Maybe";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { omit } from "../../../../helpers/omit";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { getFilterStringFromList } from "../getFilterStringFromList";
import { FilterList } from "../type";

export type hendleOnChangeType = (
  event: ChangeEvent<HTMLInputElement>,
  checked: boolean,
) => void;

export type useFilterHookResult = {
  list: Nullable<FilterList>;
  hendleOnChange: hendleOnChangeType;
};

const fill = (filter: Maybe<string | string[]>): Nullable<FilterList> => {
  if (typeof filter !== "string") return null;

  return filter.split(",").reduce((acc: FilterList, current) => {
    acc[current] = true;
    return acc;
  }, {});
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

  const hendleOnChange = useCallback<hendleOnChangeType>(
    ({ target: { name } }, checked) => {
      setFilterList((prev) =>
        checked ? { ...prev, [name]: checked } : omit(prev ?? {}, [name]),
      );
    },
    [],
  );

  return { list: filterList, hendleOnChange };
};
