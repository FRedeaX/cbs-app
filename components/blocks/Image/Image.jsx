import { gql, useQuery } from "@apollo/client";
import classNames from "classnames";
// import Image from "next/image";
import { default as ImageNext } from "next/image";
import { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { delay } from "~/helpers/delay";
import { GET_OVERLAY_FRAGMENT, overlayVar } from "~/store/variables/overlay";
import { SCROLLY_FRAGMENT } from "~/store/variables/scrollY";
import Button from "../../UI/Button/Button";
import { Icon } from "../../UI/Icon/Icon";
import classes from "./Image.module.css";

export const imageBlockGQL = {
  fragments: gql`
    fragment imageBlockGQL on CoreImageBlock {
      ... on CoreImageBlock {
        name
        attributes {
          ... on CoreImageBlockAttributes {
            id
            align
            caption
            alt
            className
            url
          }
        }
      }
    }
  `,
};

export const Image = ({
  id,
  caption,
  alt,
  align,
  className,
  url,
  width,
  height,
  isImageZoom = true,
}) => {
  const { data: state } = useQuery(gql`
    query {
      ${GET_OVERLAY_FRAGMENT}
      ${SCROLLY_FRAGMENT}
    }
  `);
  const figureRef = useRef();
  const [isZoom, setZoom] = useState();

  const positionScrollYRefVar = useRef(0);
  useEffect(() => {
    if (
      (!state.overlay.isOpen ||
        state.scrollY !== positionScrollYRefVar.current) &&
      isZoom
    ) {
      if (state.scrollY !== positionScrollYRefVar.current)
        overlayVar({ isOpen: false, color: "white" });

      setZoom(false);
      delay(250).then(() => (figureRef.current.style.zIndex = ""));
    }
  }, [state?.overlay.isOpen, state?.scrollY]);

  const getTransform = () => {
    const figure = figureRef.current;
    const image = figure.children[0].children[1];

    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const imageX = image.x + image.clientWidth / 2;
    const imageY = image.y + image.clientHeight / 2;
    const centerX = clientWidth / 2 - imageX;
    const centerY = clientHeight / 2 - imageY;
    let scale = (
      height < width || clientHeight > clientWidth
        ? clientWidth / image.clientWidth
        : clientHeight / image.clientHeight
    )
      .toString()
      .substr(0, 3);

    if (scale > 1.6) scale = 1.6;
    return `translate(${centerX}px, ${centerY}px) scale(${scale})`;
  };
  const hendleZoom = (event) => {
    event.stopPropagation();
    if (isZoom) {
      setZoom(false);
      overlayVar({ isOpen: false, color: "white" });
      delay(250).then(() => (figureRef.current.style.zIndex = ""));
    } else {
      setZoom(true);
      overlayVar({
        isOpen: true,
        opacity: 100,
        color: "white",
        isOverflow: false,
      });
      positionScrollYRefVar.current = state?.scrollY;
    }
  };

  // if (align === "left") align = "flex-start";
  // else if (align === "right") align = "flex-end";
  return (
    <div
      className={classNames(
        classes.block,
        {
          [classes[`block_align_${align}`]]: align !== "",
        },
        className
      )}
    >
      <figure
        key={id}
        ref={figureRef}
        onClick={isImageZoom ? hendleZoom : null}
        style={{
          transform: isZoom ? getTransform() : "",
          zIndex: isZoom ? "4" : delay(0).then(""),
          cursor: isZoom && "default",
        }}
        className={classes.figure}
      >
        <ImageNext
          src={url}
          alt={alt}
          // layout="fill"
          width={width}
          height={height}
          // blurDataURL={base64}
          // placeholder="blur"
          // loading={"lazy"}
          // layout="responsive"
          // objectFit="cover"
          // className={className}
        />
        {caption && (
          <figcaption className={classes.caption}>{caption}</figcaption>
        )}
        <div className={classes.controls}>
          <Button
            className={classes["button_download"]}
            href={url}
            view="download"
            icon={<Icon type={"download"} isGlyph={true} side={false} />}
          />
        </div>
      </figure>
    </div>
  );
};
