import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";
import { FC } from "react";

export const InputSearchButton: FC = () => (
  <Button
    type="submit"
    variant="contained"
    sx={[
      {
        height: "var(--search-button-height)",
        borderRadius: "var(--search-button-border-radius)",
      },
      {
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
        "&:focus": { boxShadow: "none" },
      },
    ]}>
    <SearchRoundedIcon fontSize="small" />
  </Button>
);
