import { client } from "@/lib/apollo/client";
import { getMenu } from "@/core/backend";
import { exceptionLog } from "@/helpers";
import { getPage, preparingPaths } from "@/helpers/backend";
import { PageRoot } from "@/components/Pages/Page";
import { FETCH_PARENT_URI_PAGES } from "@/components/Pages/Page/Page.utils";
import Layout from "@/components/UI/Layout/Layout";

const Page = ({ menu, page }) => (
  <Layout menu={menu} size="m">
    <PageRoot page={page} />
  </Layout>
);

export async function getStaticPaths() {
  const paths = await client
    .query({ query: FETCH_PARENT_URI_PAGES })
    .then(({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.pages.edges.length === 0)
        throw new Error("data.pages.edges of null");

      return preparingPaths(data.pages.edges);
    })
    .catch((error) => {
      exceptionLog(error);
      return [];
    });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const menu = await getMenu();
  const page = await getPage(params.pageSlug);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      menu,
      page,
    },
    revalidate: parseInt(process.env.PAGE_REVALIDATE, 10),
  };
}

export default Page;
