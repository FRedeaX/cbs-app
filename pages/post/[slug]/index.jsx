import { gql } from "@apollo/client";
import { useRouter } from "next/router";

import {
  GET_POST_CONTENT_BY_BLOCKS,
  Post,
} from "../../../components/Pages/Post/Post";
import SEO from "../../../components/SEO/SEO";
import Layout from "../../../components/UI/Layout/Layout";
import { getMenu, transformBlocks } from "../../../helpers/backend";
import { client } from "../../../store/apollo-client";

const PagePost = ({ menu, post }) => {
  const { isFallback } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} size="m">
      <SEO
        title={post?.title}
        description={post?.excerpt}
        image={post?.featuredImage?.node?.sourceUrl}
        video={post?.video}
        url={post?.link}
      />
      <Post
        title={post?.title}
        categories={post?.categories}
        href={post?.link}
        image={post?.featuredImage?.node?.sourceUrl}
        blocks={post?.blocks}
      />
    </Layout>
  );
};

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query articlesQuery {
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  const paths = data.posts.nodes.map((post) => ({
    params: {
      slug: post.slug,
      // slug: [post.slug],
    },
  }));

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
    .then(({ data }) => transformBlocks(data.post));

  if (!post) {
    return {
      notFound: true,
    };
  }

  // const post = await transformBlocks(data.post);

  return {
    props: {
      menu,
      post,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default PagePost;
