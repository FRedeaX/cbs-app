import { gql } from "@apollo/client";
import { FC, memo } from "react";

import { CarouselRoot } from "../../Carousel/CarouselRoot";
// import PosterGroup from "../PosterGroup/PosterGroup";
import PosterItem, { IPoster, posterItemGQL } from "../PosterItem/PosterItem";
import PosterList from "../PosterList/PosterList";

export const FETCH_POSTER = gql`
  query FetchPoster {
    posters(first: 50) {
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

const PosterRoot: FC<PosterRootProps> = ({ posters, className }) => (
  <PosterList className={className?.list}>
    <CarouselRoot
      itemMargin={5}
      isButtonsOnSides={false}
      isResponsiveWidthsChildren>
      {posters.map((poster) => (
        <PosterItem
          key={poster.id}
          data={poster}
          className={className?.item}
          count={posters.length}
        />
      ))}
    </CarouselRoot>
  </PosterList>
);

export default memo(PosterRoot);
