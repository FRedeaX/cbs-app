import { IconButton } from "@mui/material";
import { FC, ReactNode } from "react";

const SearchToggleFrom: FC<{
  isSearch: boolean;
  onClick: () => void;
  children: ReactNode;
}> = ({ isSearch, onClick, children }) => (
  <IconButton
    type="button"
    sx={{
      width: "36px",
      height: "36px",
      marginLeft: "8px",
      padding: "8px",
    }}
    aria-label={isSearch ? "Закрыть поиск" : "Поиск"}
    onClick={onClick}>
    {children}
  </IconButton>
);

export default SearchToggleFrom;
