import { ParsedUrlQuery } from "querystring";

import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";

import { RKEY_IL } from "@/lib/redis";
import { getChildrenPage, getMenu, pagination } from "@/core/backend";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import Head from "@/components/Head/Head";
import { InformatsionnyieListki } from "@/components/Pages/InformatsionnyieListki/InformatsionnyieListki";
import Layout from "@/components/UI/Layout/Layout";

import { getChildrenPageInfo } from "..";

export const getStaticPaths = () => ({
  paths: [{ params: { page: "2" } }],
  fallback: "blocking",
});

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  page: Awaited<ReturnType<typeof getChildrenPage>>;
  pageNumber: number;
  lastPageNumber: ReturnType<typeof pagination.getLastPageNumber>;
};

interface Params extends ParsedUrlQuery {
  page: string;
}

type PaginationData = pagination.gql.ChildrenPagePaginationGQL;

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (typeof params?.page !== "string") {
      throw new Error("params page is not string");
    }

    const pageNumber = parseInt(params.page, 10);
    if (Number.isNaN(pageNumber)) {
      throw new Error("pageNumber is NaN");
    }

    const menu = await getMenu();
    const paginationList = await pagination.load<PaginationData>({
      key: RKEY_IL,
      query: pagination.gql.CHILDREN_PAGE_PAGINATION,
      id: `nashi-izdaniya/informatsionnyie-listki`,
      pageInfoCallback: getChildrenPageInfo,
    });

    const carrentPage = paginationList[pageNumber - 1];
    if (carrentPage === undefined) {
      throw new Error("carrentPage of undefined");
    }

    const page = await getChildrenPage({
      id: `nashi-izdaniya/informatsionnyie-listki`,
      cursor: carrentPage.cursor,
      first: 20,
    });

    return {
      props: {
        menu,
        page,
        pageNumber,
        lastPageNumber: pagination.getLastPageNumber(paginationList),
      },
      revalidate: parseInt(process.env.PAGE_REVALIDATE ?? "60", 10),
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({
  menu,
  page,
  pageNumber,
  lastPageNumber,
}) => (
  <Layout menu={menu} size="m">
    {page.children.nodes.length > 0 && (
      <>
        <Head
          title={`${page.title} — Cтраница ${pageNumber}`}
          description={page.excerpt}
        />
        <InformatsionnyieListki
          page={page}
          pageNumber={pageNumber}
          pagination={lastPageNumber}
        />
      </>
    )}
  </Layout>
);

export default Page;
