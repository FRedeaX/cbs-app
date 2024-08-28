import { FC, Fragment } from "react";
import { Skeleton } from "@mui/material";
import { Card, CardContent } from "src/shared/ui";
import { PostCardTitle } from "../Title";
import { PostCardExcerpt } from "../Excerpt";
import { Category } from "src/shared/ui/category";

export const PostCardSkeleton: FC = () => (
  <Card>
    <Skeleton
      sx={{
        borderRadius: "var(--g-image-border-radius)",
        width: "var(--card-media-width, 288px)",
        height: "162px",
      }}
      animation="wave"
      variant="rounded"></Skeleton>
    <CardContent>
      <PostCardTitle>
        <Skeleton sx={{ width: "30%" }} animation="wave" />
      </PostCardTitle>
      <PostCardExcerpt>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </PostCardExcerpt>
      <div sx={{ marginTop: "auto", zIndex: 1 }}>
        <Category.Container
          items={Array.from(new Array(1))}
          renderItem={(_, index) => (
            <Fragment key={index}>
              <Skeleton
                sx={{ width: "30px", marginRight: "10px" }}
                animation="wave"
              />
              <Skeleton sx={{ width: "80px" }} animation="wave" />
            </Fragment>
          )}
        />
      </div>
    </CardContent>
  </Card>
);
