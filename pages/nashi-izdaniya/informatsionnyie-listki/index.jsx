import { Heading } from "../../../components/blocks/Heading/Heading";
import Head from "../../../components/Head/Head";
import Layout from "../../../components/UI/Layout/Layout";
import { getMenu, getPage } from "../../../helpers/backend";
import СardListUngrouped from "../../../components/Widget/Card/СardListUngrouped/СardListUngrouped";

const Page = ({ menu, page }) => (
  <Layout menu={menu} size="m">
    {/* {console.log(page.children.nodes)} */}
    {page?.children.nodes.length > 0 && (
      <>
        <Head title={page.title} description={page.excerpt} />
        <div style={{ margin: "2em 0 1.3em 0" }}>
          <Heading level="1">{page.title}</Heading>
        </div>
        <div style={{ margin: "0 -10px", display: "flex", flexWrap: "wrap" }}>
          <СardListUngrouped nodes={page.children.nodes} isHorizontal />
        </div>
      </>
    )}
  </Layout>
);

export async function getStaticProps() {
  const menu = await getMenu();
  const page = await getPage(`nashi-izdaniya/informatsionnyie-listki`);

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
