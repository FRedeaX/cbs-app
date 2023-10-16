/* eslint-disable no-console */
import { FC } from "react";

import { useGetPostQuery } from "@/core/ssr/getPost/gql/getPostGQL";
import { SEO } from "@/components/SEO/SEO";

import { TitleIntervalUpdate } from "../Preview/components/TitleIntervalUpdate/TitleIntervalUpdate";
import { useGetBlocksQuery } from "../Preview/hooks/useGetBlocksQuery";

import { RoutePost } from "./Route.Post";

type RoutePreviewPostProps = {
  id: number;
  domenTitle: string;
};

export const RoutePreviewPost: FC<RoutePreviewPostProps> = ({
  id,
  domenTitle,
}) => {
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

  if (blocks.error) {
    console.error(blocks.error);
  }

  if (error) {
    console.error(error);
    return <>Ошибка в загрузке данных.</>;
  }

  if (!data?.post) return null;

  return (
    <>
      <TitleIntervalUpdate domenTitle={domenTitle} timeNow={timeNow} />
      <SEO
        domenTitle={domenTitle}
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
      {blocks.error && <>Ошибка в обработке блоков: {blocks.error?.message}.</>}
    </>
  );
};
