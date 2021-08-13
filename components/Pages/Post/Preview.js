import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_POST_CONTENT_BY_BLOCKS } from "./Post";
import { Post } from "~/components/Pages/Post/Post";
import { SEO } from "~/components/SEO/SEO";

export const Preview = ({ id }) => {
  const { data, loading, error } = useQuery(GET_POST_CONTENT_BY_BLOCKS, {
    variables: {
      id,
      type: "DATABASE_ID",
      isPreview: true,
    },
    fetchPolicy: "network-only",
  });
  const [blocks, setBlocks] = useState();
  useEffect(() => {
    if (data?.post?.blocks) {
      fetch(`${window.location.origin}/api/transformBlocks`, {
        method: "POST",
        body: JSON.stringify(data.post.blocks),
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          setBlocks(JSON.parse(json.data));
        });
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return null;
  }
  if (!data.post) return null;

  return (
    <>
      <SEO title={data.post?.title} description={data.post?.excerpt} />
      <Post
        title={data.post?.title}
        categories={data.post?.categories}
        blocks={blocks}
      />
    </>
  );
};
