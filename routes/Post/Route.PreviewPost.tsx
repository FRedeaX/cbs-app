/* eslint-disable no-console */
import { FC } from "react";

import { useGetPostQuery } from "@/core/ssr/getPost/gql/getPostGQL";
import { SEO } from "@/components/SEO/SEO";

import { TitleIntervalUpdate } from "../Preview/components/TitleIntervalUpdate/TitleIntervalUpdate";
import { useGetBlocksQuery } from "../Preview/hooks/useGetBlocksQuery";

import { RoutePost } from "./Route.Post";

type RoutePreviewPostProps = {
  id: number;
};

export const RoutePreviewPost: FC<RoutePreviewPostProps> = ({ id }) => {
  const timeNow = Date.now();

  const {
    data,
    isValidating: loading,
    error,
  } = useGetPostQuery({
    id,
    type: "DATABASE_ID",
    isPreview: true,
  });

  const blocks = useGetBlocksQuery(
    data?.post
      ? {
          url: `/api/transformBlocks`,
          body: JSON.stringify(data.post.blocks),
          method: "POST",
        }
      : null,
  );

  if (error) {
    console.error(error);
    return null;
  }
  if (!data?.post) return null;

  return (
    <>
      <TitleIntervalUpdate timeNow={timeNow} />
      <SEO
        title={loading ? "Загрузка..." : data.post.title}
        description={data.post.excerpt}
        video={blocks.data.video}
      />
      <RoutePost
        title={data.post.title}
        categories={data.post.categories.nodes}
        blocks={blocks.data.blocks}
        isPreview
      />
    </>
  );
};
