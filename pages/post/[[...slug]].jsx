import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Post, GET_POST_CONTENT_BY_BLOCKS } from "~/components/Pages/Post/Post";
import { SEO } from "~/components/SEO/SEO";
import { transformBlocks, getMenu } from "~/helpers/backend";
import { client } from "~/store/apollo-client";
import Layout from "../../components/UI/Layout/Layout";

const PagePost = ({ menu, post }) => {
  const { isFallback } = useRouter();
  return (
    <Layout menu={menu} loading={isFallback} size={"m"}>
      <SEO title={post?.title} description={post?.excerpt} />
      <Post
        title={post?.title}
        categories={post?.categories}
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
      slug: [post.slug],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const menu = await getMenu();
  const post = await client
    .query({
      query: GET_POST_CONTENT_BY_BLOCKS,
      variables: {
        id: params.slug[0],
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
