/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes, LegacyRef, forwardRef } from "react";

import { createMarkup, lineClamp as getLineClamp } from "../../../helpers";
import Category from "../../Posts/Category/Category";
import classes from "./Card.module.css";

export interface IData {
  id?: string;
  isSticky?: boolean;
  title: string;
  uri: string;
  categories?: { nodes: Array<object> };
  excerpt?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      blurDataURL?: string;
    };
  };
}

export interface ICardProps extends HTMLAttributes<HTMLElement> {
  data: IData;
  imagePriority?: boolean;
  prefetch?: boolean;
  isHorizontal?: boolean;
  className?: string;
  isClamp?: boolean;
  lineClamp?: number;
  isBig?: boolean;
  isSmall?: boolean;
}

export const Card: FC<ICardProps> = forwardRef(
  (
    {
      data: { isSticky, title, uri, categories, excerpt, featuredImage },
      imagePriority = false,
      prefetch = undefined,
      isHorizontal = false,
      className,
      isClamp,
      lineClamp = isClamp ? getLineClamp(title, 30, 3) : undefined,
      isBig,
      isSmall,
      ...props
    },
    ref: LegacyRef<HTMLElement>,
  ) => (
    <article
      ref={ref}
      className={classNames(
        classes.item,
        {
          [classes["item--horizontal"]]: isHorizontal,
          [classes.item_big]: isBig,
          [classes.sticky]: isSticky,
        },
        className,
      )}
      {...props}>
      {featuredImage && featuredImage.node.sourceUrl && (
        <div
          className={classNames(classes.image, {
            [classes["image--horizontal"]]: isHorizontal,
            [classes.image_big]: isBig === true,
            [classes.image_small]: isSmall === true,
          })}>
          <div
            className={classNames(
              classes.image_wrapper,
              classes[`image_wrapper_horizontal_${isHorizontal}`],
            )}>
            <Image
              src={featuredImage.node.sourceUrl}
              className={classNames(classes.img, {
                [classes["img--horizontal"]]: isHorizontal,
                [classes.img_big]: isBig,
              })}
              width={720}
              height={405}
              blurDataURL={featuredImage.node.blurDataURL || ""}
              // automatically
              // provided
              priority={imagePriority}
              placeholder={featuredImage.node.blurDataURL ? "blur" : undefined}
              alt=""
              aria-hidden
            />
          </div>
        </div>
      )}
      <div className={classes.info}>
        <div className={classes.text}>
          <h3 className={classes.title}>
            <Link href={uri} prefetch={prefetch}>
              <a
                className={classes.link}
                dangerouslySetInnerHTML={createMarkup(title)}
              />
            </Link>
          </h3>
          {excerpt && (
            <div
              style={{
                WebkitLineClamp: lineClamp,
              }}
              className={classNames(classes.subtitle, {
                [classes.subtitle_clamp]: isClamp,
              })}
              dangerouslySetInnerHTML={createMarkup(excerpt)}
            />
          )}
        </div>
        {categories && categories?.nodes.length > 0 && (
          <div
            className={classNames(classes.footer, {
              [classes.footer_big]: isBig,
            })}>
            <Category data={categories.nodes} cls={undefined} />
          </div>
        )}
      </div>
    </article>
  ),
);

Card.displayName = "Card";
