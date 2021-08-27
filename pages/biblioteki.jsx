import Library from "~/components/Pages/Library/Library";
import { SEO } from "~/components/SEO/SEO";
import { getMenu } from "~/helpers/backend";
import Layout from "~/components/UI/Layout/Layout";

const Biblioteki = ({ menu }) => (
  <Layout menu={menu}>
    <SEO title={"Библиотеки"} description={"График работы библиотек"} />
    <Library />
  </Layout>
);

export async function getStaticProps() {
  const menu = await getMenu();
  return { props: { menu, lib: "" } };
}

export default Biblioteki;
