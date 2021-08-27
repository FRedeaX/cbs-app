import { gql } from "@apollo/client";
import { memo } from "react";
import Carousel from "~/components/Carusel/Carousel";
// import PosterGroup from "../PosterGroup/PosterGroup";
import PosterItem, { posterItemGQL } from "../PosterItem/PosterItem";
import PosterList from "../PosterList/PosterList";

export const FETCH_POSTER = gql`
  query FetchPoster {
    posters(first: 20) {
      nodes {
        ...posterItem
      }
    }
  }
  ${posterItemGQL.fragments}
`;

const PosterRoot = ({ posters, className }) => {
  const RenderPoster = () =>
    posters.map((poster) => (
      // <PosterGroup key={poster[0].id} className={className.group}>
      <PosterItem
        key={poster.id}
        data={poster}
        className={className.item}
        count={posters.length}
      />
      //   {poster[1] !== undefined && (
      //     <PosterItem data={poster[1]} className={className.item} />
      //   )}
      // </PosterGroup>
    ));

  // console.log(windowWidthVar());
  return (
    <>
      <PosterList className={className.list}>
        <Carousel
          length={posters.length}
          // itemWidth={340}
          // itemWidth={isFront && window.innerWidth < 480 ? 280 : 440}
          isShadow={false}
          isScrollSnap={true}
          itemMargin={10}
          controlsPosition="top"
          classNameControl={className.control}
        >
          <RenderPoster />
        </Carousel>
      </PosterList>
    </>
  );
};

export default memo(PosterRoot);
