import Head from "../components/Head/Head";
import { FETCH_LIBRARY, Library } from "../components/Pages/Library/Library";
import Layout from "../components/UI/Layout/Layout";
import { exceptionLog } from "../helpers";
import { getMenu } from "../helpers/backend";
import transformObject from "../helpers/backend/biblioteki";
import { client } from "../store/apollo-client";

const Biblioteki = ({ menu, page }) => (
  <Layout menu={menu}>
    <Head title={page.title} description={page.excerpt} />
    <Library filialList={page.children.nodes} />
  </Layout>
);

export async function getServerSideProps() {
  const menu = await getMenu();

  const page = await client
    .query({
      query: FETCH_LIBRARY,
      variables: {
        id: "grafik-raboty-bibliotek",
      },
      fetchPolicy: "network-only",
    })
    .then(async ({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.page === null) throw new Error("data.page of null");

      return await transformObject(data.page);
    })
    .catch((error) => {
      exceptionLog(error);
      return null;
    });

  if (page === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { menu, page },
    // revalidate: parseInt(process.env.PAGE_REVALIDATE || "60", 10),
  };
}

export default Biblioteki;
