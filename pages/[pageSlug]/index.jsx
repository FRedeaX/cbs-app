import {
  FETCH_PAGE,
  FETCH_PARENT_URI_PAGES,
  PageRoot,
} from "../../components/Pages/Page";
import Layout from "../../components/UI/Layout/Layout";
import {
  getMenu,
  preparingPaths,
  transformBlocks,
} from "../../helpers/backend";
import { client } from "../../store/apollo-client";

const Page = ({ menu, page }) => (
  <Layout menu={menu} size="m">
    <PageRoot page={page} />
  </Layout>
);

export async function getStaticPaths() {
  const paths = await client
    .query({ query: FETCH_PARENT_URI_PAGES })
    .then(({ data }) => preparingPaths(data.pages.edges));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const menu = await getMenu();
  const page = await client
    .query({
      query: FETCH_PAGE,
      variables: { id: params.pageSlug, type: "URI" },
      fetchPolicy: "network-only",
    })
    .then(({ data }) => transformBlocks(data.page));

  // const page = { ...data.page };
  // page.blocks = await transformBlocks(page.blocks);

  return {
    props: {
      menu,
      page,
    },
    revalidate: parseInt(process.env.PAGE_REVALIDATE, 10),
  };
}

export default Page;
