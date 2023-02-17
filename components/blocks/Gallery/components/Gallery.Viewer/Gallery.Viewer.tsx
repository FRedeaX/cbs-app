/* eslint-disable react/jsx-props-no-spreading */
import NextImage from "next/future/image";
import { FC, KeyboardEvent, useCallback } from "react";

import { Carousel } from "../../../../Carousel/Carousel";
import {
  SCROLL_TIME,
  scrollTo,
} from "../../../../Carousel/Carousel.utils/scrollTo";
import { useCarousel } from "../../../../Carousel/Carousel.utils/useCarousel";
import { useCarouselContext } from "../../../../Carousel/Context";
import {
  ImageViewer,
  ImageViewerBody,
  ImageViewerFigure,
} from "../../../../ImageViewer";
import { useGalleryContext } from "../../context";
import { useDrag } from "../../utils";
import { Image } from "../Gallery.Row/Gallery.Row";
import { GalleryViewerHeader } from "../Gallery.ViewerHeader/Gallery.ViewerHeader";
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
  const { containerMovement } = useCarousel();
  const { rootRef, scroll, typeMovement } = useCarouselContext();

  const handleOnKeyDown = useCallback<HandleOnKeyDown>(
    (event) => {
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        containerMovement("next");
      } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
        containerMovement("prev");
      }
    },
    [containerMovement],
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

    const avx = Math.abs(vx);
    const amx = Math.abs(mx);

    // Сохраняем данные о направлении жеста вниз
    if (my > 0 && amx <= 5 && Math.abs(vy) > avx) {
      data.isDownMove = true;
      return;
    }

    data.toucheLength = targetTouches.length;
    // Ничего не делаем, когда жест направлен вниз
    // или если количество касаний больше 1
    if (data.isDownMove || data.toucheLength > 1) return;

    const currentScroll = scroll.current + mx * -1;
    scrollTo(root, { left: currentScroll, typeMovement, scrollTime: 0 });

    // Жест завершен, прокручиваем галерею, если
    // направление движения не изменилось и расстояние сдвига было достаточным или
    // возвращаем позицию scroll в исходное состояние если наоборот
    if (last) {
      const directionMovement = (mx < 0 && dx < 1) || (mx > 0 && dx > -1);
      const calculatedMovement = amx * (avx + 1);
      const screenPercentage = (root.clientWidth * 45) / 100;

      if (directionMovement && calculatedMovement > screenPercentage) {
        const scrollTime = SCROLL_TIME / Math.max(avx, 1);
        containerMovement(mx < 0 ? "next" : "prev", scrollTime);
      } else {
        scrollTo(root, {
          left: scroll.current,
          typeMovement,
        });
      }
    }
  });

  return (
    <ImageViewer open={isOpen} onClose={setToggle} onKeyDown={handleOnKeyDown}>
      <GalleryViewerHeader images={images} />
      <ImageViewerBody className={classes.root} {...dragProps}>
        <Carousel isShadow={false}>
          {images.map((image) => (
            <ImageViewerFigure
              key={image.id}
              className={classes.imageWrapper}
              figcaptionText={image.caption || image.alt}>
              <NextImage
                className={classes.image}
                alt={image.alt}
                src={image.url}
                width={image.width}
                height={image.height}
                sizes="100vw"
                loading="lazy"
              />
            </ImageViewerFigure>
          ))}
        </Carousel>
      </ImageViewerBody>
    </ImageViewer>
  );
};
