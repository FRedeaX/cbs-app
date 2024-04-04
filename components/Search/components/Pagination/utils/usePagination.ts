import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState, useMemo } from "react";

import { fill } from "./fill";

export const usePagination = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = searchParams?.get("page");
  const [page, setPage] = useState<number>(fill(currentPage));
  const params = useMemo(
    () => new URLSearchParams(searchParams ?? {}),
    [searchParams],
  );

  useEffect(() => {
    setPage(fill(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (page > 1) params.set("page", page.toString());
    else params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  }, [page, params, pathname, router]);

  const handleChange = useCallback(
    (event: ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    [],
  );

  return { page, handleChange };
};
