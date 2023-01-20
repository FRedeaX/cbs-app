import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { createMarkup, delay, isFront } from "../../../helpers";
import {
  GET_OVERLAY_FRAGMENT,
  overlayVar,
} from "../../../store/variables/overlay";
import { SCROLLY_FRAGMENT } from "../../../store/variables/scrollY";
import Badge from "../../Badge/Badge";
import CarouselRoot from "../../Carousel/CarouselRoot";
import Button from "../../UI/Button/Button";
import Icon from "../../UI/Icon/Icon";
import classes from "./Gallery.module.css";
import useExtractColors from "./useExtractColors";

export const galleryBlockGQL = {
  fragments: gql`
    fragment galleryBlockGQL on CoreGalleryBlock {
      ... on CoreGalleryBlock {
        name
        attributes {
          ... on CoreGalleryBlockAttributes {
            caption
            className
            columns
            imageCrop
            images {
              alt
              id
              url
            }
            sizeSlug
          }
        }
      }
    }
  `,
};

// function areEqual(prevProps, nextProps) {
//   return (
//     prevProps.children.length === nextProps.children.length
//   );
// }

// function areEqual(prevProps, nextProps) {
//   return prevProps.images.length === nextProps.images.length;
// }

export const Gallery = ({
  caption,
  className,
  images,
  // ref,
}) => {
  const { getColors, extractColors } = useExtractColors();
  useEffect(() => {
    const ids = images.map((img) => img.id);
    getColors(ids);
  }, [getColors, images]);

  const { data: state } = useQuery(gql`
    query {
      ${GET_OVERLAY_FRAGMENT}
      ${SCROLLY_FRAGMENT}
    }
  `);
  const figureRef = useRef();
  const [zoom, setZoom] = useState(false);
  const [count, setCount] = useState(1);

  const positionScrollYRefVar = useRef(0);
  const hendleClick = (event) => {
    event.stopPropagation();
    if (zoom || event.target.nodeName !== "IMG") return;

    overlayVar({ isOpen: true, opacity: 100, color: "white" });
    positionScrollYRefVar.current = state?.scrollY;
    setZoom(true);

    if (isFront) {
      document.body.style.setProperty("--overlay-transition", "none");
    }
  };

  useEffect(() => {
    if (
      (!state.overlay.isOpen ||
        state.scrollY !== positionScrollYRefVar.current) &&
      zoom
    ) {
      if (state.scrollY !== positionScrollYRefVar.current) {
        overlayVar({ isOpen: false, color: "var(--bg-white-95)" });
      }
      setZoom(false);
      if (isFront) {
        delay(250).then(() =>
          document.body.style.setProperty("--overlay-transition", ""),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.overlay.isOpen, state?.scrollY]);

  if (images.length === 0) return null;
  return (
    <div className={classNames(classes.block, className)}>
      <figure
        ref={figureRef}
        className={classNames(
          classes.wrapper,
          classes[`wrapper_isZoom_${zoom}`],
        )}
        style={{ zIndex: zoom ? "calc(var(--header-z-index) + 1)" : "" }}
        onClick={hendleClick}
        onKeyPress={hendleClick}
        role="presentation">
        <div
          className={classNames(
            classes.wrapper,
            classes[`wrapper_isZoom_${zoom}`],
          )}
          onClick={hendleClick}
          onKeyPress={hendleClick}
          role="presentation">
          <div
            style={{
              backgroundColor: `rgba(${
                extractColors[count - 1]?.LightMuted.rgb
              }, 0.8)`,
            }}
            className={classNames(
              classes.container,
              classes[`container_isZoom_${zoom}`],
            )}>
            {/* <div className={classes.loader} aria-hidden="true">
              <Loader2 isLoading />
            </div> */}
            <CarouselRoot
              isScrollSnap
              isShadow={false}
              isOpen={zoom}
              itemCountOfScreen={1}
              length={images.length}
              setCount={setCount}>
              {images.map((image, index) => (
                <figure
                  key={image.id}
                  // style={{
                  //   minWidth: "100%",
                  //   margin: "auto",
                  //   maxHeight: "94vh",
                  //   scrollSnapAlign: "start",
                  // }}
                  className={classNames(
                    classes.image,
                    classes[`image_isZoom_${zoom}`],
                  )}>
                  <Image
                    alt={image.alt}
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    loading={index === 0 || zoom ? "eager" : "lazy"}
                    objectFit="contain"
                  />
                  <figcaption
                    dangerouslySetInnerHTML={createMarkup(image.caption)}
                  />
                </figure>
              ))}
            </CarouselRoot>
            {zoom === false && (
              <Badge
                className={classes.badge}
                count={count}
                length={images.length}
              />
            )}
          </div>
          <figcaption
            className={classes.caption}
            dangerouslySetInnerHTML={createMarkup(caption)}
          />
        </div>
      </figure>

      <div
        className={classNames(
          classes.controls,
          classes[`controls_isZoom_${zoom}`],
        )}>
        <div
          style={{
            backgroundColor: zoom
              ? `rgba(${extractColors[count - 1]?.LightMuted.rgb}, 0.2)`
              : "",
          }}
          className={classes.controls_wrapper}>
          {zoom === true && (
            <Badge
              className={classes.badge}
              count={count}
              length={images.length}
            />
          )}
          <div className={classes.buttons}>
            {images[count - 1]?.url !== undefined && (
              <Button
                className={classNames(classes.button_download, {
                  [classes.button_download_fill]: !zoom,
                })}
                href={images[count - 1]?.url}
                view="download"
                icon={<Icon type="download" isGlyph size="xl" side={false} />}
              />
            )}
            {zoom && (
              <Button
                className={classes.button_close}
                icon={<Icon type="close" size="xxl" />}
                onClick={() =>
                  overlayVar({ isOpen: false, color: "var(--bg-white-95)" })
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Gallery.displayName = "Gallery";
