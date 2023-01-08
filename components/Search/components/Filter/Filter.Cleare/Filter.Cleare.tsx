import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type FilterCleareProps = { children: ReactNode; className?: string };

export const FilterCleare: FC<FilterCleareProps> = ({
  children,
  className,
}) => {
  const { query, push: routerPush } = useRouter();
  const cleareHendler = (): void => {
    routerPush({
      query: { text: query.text },
    });
  };

  return (
    <Button
      variant="outlined"
      size="small"
      className={className}
      onClick={cleareHendler}>
      {children}
    </Button>
  );
};
