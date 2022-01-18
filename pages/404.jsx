import { useRouter } from "next/router";

import Error from "../components/Error/Error";
import SEO from "../components/SEO/SEO";
import Layout from "../components/UI/Layout/Layout";
import { getMenu } from "../helpers/backend";

export async function getStaticProps() {
  const menu = await getMenu(false);

  return {
    props: {
      menu,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

const ErrorPage = ({ menu }) => {
  const route = useRouter();
  return (
    <Layout menu={menu} paddingSides={0}>
      <SEO title="Страница не найдена" />
      <Error route={route} />
    </Layout>
  );
};

export default ErrorPage;
