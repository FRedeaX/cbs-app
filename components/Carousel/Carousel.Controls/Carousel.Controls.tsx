"use client";

import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Fade } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Void } from "@/helpers/typings/utility-types";

import _isIntersection from "../../../helpers/frontend/isIntersection";
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

  /**
   * Функция, выполняемая до дествий кнопок управления
   */
  onClick?: Void;
};

export const CarouselControls: FC<CarouselControlsProps> = ({
  isButtonsOnSides = true,
  isShadow = true,
  onClick,
}) => {
  const { isPrev, isNext } = useCarouselControls();
  const { containerMovement } = useCarousel(onClick);

  const iconSize = isButtonsOnSides ? "medium" : "small";

  const [isIntersection, setIntersection] = useState(true);
  useEffect(() => {
    // Eсли `IntersectionObserver` не поддерживается
    // показываем кнопки навигации и
    // отключаем тень
    setIntersection(_isIntersection);
  }, []);

  return (
    <Fade in={isPrev || isNext || !isIntersection}>
      <div>
        <CarouselShadowWrapper>
          <CarouselShadow
            isShadow={isShadow && isIntersection}
            direction="prev"
            isActive={isPrev}
          />
          <CarouselShadow
            isShadow={isShadow && isIntersection}
            direction="next"
            isActive={isNext}
          />
        </CarouselShadowWrapper>
        <CarouselButtonSides isButtonsOnSides={isButtonsOnSides}>
          <CarouselButton
            direction="prev"
            isActive={isPrev || !isIntersection}
            onClick={containerMovement}>
            <ArrowBackIosRoundedIcon fontSize={iconSize} />
          </CarouselButton>
          <CarouselButton
            direction="next"
            isActive={isNext || !isIntersection}
            onClick={containerMovement}>
            <ArrowForwardIosRoundedIcon fontSize={iconSize} />
          </CarouselButton>
        </CarouselButtonSides>
      </div>
    </Fade>
  );
};
