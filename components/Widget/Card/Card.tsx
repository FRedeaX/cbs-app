/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from "classnames";
import Link from "next/link";
import { FC, LegacyRef, forwardRef } from "react";

import { Nullable, Void } from "@/helpers/typings/utility-types";
import { Image } from "@/components/Image/Image";

import { createMarkup, lineClamp as getLineClamp } from "../../../helpers";
import { Category, CategoryProps } from "../../Posts/Category/Category";

import classes from "./Card.module.css";

export interface IData {
  id?: string;
  isSticky?: boolean;
  title: string;
  uri: string;
  categories?: {
    nodes: CategoryProps["data"];
  };
  excerpt?: string;
  featuredImage?: Nullable<{
    node: {
      sourceUrl: string;
      blurDataURL?: string;
    };
  }>;
}

export interface ICardProps {
  data: IData;
  imagePriority?: boolean;
  prefetch?: boolean;
  isHorizontal?: boolean;
  className?: string;
  isClamp?: boolean;
  lineClamp?: number;
  isBig?: boolean;
  isSmall?: boolean;
  onClick?: Void;
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
      lineClamp = isClamp ? getLineClamp(title, 32, 3) : undefined,
      isBig,
      isSmall,
      onClick,
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
      )}>
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
              classNamePlaceholder={classes.image_placeholder}
              width={355}
              height={200}
              blurDataURL={featuredImage.node.blurDataURL || null}
              priority={imagePriority}
              alt=""
            />
          </div>
        </div>
      )}
      <div className={classes.info}>
        <div className={classes.text}>
          <h3 className={classes.title}>
            <Link
              href={uri}
              prefetch={prefetch}
              onClick={onClick}
              legacyBehavior={false}
              className={classes.link}
              dangerouslySetInnerHTML={createMarkup(title)}
            />
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
            <Category data={categories.nodes} />
          </div>
        )}
      </div>
    </article>
  ),
);

Card.displayName = "Card";
