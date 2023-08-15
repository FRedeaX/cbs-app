import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getMenu, getPosters } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { RoutePoster } from "@/routes/Poster/Route.Poster";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE, REVALIDATE } from "@/constants";

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  posters: NonNullable<Awaited<ReturnType<typeof getPosters.load>>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
    const menuData = await getMenu();
    const postersData = await getPosters.load();

    const [menu, posters] = await Promise.all([menuData, postersData]);

    if (posters === null) {
      throw new Error(ERROR_MESSAGE.DATA_OF_NULL);
    }

    return {
      props: {
        menu,
        posters,
      },
      revalidate: REVALIDATE.PAGE,
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type PosterProps = InferGetStaticPropsType<typeof getStaticProps>;

const Poster: NextPage<PosterProps> = ({ menu, posters }) => (
  <Layout menu={menu}>
    <SEO
      title="Анонсы"
      description="Анонс мероприятий библиотек города Байконур"
    />
    <RoutePoster posters={posters} />
  </Layout>
);

export default Poster;
