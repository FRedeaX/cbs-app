import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type FilterCleareProps = { children: ReactNode; className?: string };

export const FilterCleare: FC<FilterCleareProps> = ({
  children,
  className,
}) => {
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
    <Button
      variant="outlined"
      size="small"
      className={className}
      disabled={undefined}
      onClick={handleCleare}>
      {children}
    </Button>
  );
};
