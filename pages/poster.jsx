import { client } from "@/lib/apollo/client";
import { getMenu } from "@/core/backend";
import { exceptionLog } from "@/helpers";
import { dateConversion, sort } from "@/helpers/backend/poster";
import Head from "@/components/Head/Head";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Layout from "@/components/UI/Layout/Layout";
import { PosterItem } from "@/components/poster/PosterItem/PosterItem";
import { PosterList } from "@/components/poster/PosterList/PosterList";
import { FETCH_POSTER } from "@/components/poster/gql/posterGQL";

const Poster = ({ menu, posters }) => (
  <>
    <Head
      title="Анонс"
      description="Анонс мероприятий библиотек города Байконур"
    />
    <Layout menu={menu} size="m">
      <div style={{ marginTop: "20px" }} />
      <SectionHeader>Анонсы</SectionHeader>
      <PosterList>
        {posters.map((poster) => (
          <PosterItem key={poster.id} data={poster} />
        ))}
      </PosterList>
    </Layout>
  </>
);

export async function getStaticProps() {
  const menu = await getMenu();
  const posters = await client
    .query({
      query: FETCH_POSTER,
    })
    .then(async ({ data, error }) => {
      if (error !== undefined) throw new Error(error.message);
      if (data.posters.nodes.length === 0)
        throw new Error("data.posterts.nodes of null");

      const dateRes = await dateConversion(data.posters.nodes);
      const sortRes = await sort(dateRes);
      return sortRes;
    })
    .catch((error) => {
      exceptionLog(error);
      return null;
    });

  if (!posters) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posters,
      menu,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Poster;
