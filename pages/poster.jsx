import PosterItem from "~/components/poster/PosterItem/PosterItem";
import PosterList from "~/components/poster/PosterList/PosterList";
import { FETCH_POSTER } from "~/components/poster/PosterRoot/PosterRoot";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import { SEO } from "~/components/SEO/SEO";
import Layout from "~/components/UI/Layout/Layout";
import { client } from "~/store/apollo-client";
import { getMenu } from "~/helpers/backend";

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
            <PosterItem data={poster} />
          ))}
        </PosterList>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const menu = await getMenu();
  const { data: _posters } = await client.query({
    query: FETCH_POSTER,
    fetchPolicy: "network-only",
  });
  // const posters = postersFilter(_posters.posters.nodes);

  return {
    props: {
      posters: _posters.posters.nodes,
      menu,
    },
    revalidate: parseInt(process.env.POST_REVALIDATE, 10),
  };
}

export default Poster;
