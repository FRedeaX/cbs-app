import { captureException } from "@sentry/nextjs";

import { PageRoot } from "../../components/Pages/Page";
import { FETCH_CHILDREN_URI_PAGES } from "../../components/Pages/Page/Page.utils";
import Layout from "../../components/UI/Layout/Layout";
import { getMenu, getPage, preparingPaths } from "../../helpers/backend";
import { client } from "../../store/apollo-client";

const Page = ({ menu, page }) => (
  <Layout menu={menu} size="m">
    <PageRoot page={page} />
  </Layout>
);

export async function getStaticPaths() {
  const paths = await client
    .query({
      query: FETCH_CHILDREN_URI_PAGES,
      variables: { pathname: "nash-legendarnyj-bajkonur" },
      fetchPolicy: "network-only",
    })
    .then(({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.page.children.edges.length === 0)
        throw new Error("data.page.children.edges of null");

      return preparingPaths(data.page.children.edges);
    })
    .catch((err) => {
      captureException({ ...err, cstMessage: "FETCH_CHILDREN_URI_PAGES" });
      return [];
    });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const menu = await getMenu();
  const page = await getPage(`nash-legendarnyj-bajkonur/${params.pageSlug}`);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { menu, page },
    revalidate: parseInt(process.env.PAGE_REVALIDATE, 10),
  };
}

export default Page;
