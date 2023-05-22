import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import Head from "../../../components/Head/Head";
import { InformatsionnyieListki } from "../../../components/Pages/InformatsionnyieListki/InformatsionnyieListki";
import Layout from "../../../components/UI/Layout/Layout";
import { getChildrenPage, getMenu, pagination } from "../../../core/backend";
import { exceptionLog } from "../../../helpers";
import { staticNotFound } from "../../../helpers/backend";
import { RKEY_IL } from "../../../lib/redis";

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  page: Awaited<ReturnType<typeof getChildrenPage>>;
  lastPageNumber: ReturnType<typeof pagination.getLastPageNumber>;
};

type PaginationData = pagination.gql.ChildrenPagePaginationGQL;

export const getChildrenPageInfo = (data: PaginationData) =>
  data.page.children.pageInfo;

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  try {
    const menu = await getMenu();
    const page = await getChildrenPage({
      id: `nashi-izdaniya/informatsionnyie-listki`,
    });

    const lastPageNumber = await pagination
      .load<PaginationData>({
        key: RKEY_IL,
        query: pagination.gql.CHILDREN_PAGE_PAGINATION,
        id: `nashi-izdaniya/informatsionnyie-listki`,
        endCursor: page.children.pageInfo.endCursor,
        pageInfoCallback: getChildrenPageInfo,
      })
      .then(pagination.getLastPageNumber);

    return {
      props: {
        menu,
        page,
        lastPageNumber,
      },
      revalidate: parseInt(process.env.PAGE_REVALIDATE ?? "60", 10),
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ menu, page, lastPageNumber }) => (
  <Layout menu={menu} size="m">
    {page.children.nodes.length > 0 && (
      <>
        <Head title={page.title} description={page.excerpt} />
        <InformatsionnyieListki page={page} pagination={lastPageNumber} />
      </>
    )}
  </Layout>
);

export default Page;
