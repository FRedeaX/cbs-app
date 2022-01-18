import { captureException } from "@sentry/nextjs";

import SEO from "../components/SEO/SEO";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import Layout from "../components/UI/Layout/Layout";
import PosterItem from "../components/poster/PosterItem/PosterItem";
import PosterList from "../components/poster/PosterList/PosterList";
import { FETCH_POSTER } from "../components/poster/PosterRoot/PosterRoot";
import { getMenu } from "../helpers/backend";
import { dateConversion, sort } from "../helpers/backend/poster";
import { client } from "../store/apollo-client";

const Poster = ({ menu, posters }) => (
  <>
    <SEO
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
      fetchPolicy: "network-only",
    })
    .then(({ data }) =>
      dateConversion(data.posters.nodes).then((dateRes) =>
        sort(dateRes).then((sortRes) => sortRes),
      ),
    )
    .catch((err) => {
      captureException(err, "FETCH_POSTER");
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
