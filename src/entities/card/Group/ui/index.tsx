import { Box, Container, Typography } from "@mui/material";
import { ReactElement } from "react";

import { Nullable } from "@/helpers/typings/utility-types";
import { CarouselRoot } from "@/components/Carousel/CarouselRoot";

import {
  sxScroller,
  sxContainer,
  sxContainerTwoItems,
  sxHeader,
  sxSubtitle,
  sxTitle,
  sxCarousel,
  sxCarouselTwoItems,
} from "./styles";

type GroupCardsProps<T> = {
  title: string;
  description?: Nullable<string>;
  items: T[];
  renderItem: (params: T, index: number) => ReactElement;
};

export const GroupCards = <T extends object>({
  title,
  description,
  items,
  renderItem,
}: GroupCardsProps<T>) => (
  <Container
    sx={items.length === 2 ? [sxContainer, sxContainerTwoItems] : sxContainer}
    maxWidth="md"
    disableGutters>
    {(title || description) && (
      <Box sx={sxHeader}>
        {title && (
          <Typography sx={sxTitle} variant="h3">
            {title}
          </Typography>
        )}
        {description && (
          <Typography sx={sxSubtitle} variant="subtitle1" component="span">
            {description}
          </Typography>
        )}
      </Box>
    )}
    <CarouselRoot
      sx={items.length === 2 ? [sxCarousel, sxCarouselTwoItems] : sxCarousel}
      itemMargin={5}
      scrollerProps={{ sx: sxScroller }}>
      {items.map((post, index) => renderItem(post, index))}
    </CarouselRoot>
  </Container>
);
