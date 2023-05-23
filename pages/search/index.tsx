import { GetServerSideProps, NextPage } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { getMenu } from "@/core/backend";
import { searchQuery } from "@/core/elastic/search/searchQuery";
import { exceptionLog } from "@/helpers";
import { getUAPlatform } from "@/helpers/backend";
import { UA } from "@/helpers/backend/getUA/const";
import { RouteSearch, RouteSearchProps } from "@/routes/Search";
import Head from "@/components/Head/Head";
import Layout from "@/components/UI/Layout/Layout";

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

  let errData = null;
  const ssrData = await searchQuery(query).catch((err) => {
    const error = err as ApiError;
    errData = error.message;

    exceptionLog(errData);
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
