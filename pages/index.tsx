import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getMenu, getPosts, getPosters, getResources } from "@/core/ssr";
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
  resources: Awaited<ReturnType<typeof getResources>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
    const menuData = getMenu();
    const postsData = getPosts();
    const postersData = getPosters.load().then(getPosters.filter);
    const resourcesData = getResources();

    const [menu, posts, posters, resources] = await Promise.all([
      menuData,
      postsData,
      postersData,
      resourcesData,
    ]);

    return {
      props: {
        menu,
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

const Home: NextPage<HomeProps> = ({ menu, posters, resources, posts }) => (
  <Layout menu={menu}>
    <SEO description="Новости, анонсы, мероприятия, книжные новинки библиотек города Байконур" />
    <HomeLayout posters={posters} resources={resources}>
      <HomePage
        posts={posts.data}
        pagination={{ count: posts.pageCount, uri: "/post" }}
      />
    </HomeLayout>
  </Layout>
);

export default Home;
