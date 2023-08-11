import { ParsedUrlQuery } from "querystring";

import {
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import { getMenu, getPathsToPosts, getPost } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { RoutePost } from "@/routes/Post/Route.Post";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE, REVALIDATE } from "@/constants";

type Path = { slug: string };

export const getStaticPaths = async (): Promise<GetStaticPathsResult<Path>> => {
  try {
    const paths = await getPathsToPosts();

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    exceptionLog(error);
    return { paths: [], fallback: "blocking" };
  }
};

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  post: Awaited<ReturnType<typeof getPost>>;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (params === undefined) {
      throw new Error(ERROR_MESSAGE.PAGE_PARAMS_UNDEFINED);
    }
    const { slug } = params;

    const menuData = getMenu();
    const postData = getPost({ slug });
    const [menu, post] = await Promise.all([menuData, postData]);

    return {
      props: {
        menu,
        post,
      },
      revalidate: REVALIDATE.POST,
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type PostPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const PostPage: NextPage<PostPageProps> = ({ menu, post }) => (
  <Layout menu={menu}>
    <SEO
      title={post.title}
      description={post.excerpt}
      image={post.featuredImage?.node.sourceUrl}
      video={post.video}
      url={post.uri}
    />
    <RoutePost
      id={post.id}
      href={post.link}
      title={post.title}
      blocks={post.blocks}
      categories={post.categories.nodes}
      imageUrl={post.featuredImage?.node.sourceUrl}
    />
  </Layout>
);

export default PostPage;
