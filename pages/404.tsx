import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getMenu } from "@/core/ssr";
import { NotFound } from "@/components/NotFound/NotFound";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { REVALIDATE } from "@/constants";

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  const menu = await getMenu();

  return {
    props: {
      menu,
    },
    revalidate: REVALIDATE.PAGE,
  };
};

type ErrorProps = InferGetStaticPropsType<typeof getStaticProps>;

const ErrorPage: NextPage<ErrorProps> = ({ menu }) => (
  <Layout menu={menu}>
    <SEO title="Страница не найдена" />
    <NotFound />
  </Layout>
);

export default ErrorPage;
