import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { searchQuery } from "@/core/elastic/search/searchQuery";
import { getMenu } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { getUAPlatform, serverSideNotFound } from "@/helpers/backend";
import { UA } from "@/helpers/backend/getUA/const";
import { RouteSearch } from "@/routes/Search";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";

type GetServerSidePropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  ssrData: Awaited<ReturnType<typeof searchQuery>>;
  platform: ReturnType<typeof getUAPlatform>;
};

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsResult
> = async (ctx) => {
  try {
    const { query, req } = ctx;
    const platform = getUAPlatform(req.headers, UA.touch);

    const menuData = getMenu();
    const ssrDataData = searchQuery(query);

    const [menu, ssrData] = await Promise.all([menuData, ssrDataData]);

    return {
      props: {
        menu,
        ssrData,
        platform,
      },
    };
  } catch (error) {
    exceptionLog(error);
    return serverSideNotFound;
  }
};

type SearchProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Search: NextPage<SearchProps> = ({ menu, ssrData, platform }) => (
  <Layout menu={menu}>
    <SEO title="Поиск" />
    <RouteSearch ssrData={ssrData} platform={platform} />
  </Layout>
);

export default Search;
