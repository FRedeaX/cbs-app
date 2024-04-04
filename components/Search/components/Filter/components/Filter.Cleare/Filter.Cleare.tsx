import { Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

import { CSSProperties } from "../../../../../../helpers/typings/utility-types";

type FilterCleareProps = { children: ReactNode; sx?: CSSProperties };

export const FilterCleare: FC<FilterCleareProps> = ({ children, sx }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCleare = (): void => {
    const params = new URLSearchParams(searchParams ?? {});
    router.push(`${pathname}?text=${params.get("text")}`);
  };

  return (
    <Button variant="outlined" size="small" sx={sx} onClick={handleCleare}>
      {children}
    </Button>
  );
};
