import { ParsedUrlQuery } from "querystring";

import {
  GetStaticPathsResult,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";

import { getMenu, getPage, getPath } from "@/core/ssr";
import { exceptionLog } from "@/helpers";
import { staticNotFound } from "@/helpers/backend";
import { RoutePage } from "@/routes/Page/Route.Page";
import { SEO } from "@/components/SEO/SEO";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE, REVALIDATE } from "@/constants";

type Path = { pageSlug: string[] };

export const getStaticPaths = async (): Promise<GetStaticPathsResult<Path>> => {
  try {
    const paths = await getPath();

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    exceptionLog(error);
    return { paths: [], fallback: "blocking" };
  }
};

type GetStaticPropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  page: Awaited<ReturnType<typeof getPage>>;
};

interface Params extends ParsedUrlQuery {
  pageSlug: string[];
}

export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  Params
> = async ({ params }) => {
  try {
    if (params === undefined) {
      throw new Error(ERROR_MESSAGE.PAGE_PARAMS_UNDEFINED);
    }

    const { pageSlug } = params;
    if (pageSlug.length === 0) {
      throw new Error(ERROR_MESSAGE.URL_IS_UNDEFINED);
    }

    const menuData = getMenu();
    const pageData = getPage(pageSlug);

    const [menu, page] = await Promise.all([menuData, pageData]);

    return {
      props: {
        menu,
        page,
      },
      revalidate: REVALIDATE.PAGE,
    };
  } catch (error) {
    exceptionLog(error);
    return staticNotFound;
  }
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ menu, page }) => (
  <Layout menu={menu}>
    <SEO
      title={page.data.title}
      description={page.data.excerpt}
      video={page.data.video}
    />
    <RoutePage
      page={{
        title: page.data.title,
        href: page.data.link,
        blocks: page.data.blocks,
      }}
      childrenPage={page.children}
      pagination={page.pagination}
      pageNumber={page.pageNumber ?? undefined}
    />
  </Layout>
);

export default Page;
