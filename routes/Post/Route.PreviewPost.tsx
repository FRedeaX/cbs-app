"use client";

/* eslint-disable no-console */
import { FC, useEffect } from "react";

import { useGetPostQuery } from "@/core/ssr/getPost/gql/useGetPostQuery";

import { useGetBlocksQuery } from "../Preview/hooks/useGetBlocksQuery";
import { useTitleIntervalUpdate } from "../Preview/hooks/useTitleIntervalUpdate";

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

  useTitleIntervalUpdate({ timeNow, loading });
  useEffect(() => {
    if (loading) document.title = "Загрузка... | Предварительный просмотр";
  }, [loading]);

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
