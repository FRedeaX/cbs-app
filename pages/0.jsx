import dynamic from "next/dynamic";

import Layout from "../components/UI/Layout/Layout";
import { getMenu } from "../helpers/backend";

const PreviewRender = dynamic(
  () =>
    import("../components/Pages/Preview/Preview").then((res) => res.Preview),
  {
    ssr: false,
    loading: () => "Загрузка компонента...",
  },
);

const Preview = ({ menu, id, isPage }) => (
  <Layout menu={menu} size="m">
    <PreviewRender id={id} isPage={isPage} />
  </Layout>
);

export async function getServerSideProps({ query }) {
  const menu = await getMenu();
  return {
    props: {
      menu,
      id: query.preview_id || query.p || query.page_id,
      isPage: !!query.page_id,
    },
  };
}

export default Preview;
