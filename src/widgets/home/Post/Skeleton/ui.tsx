import { FC } from "react";
import { PostCardList } from "src/entities/card/PostList";
import { sxTitle } from "../styles";
import { Typography, Skeleton } from "@mui/material";
import { PostCardSkeleton } from "src/entities/card/Post";

export const HomePostSkeleton: FC = () => {
  return (
    <PostCardList>
      <Typography sx={sxTitle} variant="sectionTitle">
        <Skeleton sx={{ width: "115px" }} />
      </Typography>
      {Array.from(new Array(10)).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </PostCardList>
  );
};
