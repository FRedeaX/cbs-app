import { GetServerSideProps, NextPage } from "next";

import Layout from "../../components/UI/Layout/Layout";
import { getMenu } from "../../helpers/backend";
import { TemplateSearch } from "../../template";

interface ISearchProps {
  menu: Array<object>;
}

const Search: NextPage<ISearchProps> = ({ menu }) => (
  <Layout menu={menu} paddingSides={0}>
    <TemplateSearch />
  </Layout>
);

export const getServerSideProps: GetServerSideProps<
  ISearchProps
> = async () => {
  const menu = await getMenu();

  return {
    props: {
      menu,
    },
  };
};

export default Search;
