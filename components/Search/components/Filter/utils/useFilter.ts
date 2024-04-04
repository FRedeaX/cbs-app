import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState, useMemo } from "react";

import { omit } from "@/helpers/omit";
import { Nullable } from "@/helpers/typings/utility-types";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams?.get(label);
  const [filterList, setFilterList] = useState<Nullable<FilterList>>(
    fill(currentFilter),
  );
  const params = useMemo(
    () => new URLSearchParams(searchParams ?? {}),
    [searchParams],
  );

  useEffect(() => {
    setFilterList(fill(currentFilter));
  }, [currentFilter]);

  useEffect(() => {
    const queryFilter = getFilterStringFromList(filterList);

    if (queryFilter) params.set(label, queryFilter);
    else params.delete(label);
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filterList, label, params, pathname, router]);

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
