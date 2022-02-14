import Head from "../components/Head/Head";
import Library from "../components/Pages/Library/Library";
import Layout from "../components/UI/Layout/Layout";
import { getMenu } from "../helpers/backend";
import filialList from "../helpers/backend/biblioteki";

const Biblioteki = ({ menu, filials }) => (
  <Layout menu={menu}>
    <Head title="Библиотеки" description="График работы библиотек" />
    <Library filials={filials} />
  </Layout>
);

export async function getServerSideProps() {
  const menu = await getMenu();
  return { props: { menu, filials: filialList } };
}

export default Biblioteki;
