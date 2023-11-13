import { Stack } from "@mui/material";
import { FC } from "react";

import { NotFound } from "@/components/NotFound/NotFound";
import { SEO, SEOProp } from "@/components/SEO/SEO";
import { PreviewPostCard } from "src/widgets/preview/PostCard";
import { PreviewTag } from "src/widgets/preview/Tag";

import { RoutePreviewPage } from "../Page/Route.PreviewPage";
import { RoutePreviewPost } from "../Post/Route.PreviewPost";

type PreviewProps = {
  id: number;
  type: "page" | "post" | "poster";
} & Pick<SEOProp, "domenTitle">;

export const RoutePreview: FC<PreviewProps> = ({ id, type, domenTitle }) => {
  switch (type) {
    case "page":
      return <RoutePreviewPage domenTitle={domenTitle} id={id} />;

    case "post":
      return (
        <Stack spacing={5}>
          <RoutePreviewPost domenTitle={domenTitle} id={id} />
          <PreviewPostCard id={id} />
          <PreviewTag id={id} />
        </Stack>
      );

    default:
      return (
        <>
          <SEO domenTitle={domenTitle} title="Страница не найдена" />
          <NotFound />
        </>
      );
  }
};
