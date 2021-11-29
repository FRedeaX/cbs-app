import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_POST_CONTENT_BY_BLOCKS } from "./Post";
import { Post } from "~/components/Pages/Post/Post";
import { SEO } from "~/components/SEO/SEO";

export const PreviewPost = ({ id, type = "DATABASE_ID" }) => {
  console.log({ id, type });
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
        body: JSON.stringify(data.post),
      })
        .then((res) => res.json())
        .then((json) => {
          if (JSON.parse(json.data)) setPost(JSON.parse(json.data));
          else console.error(json);
        })
        .catch((error) => console.error(error));
    }
  }, [data]);
  console.log(post);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error(error);
    return null;
  }
  if (!post) return null;

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <Post
        title={post.title}
        categories={post.categories}
        blocks={post.blocks}
      />
    </>
  );
};
