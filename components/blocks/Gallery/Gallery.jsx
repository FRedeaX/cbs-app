import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { createMarkup, delay } from "../../../helpers";
import {
  GET_OVERLAY_FRAGMENT,
  overlayVar,
} from "../../../store/variables/overlay";
import { SCROLLY_FRAGMENT } from "../../../store/variables/scrollY";
import Badge from "../../Badge/Badge";
import Carousel from "../../Carusel/Carousel";
import Button from "../../UI/Button/Button";
import Icon from "../../UI/Icon/Icon";
import Loader2 from "../../UI/Loader2/Loader2";
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

  // useEffect(() => {
  //   console.log(extractColors);
  // }, [extractColors]);

  const { data: state } = useQuery(gql`
    query {
      ${GET_OVERLAY_FRAGMENT}
      ${SCROLLY_FRAGMENT}
    }
  `);
  const figureRef = useRef();
  const [zoom, setZoom] = useState(false);
  const [count, setCount] = useState(0);

  const positionScrollYRefVar = useRef(0);
  const hendleClick = (event) => {
    event.stopPropagation();
    if (zoom || event.target.nodeName !== "IMG") return;

    overlayVar({ isOpen: true, opacity: 100, color: "white" });
    positionScrollYRefVar.current = state?.scrollY;
    setZoom(true);
  };

  useEffect(() => {
    if (
      (!state.overlay.isOpen ||
        state.scrollY !== positionScrollYRefVar.current) &&
      zoom
    ) {
      if (state.scrollY !== positionScrollYRefVar.current)
        overlayVar({ isOpen: false, color: "var(--bgWhite)" });
      setZoom(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.overlay.isOpen, state?.scrollY]);
  useEffect(() => {
    if (zoom === false) {
      overlayVar({ isOpen: false, color: "var(--bgWhite)" });
      delay(250).then(() => {
        figureRef.current.style.zIndex = "";
      });
    }
  }, [zoom]);

  return (
    <div className={classNames(classes.block, className)}>
      <figure
        ref={figureRef}
        className={classNames(
          classes.wrapper,
          classes[`wrapper_isZoom_${zoom}`],
        )}
        style={{ zIndex: zoom ? "4" : delay(250).then("") }}
        onClick={hendleClick}
        onKeyPress={hendleClick}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        tabIndex="0">
        <div
          style={{
            backgroundColor: `rgba(${extractColors[count]?.LightMuted.rgb}, 0.8)`,
          }}
          className={classNames(
            classes.container,
            classes[`container_isZoom_${zoom}`],
          )}>
          {/* <div className={classes.loader} aria-hidden="true">
            <Loader2 isLoading />
          </div> */}
          <Carousel
            isScrollSnap
            isShadow={false}
            isOpen={zoom}
            itemCountOfScreen={1}
            length={images.length}
            setCount={setCount}>
            {images.map((image) => (
              // <div>
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
                  priority={zoom}
                  objectFit="contain"
                />
                <figcaption
                  dangerouslySetInnerHTML={createMarkup(image.caption)}
                />
              </figure>
              // </div>
            ))}
          </Carousel>
          {zoom === false && (
            <Badge
              className={classes.badge}
              count={count + 1}
              length={images.length}
            />
          )}
        </div>
        <figcaption
          className={classes.caption}
          dangerouslySetInnerHTML={createMarkup(caption)}
        />
      </figure>
      <div
        style={{
          backgroundColor: `rgba(${extractColors[count]?.LightMuted.rgb}, 0.2)`,
        }}
        className={classNames(
          classes.controls,
          classes[`controls_isZoom_${zoom}`],
        )}>
        {zoom === true && (
          <Badge
            className={classes.badge}
            count={count + 1}
            length={images.length}
          />
        )}
        <div className={classes.buttons}>
          {images[count]?.url !== undefined && (
            <Button
              className={classNames(classes.button_download, {
                [classes.button_download_fill]: !zoom,
              })}
              href={images[count].url}
              view="download"
              icon={<Icon type="download" isGlyph size="xl" side={false} />}
            />
          )}
          {zoom && (
            <Button
              className={classes.button_close}
              icon={<Icon type="close" size="xxl" />}
              onClick={() => setZoom(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
