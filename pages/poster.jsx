import PosterItem from "~/components/poster/PosterItem/PosterItem";
import PosterList from "~/components/poster/PosterList/PosterList";
import { FETCH_POSTER } from "~/components/poster/PosterRoot/PosterRoot";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import { SEO } from "~/components/SEO/SEO";
import Layout from "~/components/UI/Layout/Layout";
import { client } from "~/store/apollo-client";
import { getMenu } from "~/helpers/backend";
import { dateConversion, sort } from "~/helpers/backend/poster";

const Poster = ({ menu, posters }) => {
  return (
    <>
      <SEO
        title="Анонс"
        description="Анонс мероприятий библиотек города Байконур"
      />
      <Layout menu={menu} size={"m"}>
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
};

export async function getStaticProps() {
  const menu = await getMenu();
  const posters = await client
    .query({
      query: FETCH_POSTER,
      fetchPolicy: "network-only",
    })
    .then(({ data }) =>
      dateConversion(data.posters.nodes).then((posters) =>
        sort(posters).then((posters) => posters)
      )
    );

  return {
    props: {
      posters,
      menu,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Poster;
