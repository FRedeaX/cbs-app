import { FC } from "react";

import { CarouselRoot } from "../../Carousel/CarouselRoot";
import { PosterItem, IPoster } from "../PosterItem/PosterItem";
import { PosterList } from "../PosterList/PosterList";

interface PosterRootProps {
  posters: Array<IPoster>;
}

export const PosterRoot: FC<PosterRootProps> = ({ posters }) => (
  <PosterList>
    <CarouselRoot
      itemMargin={5}
      isButtonsOnSides={false}
      isResponsiveWidthsChildren>
      {posters.map((poster) => (
        <PosterItem key={poster.id} data={poster} />
      ))}
    </CarouselRoot>
  </PosterList>
);
