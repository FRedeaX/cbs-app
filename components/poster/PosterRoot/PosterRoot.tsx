import { FC } from "react";

import { CarouselRoot } from "../../Carousel/CarouselRoot";
import { PosterItem, IPoster } from "../PosterItem/PosterItem";
import { PosterList } from "../PosterList/PosterList";

interface PosterRootProps {
  posters: Array<IPoster>;
  className?: {
    item?: string;
    list?: string;
    group?: string;
  };
}

export const PosterRoot: FC<PosterRootProps> = ({ posters, className }) => (
  <PosterList className={className?.list}>
    <CarouselRoot
      itemMargin={5}
      isButtonsOnSides={false}
      isResponsiveWidthsChildren>
      {posters.map((poster) => (
        <PosterItem key={poster.id} data={poster} className={className?.item} />
      ))}
    </CarouselRoot>
  </PosterList>
);
