import { FC } from "react";

import { NotFound } from "@/components/NotFound/NotFound";
import { SEO } from "@/components/SEO/SEO";

import { RoutePreviewPage } from "../Page/Route.PreviewPage";
import { RoutePreviewPost } from "../Post/Route.PreviewPost";

type PreviewProps = {
  id: number;
  type: "page" | "post" | "poster";
  domenTitle: string;
};

export const RoutePreview: FC<PreviewProps> = ({ id, type, domenTitle }) => {
  switch (type) {
    case "page":
      return <RoutePreviewPage id={id} domenTitle={domenTitle} />;

    case "post":
      return <RoutePreviewPost id={id} domenTitle={domenTitle} />;

    default:
      return (
        <>
          <SEO domenTitle={domenTitle} title="Страница не найдена" />
          <NotFound />
        </>
      );
  }
};
