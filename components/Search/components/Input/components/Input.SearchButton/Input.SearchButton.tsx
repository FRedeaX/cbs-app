import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Button } from "@mui/material";
import { FC } from "react";

const sxButton = {
  height: "var(--search-button-height)",
  borderRadius: "var(--search-button-border-radius)",
  boxShadow: "none",
  "&:hover": { boxShadow: "none" },
  "&:focus": { boxShadow: "none" },
};

export const InputSearchButton: FC = () => (
  <Button type="submit" variant="contained" sx={sxButton}>
    <SearchRoundedIcon fontSize="small" />
  </Button>
);
