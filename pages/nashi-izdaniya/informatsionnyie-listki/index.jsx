import Head from "../../../components/Head/Head";
import { InformatsionnyieListki } from "../../../components/Pages/InformatsionnyieListki/InformatsionnyieListki";
import { FETCH_CHILDREN_PAGE_PAGINATION } from "../../../components/Pages/Page/Page.utils";
import Layout from "../../../components/UI/Layout/Layout";
import { getLastPageNumber, paginationLoad } from "../../../core/pagination";
import { getChildrenPage, getMenu } from "../../../helpers/backend";
import { RKEY_IL } from "../../../lib/redis";

const Page = ({ menu, page, pagination }) => (
  <Layout menu={menu} size="m">
    {/* {console.log(page.children.nodes)} */}
    {page.children.nodes.length > 0 && (
      <>
        <Head title={page.title} description={page.excerpt} />
        <InformatsionnyieListki page={page} pagination={pagination} />
      </>
    )}
  </Layout>
);

export const getChildrenPageInfo = (data) => data.page.children.pageInfo;

export async function getStaticProps() {
  const menu = await getMenu();
  const page = await getChildrenPage({
    id: `nashi-izdaniya/informatsionnyie-listki`,
  });

  if (!page) {
    return {
      notFound: true,
    };
  }

  const pagination = await paginationLoad({
    key: RKEY_IL,
    query: FETCH_CHILDREN_PAGE_PAGINATION,
    id: `nashi-izdaniya/informatsionnyie-listki`,
    endCursor: page.children.pageInfo.endCursor,
    pageInfoCallback: getChildrenPageInfo,
  }).then(getLastPageNumber);

  return {
    props: {
      menu,
      page,
      pagination,
    },
    revalidate: parseInt(process.env.PAGE_REVALIDATE, 10),
  };
}

export default Page;
