/* eslint-disable no-console */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import Head from "../../components/Head/Head";
import { GET_POST_CONTENT_BY_BLOCKS, Post } from "./Post";

const PreviewPost = ({ id, type = "DATABASE_ID" }) => {
  const { data, loading, error } = useQuery(GET_POST_CONTENT_BY_BLOCKS, {
    variables: {
      id,
      type,
      isPreview: true,
    },
    fetchPolicy: "network-only",
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
      <Head title={post.title} description={post.excerpt} />
      <Post
        title={post.title}
        categories={post.categories}
        blocks={post.blocks}
        isPreview
      />
    </>
  );
};

export default PreviewPost;
