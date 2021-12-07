import Library from "~/components/Pages/Library/Library";
import { SEO } from "~/components/SEO/SEO";
import { getMenu } from "~/helpers/backend";
import { filials } from "~/helpers/backend/biblioteki";
import Layout from "~/components/UI/Layout/Layout";

const Biblioteki = ({ menu, filials }) => (
  <Layout menu={menu}>
    <SEO title={"Библиотеки"} description={"График работы библиотек"} />
    <Library filials={filials} />
  </Layout>
);

export async function getServerSideProps() {
  const menu = await getMenu();
  return { props: { menu, filials } };
}

export default Biblioteki;
