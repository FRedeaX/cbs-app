import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Fade } from "@mui/material";
import { FC } from "react";

import { CarouselButton } from "../Carousel.Button/Carousel.Button";
import CarouselButtonSides from "../Carousel.Button/Carousel.Button.Sides";
import CarouselShadow from "../Carousel.Shadow/Carousel.Shadow";
import CarouselShadowWrapper from "../Carousel.Shadow/Carousel.Shadow.Wrapper";
import { useCarousel } from "../Carousel.utils/useCarousel";
import { useCarouselControls } from "../Carousel.utils/useCarouselControls";

export type CarouselControlsProps = {
  /**
   * Расположение кнопок навигации
   *
   * @default true
   */
  isButtonsOnSides?: boolean;

  /**
   * Тень по левой и правой стороне контейнера
   *
   * @default true
   */
  isShadow?: boolean;
};

export const CarouselControls: FC<CarouselControlsProps> = ({
  isButtonsOnSides = true,
  isShadow = true,
}) => {
  const { isPrev, isNext } = useCarouselControls();
  const { containerMovement } = useCarousel();

  const iconSize = isButtonsOnSides ? "medium" : "small";

  return (
    <Fade in={isPrev || isNext}>
      <div>
        <CarouselShadowWrapper>
          <CarouselShadow
            isShadow={isShadow}
            direction="prev"
            isActive={isPrev}
          />
          <CarouselShadow
            isShadow={isShadow}
            direction="next"
            isActive={isNext}
          />
        </CarouselShadowWrapper>
        <CarouselButtonSides isButtonsOnSides={isButtonsOnSides}>
          <CarouselButton
            direction="prev"
            isActive={isPrev}
            onClick={containerMovement}>
            <ArrowBackIosRoundedIcon fontSize={iconSize} />
          </CarouselButton>
          <CarouselButton
            direction="next"
            isActive={isNext}
            onClick={containerMovement}>
            <ArrowForwardIosRoundedIcon fontSize={iconSize} />
          </CarouselButton>
        </CarouselButtonSides>
      </div>
    </Fade>
  );
};
