import {
  FETCH_CHILDREN_URI_PAGES,
  FETCH_PAGE,
  PageRoot,
} from "~/components/Pages/Page";
import { transformBlocks, preparingPaths, getMenu } from "~/helpers/backend";
import { client } from "~/store/apollo-client";
import Layout from "../../../../components/UI/Layout/Layout";

const Page = ({ menu, page }) => (
  <Layout menu={menu} size={"m"}>
    <PageRoot page={page} />
  </Layout>
);

export async function getStaticPaths() {
  const paths = await client
    .query({
      query: FETCH_CHILDREN_URI_PAGES,
      variables: { pathname: "o-nas/my-v-pechati/gazeta-baykonur" },
    })
    .then(({ data }) => preparingPaths(data.page.children.edges));

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
      variables: {
        pathname: `o-nas/my-v-pechati/gazeta-baykonur/${params.pageSlag}`,
      },
      fetchPolicy: "network-only",
    })
    .then(({ data }) => transformBlocks(data.page));

  return {
    props: {
      menu,
      page,
    },
    revalidate: parseInt(process.env.PAGE_REVALIDATE, 10),
  };
}

export default Page;
