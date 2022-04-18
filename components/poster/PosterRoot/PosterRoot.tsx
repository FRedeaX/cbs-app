import { gql } from "@apollo/client";
import { memo } from "react";
import Carousel from "../../Carusel/Carousel";
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

export interface IPosters {
  posterList: Array<IPoster>;
  skip: number;
}

interface PosterRootProps {
  posters: IPosters;
  className?: {
    item?: string;
    list?: string;
    group?: string;
  };
}

const PosterRoot = ({ posters, className }: PosterRootProps): JSX.Element => (
  <PosterList className={className?.list}>
    <Carousel
      length={posters.posterList.length}
      skipTo={posters.skip}
      // itemWidth={340}
      // itemWidth={isFront && window.innerWidth < 480 ? 280 : 440}
      isShadow={false}
      isScrollSnap
      itemMargin={10}
      controlsPosition="top">
      {posters.posterList.map((poster) => (
        <PosterItem
          key={poster.id}
          data={poster}
          className={className?.item}
          count={posters.posterList.length}
        />
      ))}
    </Carousel>
  </PosterList>
);

export default memo(PosterRoot);
