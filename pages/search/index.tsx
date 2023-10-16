import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { searchQuery } from "@/core/elastic/search/searchQuery";
import { getMenu, getMetadata } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { getUAPlatform, serverSideNotFound } from "@/helpers/backend";
import { UA } from "@/helpers/backend/getUA/const";
import { RouteSearch } from "@/routes/Search";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";

type GetServerSidePropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  ssrData: Awaited<ReturnType<typeof searchQuery>>;
  metadata: Awaited<ReturnType<typeof getMetadata>>;
  platform: ReturnType<typeof getUAPlatform>;
};

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsResult
> = async (ctx) => {
  try {
    const { query, req } = ctx;
    const platform = getUAPlatform(req.headers, UA.touch);

    const menuData = getMenu();
    const metadataData = getMetadata();
    const ssrDataData = searchQuery(query);

    const [menu, ssrData, metadata] = await Promise.all([
      menuData,
      ssrDataData,
      metadataData,
    ]);

    return {
      props: {
        menu,
        ssrData,
        metadata,
        platform,
      },
    };
  } catch (error) {
    exceptionLog(error);
    return serverSideNotFound;
  }
};

type SearchProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Search: NextPage<SearchProps> = ({
  menu,
  ssrData,
  metadata,
  platform,
}) => (
  <Layout menu={menu}>
    <SEO domenTitle={metadata.title} title="Поиск" />
    <RouteSearch ssrData={ssrData} platform={platform} />
  </Layout>
);

export default Search;
