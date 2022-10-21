import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { useRouter } from "next/router";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { omit } from "../../../../helpers/omit";
import { Nullable } from "../../../../helpers/typings/utility-types";
import { getFilterStringFromList } from "../getFilterStringFromList";
import { IFilterList } from "../type";

export type hendleOnChangeType = (
  event: ChangeEvent<HTMLInputElement>,
  checked: boolean,
) => void;

export type useFilterHookResult = {
  list: Nullable<IFilterList>;
  hendleOnChange: hendleOnChangeType;
};

const fill = (
  query: NextParsedUrlQuery,
  label: string,
): Nullable<IFilterList> => {
  const filter = query[label];
  if (typeof filter !== "string") return null;

  return filter.split(",").reduce((acc: IFilterList, currentValue) => {
    acc[currentValue] = true;
    return acc;
  }, {});
};

export const useFilter = (label: string): useFilterHookResult => {
  const { query, push: routerPush } = useRouter();
  const [filterList, setFilterList] = useState<Nullable<IFilterList>>(
    fill(query, label),
  );
  // console.log(filterList);

  useEffect(() => {
    if (!filterList) fill(query, label);
  }, [filterList, label, query]);

  useEffect(() => {
    const queryFilter = getFilterStringFromList(filterList);
    routerPush({
      query: queryFilter
        ? { ...query, [label]: queryFilter }
        : omit(query, [label]),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterList, label]);

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
