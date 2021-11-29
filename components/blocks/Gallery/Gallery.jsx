import { delay } from "~/helpers/delay";
import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
import { default as Image } from "next/image";
import { useEffect, useState, useRef } from "react";
import { GET_OVERLAY_FRAGMENT, overlayVar } from "~/store/variables/overlay";
import { Badge } from "../../Badge/Badge";
import Carousel from "../../Carusel/Carousel";
import Button from "../../UI/Button/Button";
import { Icon } from "../../UI/Icon/Icon";
import classes from "./Gallery.module.css";
import { SCROLLY_FRAGMENT } from "~/store/variables/scrollY";
import { createMarkup } from "~/helpers";


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
  columns,
  imageCrop,
  images,
  sizeSlug,
  // ref,
}) => {
  const { data: state } = useQuery(gql`
    query {
      ${GET_OVERLAY_FRAGMENT}
      ${SCROLLY_FRAGMENT}
    }
  `);
  const figureRef = useRef();
  const [zoom, setZoom] = useState(false);
  const [count, setCount] = useState(0);
  const hendleClick = (event) => {
    event.stopPropagation();
    if (zoom || event.target.nodeName !== "IMG") return;

    overlayVar({ isOpen: true, opacity: 100, color: "white" });
    positionScrollYRefVar.current = state?.scrollY;
    setZoom(true);
  };

  const positionScrollYRefVar = useRef(0);
  useEffect(() => {
    if (
      (!state.overlay.isOpen ||
        state.scrollY !== positionScrollYRefVar.current) &&
      zoom
    ) {
      if (state.scrollY !== positionScrollYRefVar.current)
        overlayVar({ isOpen: false, color: "white" });

      setZoom(false);
      delay(250).then(() => (figureRef.current.style.zIndex = ""));
    }
  }, [state?.overlay.isOpen, state?.scrollY]);
  useEffect(() => {
    if (zoom == false) {
      overlayVar({ isOpen: false, color: "white" });
    }
  }, [zoom]);

  return (
    <div className={classNames(classes.block, className)}>
      <figure
        ref={figureRef}
        className={classNames(
          classes.wrapper,
          classes[`wrapper_isZoom_${zoom}`]
        )}
        style={{ zIndex: zoom ? "4" : delay(250).then("") }}
        onClick={hendleClick}
      >
        <div className={classes.container}>
          <Carousel
            isScrollSnap={true}
            isShadow={false}
            isOpen={zoom}
            itemCountOfScreen={1}
            length={images.length}
            setCount={setCount}
          >
            {images.map((image) => {
              return (
                // <div>
                <figure
                  key={image.id}
                  style={{
                    minWidth: "100%",
                    margin: "auto",
                    maxHeight: "94vh",
                    scrollSnapAlign: "start",
                  }}
                  className={classNames(
                    classes.image,
                    classes[`image_isZoom_${zoom}`]
                  )}
                >
                  <Image
                    alt={image.alt}
                    src={image.url}
                    // layout="intrinsic"
                    priority={zoom}
                    layout="responsive"
                    // placeholder="blur"
                    // sizes={2400}
                    width={image.width}
                    height={image.height}
                    objectFit={zoom ? "contain" : "cover"}
                    // objectPosition="center"
                  />
                  <figcaption dangerouslySetInnerHTML={createMarkup(image.caption)} />
                </figure>
                // </div>
              );
            })}
          </Carousel>
          <Badge
            className={classes.badge}
            count={count + 1}
            length={images.length}
          />
        </div>
        <figcaption className={classes.caption}
          dangerouslySetInnerHTML={createMarkup(caption)}
        />
      </figure>
      <div
        className={classNames(
          classes.controls,
          classes[`controls_isZoom_${zoom}`]
        )}
      >
        <div className={classes.buttons}>
          {images[count]?.url !== undefined && (
            <Button
              className={classNames(classes["button_download"], {
                [classes["button_download_fill"]]: !zoom,
              })}
              href={images[count].url}
              view="download"
              icon={
                <Icon type={"download"} isGlyph={true} size="xl" side={false} />
              }
            />
          )}
          {zoom && (
            <Button
              className={classes["button_close"]}
              icon={<Icon type={"close"} size="xxl" />}
              onClick={() => setZoom(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
