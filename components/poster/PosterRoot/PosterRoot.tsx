import { gql } from "@apollo/client";
import { memo } from "react";

import CarouselLegacy from "../../Carusel/CarouselLegacy/Carousel.Legacy";
// import PosterGroup from "../PosterGroup/PosterGroup";
import PosterItem, { IPoster, posterItemGQL } from "../PosterItem/PosterItem";
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

// export interface IPosters {
//   posterList: Array<IPoster>;
//   skip: number;
// }

interface PosterRootProps {
  posters: Array<IPoster>;
  className?: {
    item?: string;
    list?: string;
    group?: string;
  };
}

const PosterRoot = ({ posters, className }: PosterRootProps): JSX.Element => (
  <PosterList className={className?.list}>
    <CarouselLegacy
      length={posters.length}
      // skipTo={posters.skip}
      isShadow={false}
      isScrollSnap
      itemMargin={10}
      controlsPosition="top">
      {posters.map((poster) => (
        <PosterItem
          key={poster.id}
          data={poster}
          className={className?.item}
          count={posters.length}
        />
      ))}
    </CarouselLegacy>
  </PosterList>
);

export default memo(PosterRoot);
