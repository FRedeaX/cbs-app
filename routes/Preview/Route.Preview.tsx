import { FC } from "react";

import { NotFound } from "@/components/NotFound/NotFound";
import { SEO, SEOProp } from "@/components/SEO/SEO";

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
      return <RoutePreviewPost domenTitle={domenTitle} id={id} />;

    default:
      return (
        <>
          <SEO domenTitle={domenTitle} title="Страница не найдена" />
          <NotFound />
        </>
      );
  }
};
