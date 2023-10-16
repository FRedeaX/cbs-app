import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { getMenu, getMetadata } from "@/core/ssr";
import { NotFound } from "@/components/NotFound/NotFound";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { REVALIDATE } from "@/constants";

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  metadata: Awaited<ReturnType<typeof getMetadata>>;
};

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  const menuData = getMenu();
  const metadataData = getMetadata();

  const [menu, metadata] = await Promise.all([menuData, metadataData]);

  return {
    props: { menu, metadata },
    revalidate: REVALIDATE.PAGE,
  };
};

type ErrorProps = InferGetStaticPropsType<typeof getStaticProps>;

const ErrorPage: NextPage<ErrorProps> = ({ menu, metadata }) => (
  <Layout menu={menu}>
    <SEO domenTitle={metadata.title} title="Страница не найдена" />
    <NotFound />
  </Layout>
);

export default ErrorPage;
