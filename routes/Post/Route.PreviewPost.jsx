/* eslint-disable no-console */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { getPostDocument } from "@/core/ssr/getPost/gql/getPostGQL";
import { SEO } from "@/components/SEO/SEO";

import { RoutePost } from "./Route.Post";

export const RoutePreviewPost = ({ id, type = "DATABASE_ID" }) => {
  const { data, loading, error } = useQuery(getPostDocument, {
    variables: {
      id,
      type,
      isPreview: true,
    },
  });

  const [post, setPost] = useState();
  useEffect(() => {
    if (data?.post?.blocks) {
      console.log(data);
      fetch(`${window.location.origin}/api/transformBlocks`, {
        method: "POST",
        body: JSON.stringify(data.post.blocks),
      })
        .then((res) => res.json())
        .then((json) => {
          const { blocks } = JSON.parse(json.data);
          console.log(blocks);
          if (blocks.length > 0) setPost({ ...data.post, blocks });
          else console.error(json);
        })
        .catch((err) => console.error(err));
    }
  }, [data]);
  console.log({ post });

  if (loading) return <div>Загрузка данных...</div>;
  if (error) {
    console.error(error);
    return null;
  }
  if (!post) return null;

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <RoutePost
        title={post.title}
        categories={post.categories.nodes}
        blocks={post.blocks}
        isPreview
      />
    </>
  );
};
