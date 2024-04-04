"use client";

/* eslint-disable no-console */
import { FC, useEffect } from "react";

import { useGetPageQuery } from "@/core/ssr/getPage/gql/useGetPageQuery";

import { useGetBlocksQuery } from "../Preview/hooks/useGetBlocksQuery";
import { useTitleIntervalUpdate } from "../Preview/hooks/useTitleIntervalUpdate";

import { RoutePage } from "./Route.Page";

type RoutePreviewPageProps = {
  id: number;
};

export const RoutePreviewPage: FC<RoutePreviewPageProps> = ({ id }) => {
  const timeNow = Date.now();

  const {
    data,
    isValidating: loading,
    error,
  } = useGetPageQuery({
    id,
    idType: "DATABASE_ID",
    isPreview: true,
  });

  const blocks = useGetBlocksQuery(
    data?.page
      ? {
          url: `/api/transformBlocks`,
          body: JSON.stringify(data.page.blocks),
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

  if (!data?.page) return null;

  const childrenPage = data.page.children.nodes.length
    ? data.page.children
    : null;

  return (
    <>
      <RoutePage
        page={{
          title: data.page.title,
          blocks: blocks.data.blocks,
          isPreview: true,
        }}
        childrenPage={childrenPage}
      />
      {blocks.error && <>Ошибка в обработке блоков: {blocks.error?.message}.</>}
    </>
  );
};
