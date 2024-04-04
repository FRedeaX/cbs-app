/* eslint-disable react/jsx-props-no-spreading */
import { animated, config, useSprings } from "@react-spring/web";
import { rubberbandIfOutOfBounds, useDrag } from "@use-gesture/react";
import { FC, KeyboardEvent, useCallback, useRef } from "react";

import { isFront } from "@/helpers";
import { Nullable } from "@/helpers/typings/utility-types";
import {
  Carousel,
  SCROLL_TIME,
  scrollTo,
  useCarousel,
  useCarouselContext,
} from "@/components/Carousel";
import { Image } from "@/components/Image";
import {
  ImageViewer,
  ImageViewerBody,
  ImageViewerFigure,
  ImageViewerZoom,
  ImageViewerZoomImperativeRef,
} from "@/components/ImageViewer";

import { useGalleryContext } from "../../context";
import { isAnimatedSprings } from "../../utils";
import { ImageData } from "../Gallery.Row";
import { GalleryViewerHeader } from "../Gallery.ViewerHeader";

import classes from "./Gallery.Viewer.module.css";

type GalleryViewerProps = {
  images: ImageData[];
};

type HandleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => void;

export const GalleryViewer: FC<GalleryViewerProps> = ({ images }) => {
  const imagesRef = useRef<Nullable<ImageViewerZoomImperativeRef>[]>([]);

  const { isOpen, setToggle } = useGalleryContext();
  const { containerMovement } = useCarousel();
  const {
    rootRef,
    scroll,
    typeMovement,
    itemWidthAccumulatedDESC,
    indexOfVisibleElement,
  } = useCarouselContext();

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

  const isAnimatedDrag = isAnimatedSprings(images.length);
  const width = isFront ? window.innerWidth : 0;

  const [style, api] = useSprings(images.length, () => ({
    scale: 1,
    config: { ...config.gentle, clamp: true },
  }));

  const dragProps = useDrag(
    (state) => {
      const currentIndex = indexOfVisibleElement.current;
      const root = rootRef.current;
      const zoom = imagesRef.current[currentIndex];
      const { memo = 0, touches } = state;

      if (root === null || !zoom) return memo;
      // Ничего не делаем, когда
      // масштабирование активено и граница не пересечена или
      // количество касаний больше 1
      if ((zoom.hasPinch() && !zoom.hasOverflow()) || touches > 1) return memo;

      zoom.onDisable();

      const {
        last,
        active,
        delta: [dx],
        velocity: [vx],
        lastOffset: [lx],
      } = state;
      const mx = memo + dx;

      const avx = Math.abs(vx);
      const amx = Math.abs(mx);

      const currentScroll = lx + mx * -1;
      let scrollTime = last ? SCROLL_TIME : 0;
      scrollTo(root, { left: currentScroll, typeMovement, scrollTime });

      // Анимируем свайп, если количество элементов не больше 10
      if (isAnimatedDrag) {
        api.start((i) => {
          if (i < currentIndex - 1 || i > currentIndex + 1) return {};
          const position = 1 - Math.abs(mx) / width / 2;
          const scale = active ? rubberbandIfOutOfBounds(position, 0.95, 1) : 1;
          return { scale };
        });
      }

      // Жест завершен, прокручиваем галерею, если
      // направление движения не изменилось и расстояние сдвига было достаточным или
      // возвращаем позицию scroll в исходное состояние если наоборот
      if (last) {
        const directionMovement = (mx < 0 && dx < 1) || (mx > 0 && dx > -1);
        const calculatedMovement = amx * (avx + 1);
        const screenPercentage = (root.clientWidth * 45) / 100;

        if (directionMovement && calculatedMovement > screenPercentage) {
          scrollTime /= Math.max(avx, 1);
          containerMovement(mx < 0 ? "next" : "prev", scrollTime);
          zoom.onReset();
        } else {
          scrollTo(root, {
            left: lx,
            typeMovement,
          });
        }

        zoom.onEnable();
      }

      return mx;
    },
    {
      from: () => [scroll.current, 0],
      bounds: () => {
        const scrollCalc = scroll.current * 2;
        const containerWidth = itemWidthAccumulatedDESC.current[0];

        return {
          right: scrollCalc,
          left: -containerWidth + scrollCalc,
        };
      },
      rubberband: true,
      filterTaps: true,
      eventOptions: { passive: false },
    },
  );

  return (
    <ImageViewer open={isOpen} onClose={setToggle} onKeyDown={handleOnKeyDown}>
      <GalleryViewerHeader images={images} />
      <ImageViewerBody
        className={[classes.root, { [classes.root_animated]: isAnimatedDrag }]}
        {...dragProps()}>
        <Carousel isShadow={false}>
          {images.map((image, index) => (
            <ImageViewerFigure
              key={image.id}
              className={classes.imageWrapper}
              figcaptionText={image.caption || image.alt}>
              <ImageViewerZoom
                style={{
                  "--image-max-width": `calc(var(--image-viewer-body) * ${
                    image.width / image.height
                  })`,
                }}
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}>
                <animated.div
                  style={{
                    scale: style[index].scale,
                  }}>
                  <Image
                    alt={image.alt}
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    sizes="100vw"
                    loading="lazy"
                    blurDataURL={image.blurDataURL}
                  />
                </animated.div>
              </ImageViewerZoom>
            </ImageViewerFigure>
          ))}
        </Carousel>
      </ImageViewerBody>
    </ImageViewer>
  );
};
