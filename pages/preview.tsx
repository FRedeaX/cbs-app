import { ParsedUrlQuery } from "querystring";

import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import dynamic from "next/dynamic";

import { getMenu, getMetadata } from "@/core/ssr";
import { Layout } from "@/components/UI/Layout/Layout";
import { ERROR_MESSAGE } from "@/constants";

type PreviewType = "page" | "post" | "poster";
const previewType: string[] = ["page", "post", "poster"];

type GetServerSidePropsResult = {
  menu: Awaited<ReturnType<typeof getMenu>>;
  metadata: Awaited<ReturnType<typeof getMetadata>>;
  id: number;
  type: PreviewType;
};

interface Params extends ParsedUrlQuery {
  type: PreviewType;
  p: string;
}

export const getServerSideProps: GetServerSideProps<
  GetServerSidePropsResult,
  Params
> = async ({ query }) => {
  const { type, p } = query;
  if (typeof type !== "string" || !previewType.includes(type)) {
    throw new Error(`type ${ERROR_MESSAGE.IS_NOT_STRING}`);
  }
  if (typeof p !== "string") {
    throw new Error(`p ${ERROR_MESSAGE.IS_NOT_STRING}`);
  }

  const previewID = parseInt(p, 10);
  if (Number.isNaN(previewID)) {
    throw new Error(`previewID ${ERROR_MESSAGE.IS_NOT_NUMBER}`);
  }

  const menuData = getMenu();
  const metadataData = getMetadata();

  const [menu, metadata] = await Promise.all([menuData, metadataData]);

  return {
    props: {
      menu,
      metadata,
      id: previewID,
      type: type as PreviewType,
    },
  };
};

const PreviewRender = dynamic(
  () =>
    import("../routes/Preview/Route.Preview").then((res) => res.RoutePreview),
  {
    ssr: false,
    loading: () => <>Загрузка компонента...</>,
  },
);

type PreviewProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Preview: NextPage<PreviewProps> = ({ menu, metadata, id, type }) => (
  <Layout menu={menu}>
    <PreviewRender id={id} type={type} domenTitle={metadata.title} />
  </Layout>
);

export default Preview;
