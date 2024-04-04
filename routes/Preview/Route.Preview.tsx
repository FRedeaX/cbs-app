import { Stack } from "@mui/material";
import { FC } from "react";

import { Error } from "@/components/Error/Error";
import { PreviewPostCard } from "src/widgets/preview/PostCard";
import { PreviewTag } from "src/widgets/preview/Tag";

import { RoutePreviewPage } from "../Page/Route.PreviewPage";
import { RoutePreviewPost } from "../Post/Route.PreviewPost";

type PreviewProps = {
  id: number;
  type: "page" | "post" | "poster";
};

export const RoutePreview: FC<PreviewProps> = ({ id, type }) => {
  switch (type) {
    case "page":
      return <RoutePreviewPage id={id} />;

    case "post":
      return (
        <Stack spacing={5}>
          <RoutePreviewPost id={id} />
          <PreviewPostCard id={id} />
          <PreviewTag id={id} />
        </Stack>
      );

    default:
      return <Error statusCode={404} title="Страница не найдена" />;
  }
};
