import { ParsedUrlQuery } from "querystring";

import { gql } from "@apollo/client";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

import { client } from "@/lib/apollo/client";
import { getMenu } from "@/core/backend";
import { transformBlocks } from "@/core/backend/transformBlocks";
import { exceptionLog } from "@/helpers";
import { sortingCategories, staticNotFound } from "@/helpers/backend";
import { GET_POST_CONTENT_BY_BLOCKS, Post } from "@/routes/Post/Post";
import Head from "@/components/Head/Head";
import Layout from "@/components/UI/Layout/Layout";

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
    })
    .then(({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.posts.nodes.length === 0)
        throw new Error(`
          function: getStaticPaths, 
          message: data.posts.nodes of null
        `);

      return data.posts.nodes.map((post: any) => ({
        params: {
          slug: post.slug,
          // slug: [post.slug],
        },
      }));
    })
    .catch((error) => {
      exceptionLog(error);
      return [];
    });

  return {
    paths,
    fallback: "blocking",
  };
}

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  post: any;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (typeof params?.slug !== "string") {
      throw new Error("params page is not string");
    }

    const menu = await getMenu();
    const post = await client
      .query({
        query: GET_POST_CONTENT_BY_BLOCKS,
        variables: {
          id: params.slug, // params.slug[0],
          type: "SLUG",
        },
      })
      // .then(({ data }) => transformBlocks(data.post))
      .then(async ({ data, error }) => {
        if (error !== undefined) throw error;
        if (data.post === null) throw new Error("data.page of null");

        return {
          ...data.post,
          ...(await transformBlocks(data.post.blocks)),
          categories: {
            nodes: await sortingCategories([...data.post.categories.nodes]),
          },
        };
      })
      .catch((error) => {
        throw error;
      });

    return {
      props: {
        menu,
        post,
      },
      revalidate: parseInt(process.env.POST_REVALIDATE ?? "60", 10),
    };
  } catch (error) {
    return staticNotFound;
  }
};

type PagePostProps = InferGetStaticPropsType<typeof getStaticProps>;

const PagePost: NextPage<PagePostProps> = ({ menu, post }) => {
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

export default PagePost;
