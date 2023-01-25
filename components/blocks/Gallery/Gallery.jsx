import { gql } from "@apollo/client";
import { Backdrop } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { createMarkup } from "../../../helpers";
import { usePreventScroll, useToggle } from "../../../helpers/frontend/hooks";
import Badge from "../../Badge/Badge";
import CarouselRoot from "../../Carousel/CarouselRoot";
import Button from "../../UI/Button/Button";
import Icon from "../../UI/Icon/Icon";
import classes from "./Gallery.module.css";
import useExtractColors from "./useExtractColors";

const sxBackdrop = {
  backgroundColor: "white",
  zIndex: "calc(var(--header-z-index) + 1)",
};

export const galleryBlockGQL = {
  fragments: gql`
    fragment galleryBlockGQL on CoreGalleryBlock {
      ... on CoreGalleryBlock {
        name
        attributes {
          ... on CoreGalleryBlockAttributes {
            caption
            className
            imageCrop
            images {
              alt
              id
              url
            }
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

  const figureRef = useRef();
  const [isOpen, setIsOpen, { setTrue: setOpen, setFalse: setClose }] =
    useToggle();
  usePreventScroll({ enabled: isOpen });

  const [count, setCount] = useState(1);

  const hendleClick = useCallback(
    (event) => {
      event.stopPropagation();
      if (isOpen || event.target.nodeName !== "IMG") return;

      setOpen();
    },
    [isOpen, setOpen],
  );

  if (images.length === 0) return null;
  return (
    <div className={classNames(classes.block, className)}>
      <figure
        ref={figureRef}
        className={classNames(
          classes.wrapper,
          classes[`wrapper_isZoom_${isOpen}`],
        )}
        style={{ zIndex: isOpen ? "calc(var(--header-z-index) + 2)" : null }}>
        <div
          className={classNames(
            classes.wrapper,
            classes[`wrapper_isZoom_${isOpen}`],
          )}
          onClick={hendleClick}
          role="presentation">
          <div
            style={{
              backgroundColor: `rgba(${
                extractColors[count - 1]?.LightMuted.rgb
              }, 0.8)`,
            }}
            className={classNames(
              classes.container,
              classes[`container_isZoom_${isOpen}`],
            )}>
            {/* <div className={classes.loader} aria-hidden="true">
              <Loader2 isLoading />
            </div> */}
            <CarouselRoot
              isScrollSnap
              isShadow={false}
              isOpen={isOpen}
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
                    classes[`image_isZoom_${isOpen}`],
                  )}>
                  <Image
                    alt={image.alt}
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    loading={index === 0 || isOpen ? "eager" : "lazy"}
                    objectFit="contain"
                  />
                  <figcaption
                    dangerouslySetInnerHTML={createMarkup(image.caption)}
                  />
                </figure>
              ))}
            </CarouselRoot>
            {isOpen === false && (
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
          classes[`controls_isZoom_${isOpen}`],
        )}>
        <div
          style={{
            backgroundColor: isOpen
              ? `rgba(${extractColors[count - 1]?.LightMuted.rgb}, 0.2)`
              : null,
          }}
          className={classes.controls_wrapper}>
          {isOpen === true && (
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
                  [classes.button_download_fill]: !isOpen,
                })}
                href={images[count - 1]?.url}
                view="download"
                icon={<Icon type="download" isGlyph size="xl" side={false} />}
              />
            )}
            {isOpen && (
              <Button
                className={classes.button_close}
                icon={<Icon type="close" size="xxl" />}
                onClick={setIsOpen}
              />
            )}
          </div>
        </div>
      </div>
      <Backdrop sx={sxBackdrop} open={isOpen} onClick={setClose} />
    </div>
  );
};

Gallery.displayName = "Gallery";
