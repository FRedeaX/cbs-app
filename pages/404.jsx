import { useRouter } from "next/router";

import { getMenu } from "@/core/backend";
import Error from "@/components/Error/Error";
import Head from "@/components/Head/Head";
import Layout from "@/components/UI/Layout/Layout";

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
      <Head title="Страница не найдена" />
      <Error route={route} />
    </Layout>
  );
};

export default ErrorPage;
