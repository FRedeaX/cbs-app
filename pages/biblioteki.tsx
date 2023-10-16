import { Container } from "@mui/material";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { getMenu, getBiblioteki, getMetadata } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { Library } from "@/components/Pages/Library/Library";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";

type GetServerSidePropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  page: Awaited<ReturnType<typeof getBiblioteki>>;
  metadata: Awaited<ReturnType<typeof getMetadata>>;
};

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsResult
> = async () => {
  try {
    const menuData = getMenu();
    const pageData = getBiblioteki();
    const metadataData = getMetadata();

    const [menu, page, metadata] = await Promise.all([
      menuData,
      pageData,
      metadataData,
    ]);

    return {
      props: { menu, page, metadata },
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type BibliotekiProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Biblioteki: NextPage<BibliotekiProps> = ({ menu, page, metadata }) => (
  <Layout menu={menu}>
    <SEO
      domenTitle={metadata.title}
      title={page.title}
      description={page.excerpt}
    />
    <Container maxWidth="xl">
      <Library filialList={page.filialList} />
    </Container>
  </Layout>
);

export default Biblioteki;
