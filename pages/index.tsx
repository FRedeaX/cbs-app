import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import {
  getMenu,
  getPosts,
  getPosters,
  getResources,
  getMetadata,
} from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { HomeLayout, HomePage } from "@/routes/Home";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { REVALIDATE } from "@/constants";

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  posts: Awaited<ReturnType<typeof getPosts>>;
  posters: Awaited<ReturnType<typeof getPosters.load>>;
  metadata: Awaited<ReturnType<typeof getMetadata>>;
  resources: Awaited<ReturnType<typeof getResources>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
    const menuData = getMenu();
    const postsData = getPosts();
    const postersData = getPosters.load().then(getPosters.filter);
    const metadataData = getMetadata();
    const resourcesData = getResources();

    const [menu, posts, posters, metadata, resources] = await Promise.all([
      menuData,
      postsData,
      postersData,
      metadataData,
      resourcesData,
    ]);

    return {
      props: {
        menu,
        metadata,
        posters,
        posts,
        resources,
      },
      revalidate: REVALIDATE.POST,
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({
  menu,
  metadata,
  posters,
  resources,
  posts,
}) => (
  <Layout menu={menu}>
    <SEO domenTitle={metadata.title} description={metadata.description} />
    <HomeLayout posters={posters} resources={resources}>
      <HomePage
        posts={posts.data}
        pagination={{ count: posts.pageCount, uri: "/post" }}
      />
    </HomeLayout>
  </Layout>
);

export default Home;
