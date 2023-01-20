import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

import { CSSProperties } from "../../../../../../helpers/typings/utility-types";

type FilterCleareProps = { children: ReactNode; sx?: CSSProperties };

export const FilterCleare: FC<FilterCleareProps> = ({ children, sx }) => {
  const { query, push: routerPush } = useRouter();
  const handleCleare = (): void => {
    routerPush(
      {
        query: { text: query.text },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <Button variant="outlined" size="small" sx={sx} onClick={handleCleare}>
      {children}
    </Button>
  );
};
