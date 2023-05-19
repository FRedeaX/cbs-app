import { GetStaticProps, NextPage } from "next";

import { getChildrenPageInfo } from "..";
import Head from "../../../../components/Head/Head";
import {
  InformatsionnyieListki,
  InformatsionnyieListkiPage,
} from "../../../../components/Pages/InformatsionnyieListki/InformatsionnyieListki";
import { FETCH_CHILDREN_PAGE_PAGINATION } from "../../../../components/Pages/Page/Page.utils";
import Layout from "../../../../components/UI/Layout/Layout";
import { getLastPageNumber, paginationLoad } from "../../../../core/pagination";
import {
  getChildrenPage,
  getMenu,
  staticNotFound,
} from "../../../../helpers/backend";
import { RKEY_IL } from "../../../../lib/redis";

interface IProps {
  menu: Array<object>;
  page: InformatsionnyieListkiPage;
  pageNumber: number;
  pagination: number;
}

const Page: NextPage<IProps> = ({
  menu,
  page,
  pageNumber,
  pagination,
}: IProps) => (
  <Layout menu={menu} size="m">
    {page.children.nodes.length > 0 && (
      <>
        <Head
          title={`${page.title} — Страница ${pageNumber}`}
          description={page.excerpt}
        />
        <InformatsionnyieListki
          page={page}
          pageNumber={pageNumber}
          pagination={pagination}
        />
      </>
    )}
  </Layout>
);

export const getStaticPaths = () => ({
  paths: [{ params: { page: "2" } }],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps = async ({
  params: { page: pageNumber },
}) => {
  const menu = await getMenu();
  const pagesInfo = await paginationLoad<InformatsionnyieListkiPage>({
    key: RKEY_IL,
    query: FETCH_CHILDREN_PAGE_PAGINATION,
    id: `nashi-izdaniya/informatsionnyie-listki`,
    pageInfoCallback: getChildrenPageInfo,
  });

  const carrentPage = pagesInfo[pageNumber - 1];
  if (carrentPage === undefined) return staticNotFound;

  const page = await getChildrenPage({
    id: `nashi-izdaniya/informatsionnyie-listki`,
    cursor: carrentPage.cursor,
    first: 20,
  });

  if (!page) return staticNotFound;

  return {
    props: {
      menu,
      page,
      pageNumber,
      pagination: getLastPageNumber(pagesInfo),
    },
    revalidate: parseInt(process.env.PAGE_REVALIDATE || "60", 10),
  };
};

export default Page;
