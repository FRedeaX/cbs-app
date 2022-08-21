import { captureException } from "@sentry/nextjs";

import Head from "../../components/Head/Head";
import { PageRoot } from "../../components/Pages/Page";
import { FETCH_CHILDREN_URI_PAGES } from "../../components/Pages/Page/Page.utils";
import Layout from "../../components/UI/Layout/Layout";
import СardListUngrouped from "../../components/Widget/Card/СardListUngrouped/СardListUngrouped";
import { Heading } from "../../components/blocks/Heading/Heading";
import { getMenu, getPage, preparingPaths } from "../../helpers/backend";
import { client } from "../../store/apollo-client";

const Page = ({ menu, page }) => (
  <Layout menu={menu} size="m">
    {/* {console.log(page.children.nodes)} */}
    {page.children.nodes.length > 0 ? (
      <>
        <Head title={page.title} description={page.excerpt} />
        <div style={{ margin: "2em 0 1.3em 0" }}>
          <Heading level="1">{page.title}</Heading>
        </div>
        <div style={{ margin: "0 -10px", display: "flex", flexWrap: "wrap" }}>
          <СardListUngrouped nodes={page.children.nodes} isHorizontal />
        </div>
      </>
    ) : (
      <PageRoot page={page} />
    )}
  </Layout>
);

export async function getStaticPaths() {
  const paths = await client
    .query({
      query: FETCH_CHILDREN_URI_PAGES,
      variables: { pathname: "nashi-izdaniya" },
      fetchPolicy: "network-only",
    })
    .then(({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.page.children.edges.length === 0)
        throw new Error("data.page.children.edges of null");

      return preparingPaths(
        data.page.children.edges,
        "informatsionnyie-listki",
      );
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
  const page = await getPage(`nashi-izdaniya/${params.pageSlug}`);

  if (page === null) {
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
