import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type PostCardListProps = {
  children: ReactNode;
};

export const PostCardList: FC<PostCardListProps> = ({ children }) => (
  <Box
    sx={{
      "--card-margin-x": "calc(var(--gap) / 2)",
      "--card-margin-y": "calc(var(--gap) / 2)",
      "--category-background": "#fff",

      "@media (min-width: 1013px)": {
        "--carousel-button-left": "-28px",
        "--carousel-button-right": "-28px",
      },

      "@media (min-width: 768px)": {
        "--card-direction": "row",
        "--card-width": "100%",
      },

      "@media (max-width: 767px)": {
        "--card-width": "calc(50% - var(--gap))",
        "--card-media-width": "auto",
      },

      "@media (max-width: 605px)": {
        "--card-width": "100%",
        "--card-max-width": "400px",
        "--card-media-width": "100%",
      },

      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingY: "var(--gap)",
      paddingX: "calc(var(--gap) / 2)",
    }}
    component="section">
    {children}
  </Box>
);
