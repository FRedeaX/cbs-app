/* eslint-disable react/jsx-props-no-spreading */
import NextImage from "next/future/image";
import { FC, KeyboardEvent, useCallback } from "react";

import { Carousel } from "../../../../Carousel/Carousel";
import { useCarousel } from "../../../../Carousel/Carousel.utils/useCarousel";
import { useCarouselContext } from "../../../../Carousel/Context";
import { useGalleryContext } from "../../context";
import { useDrag } from "../../utils/useDrag";
import { Image } from "../Gallery.Row/Gallery.Row";
import { GalleryViewerHeader } from "../Gallery.ViewerHeader/Gallery.ViewerHeader";
import {
  ImageViewer,
  ImageViewerBody,
  ImageViewerImageWrapper,
} from "../ImageViewer";
import classes from "./Gallery.Viewer.module.css";

// delay(150).then(() => {
// });
type GalleryViewerProps = {
  images: Image[];
};

type HandleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => void;

/**
 * Промежуточное состояние компонента между событиями touchstart и touchend
 */
type DragStateData = {
  toucheLength: number;
  isDownMove: boolean;
};

export const GalleryViewer: FC<GalleryViewerProps> = ({ images }) => {
  const { isOpen, setToggle } = useGalleryContext();
  const { handleOnClick } = useCarousel();
  const { rootRef, scroll } = useCarouselContext();

  const handleOnKeyDown = useCallback<HandleOnKeyDown>(
    (event) => {
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        handleOnClick("next");
      } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
        handleOnClick("prev");
      }
    },
    [handleOnClick],
  );

  const { dragProps } = useDrag<DragStateData>((state) => {
    const root = rootRef.current;
    if (root === null) return;

    const {
      last,
      event: { targetTouches },
      movement: { x: mx, y: my },
      velocity: { x: vx, y: vy },
      delta: { x: dx },
      data,
    } = state;

    // Сохраняем данные о направлении жеста вниз
    if (my > 0 && Math.abs(mx) <= 5 && Math.abs(vy) > Math.abs(vx)) {
      data.isDownMove = true;
      return;
    }

    data.toucheLength = targetTouches.length;
    // Ничего не делаем, когда жест направлен вниз
    // или если количество касаний больше 1
    if (data.isDownMove || data.toucheLength > 1) return;

    const currentScroll = scroll.current + mx * -1;
    root.scrollTo({ left: currentScroll });

    // жест завершен, прокручиваем галерею, если
    // направление движения не изменилось и расстояние сдвига было достаточным или
    // возвращаем позицию scroll в исходное состояние если наоборот
    if (last) {
      const directionMovement = (mx < 0 && dx < 1) || (mx > 0 && dx > -1);
      const calculatedMovement = Math.abs(mx) * (Math.abs(vx) + 1);
      const screenPercentage = (root.clientWidth * 45) / 100;

      if (directionMovement && calculatedMovement > screenPercentage) {
        handleOnClick(mx < 0 ? "next" : "prev");
      } else {
        root.scrollTo({ left: scroll.current, behavior: "smooth" });
      }
    }
  });

  return (
    <ImageViewer open={isOpen} onClose={setToggle} onKeyDown={handleOnKeyDown}>
      <GalleryViewerHeader images={images} />
      <ImageViewerBody className={classes.root} {...dragProps}>
        <Carousel isShadow={false}>
          {images.map((image) => (
            <ImageViewerImageWrapper
              key={image.id}
              className={classes.imageWrapper}>
              <NextImage
                className={classes.image}
                alt={image.alt}
                src={image.url}
                width={image.width}
                height={image.height}
                sizes="100vw"
                loading="lazy"
              />
            </ImageViewerImageWrapper>
          ))}
        </Carousel>
      </ImageViewerBody>
    </ImageViewer>
  );
};
