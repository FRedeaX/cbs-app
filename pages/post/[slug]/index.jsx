import { gql } from "@apollo/client";
import { captureException } from "@sentry/nextjs";
import { useRouter } from "next/router";

import Head from "../../../components/Head/Head";
import Layout from "../../../components/UI/Layout/Layout";
import {
  getMenu,
  sortingCategories,
  transformBlocks,
} from "../../../helpers/backend";
import { GET_POST_CONTENT_BY_BLOCKS, Post } from "../../../routers/Post/Post";
import { client } from "../../../store/apollo-client";

const PagePost = ({ menu, post }) => {
  // console.log(post);
  const { isFallback } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} size="m">
      <Head
        title={post?.title}
        description={post?.excerpt}
        image={post?.featuredImage?.node?.sourceUrl}
        video={post?.video}
        url={post?.uri}
      />
      <Post
        id={post?.id}
        href={post?.link}
        title={post?.title}
        blocks={post?.blocks}
        categories={post?.categories}
        image={post?.featuredImage?.node?.sourceUrl}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await client
    .query({
      query: gql`
        query articlesQuery {
          posts {
            nodes {
              slug
            }
          }
        }
      `,
      fetchPolicy: "network-only",
    })
    .then(({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.posts.nodes.length === 0)
        throw new Error("data.posts.nodes of null");

      return data.posts.nodes.map((post) => ({
        params: {
          slug: post.slug,
          // slug: [post.slug],
        },
      }));
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "articlesQuery" });
      return [];
    });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const menu = await getMenu();
  const post = await client
    .query({
      query: GET_POST_CONTENT_BY_BLOCKS,
      variables: {
        id: params.slug, // params.slug[0],
        type: "SLUG",
      },
      fetchPolicy: "network-only",
    })
    // .then(({ data }) => transformBlocks(data.post))
    .then(async ({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.post === null) throw new Error("data.posts of null");

      return {
        ...data.post,
        ...(await transformBlocks(data.post.blocks)),
        categories: {
          nodes: await sortingCategories([...data.post.categories.nodes]),
        },
      };
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "GET_POST_CONTENT_BY_BLOCKS" });
      return null;
    });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menu,
      post,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default PagePost;
