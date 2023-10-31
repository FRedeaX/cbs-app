import { FC } from "react";

import { CarouselRoot } from "../../Carousel/CarouselRoot";
import { PosterItem, IPoster } from "../PosterItem/PosterItem";

interface PosterRootProps {
  posters: Array<IPoster>;
}

export const PosterRoot: FC<PosterRootProps> = ({ posters }) => (
  <CarouselRoot
    itemMargin={5}
    isButtonsOnSides={false}
    isResponsiveWidthsChildren>
    {posters.map((poster) => (
      <PosterItem key={poster.id} data={poster} />
    ))}
  </CarouselRoot>
);
