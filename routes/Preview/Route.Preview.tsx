import { FC } from "react";

import { NotFound } from "@/components/NotFound/NotFound";
import { SEO } from "@/components/SEO/SEO";

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
      return <RoutePreviewPost id={id} />;

    default:
      return (
        <>
          <SEO title="Страница не найдена" />
          <NotFound />
        </>
      );
  }
};
