import { GetServerSideProps, NextPage } from "next";

import Head from "../../components/Head/Head";
import Layout from "../../components/UI/Layout/Layout";
import { searchQuery } from "../../core/elastic/search/searchQuery";
import { exceptionLog } from "../../helpers";
import { getMenu, getUAPlatform } from "../../helpers/backend";
import { UA } from "../../helpers/backend/getUA/const";
import { RouteSearch, RouteSearchProps } from "../../routes";

type ISearchProps = {
  menu: Array<object>;
} & RouteSearchProps;

const Search: NextPage<ISearchProps> = ({ menu, ssrData, platform }) => (
  <Layout menu={menu} paddingSides={0}>
    <Head title="Поиск" />
    <RouteSearch ssrData={ssrData} platform={platform} />
  </Layout>
);

export const getServerSideProps: GetServerSideProps<ISearchProps> = async (
  ctx,
) => {
  const { query, req } = ctx;
  const platform = getUAPlatform(req.headers, UA.touch);

  const menu = await getMenu();

  const ssrData = await searchQuery(query).catch((error) => {
    exceptionLog(error);
    return null;
  });

  if (ssrData === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menu,
      ssrData,
      platform,
    },
  };
};

export default Search;
