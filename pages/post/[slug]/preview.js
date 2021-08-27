import { Preview as PreviewRender } from "~/components/Pages/Preview/Preview";
import Layout from "~/components/UI/Layout/Layout";
import { getMenu } from "~/helpers/backend";

const Preview = ({ menu, id, type, isPage }) => (
  <Layout menu={menu} size={"m"}>
    <PreviewRender id={id} isPage={isPage} type={type} />
  </Layout>
);

export async function getServerSideProps({ query }) {
  console.log(query);
  const menu = await getMenu();
  return {
    props: {
      menu,
      id: query.preview_id || query.p || query.slug,
      type: !!query.preview_id || !!query.p ? "DATABASE_ID" : "SLUG",
      isPage: false,
    },
  };
}

export default Preview;
