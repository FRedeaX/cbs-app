/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { createMarkup } from "../../../helpers";
import Category from "../Category/Category";
import classes from "./Card.module.css";

// const GET_ARTICLE_CONTENT = gql`
//   query GetArticleContent($id: ID!) {
//     post(id: $id, idType: ID) {
//       content
//     }
//   }
// `;

const Card = ({
  data: { isSticky, title, uri, categories, excerpt, featuredImage },
  imagePriority = false,
  horizontal,
  isClamp,
  isBig,
  cls,
  imagePriority = false,
}) => (
  <article
    className={classNames(
      classes.item,
      {
        [classes["item--horizontal"]]: horizontal,
        [classes.item_big]: isBig,
        [classes.sticky]: isSticky,
      },
      cls,
    )}>
    {featuredImage.node.src !== null &&
      featuredImage.node.blurDataURL !== null && (
        <div
          className={classNames(classes.image, {
            [classes["image--horizontal"]]: horizontal,
            [classes.image_big]: isBig,
          })}>
          <Image
            src={featuredImage.node.src}
            className={classNames(classes.img, {
              [classes["img--horizontal"]]: horizontal,
              [classes.img_big]: isBig,
            })}
            width={500}
            height={258}
            blurDataURL={featuredImage.node.blurDataURL}
            // automatically
            // provided
            priority={imagePriority}
            placeholder="blur"
            alt=""
            aria-hidden
          />
        </div>
      )}
    <div className={classes.info}>
      <div className={classes.text}>
        <h3 className={classes.title}>
          <Link href={uri}>
            <a
              className={classes.link}
              dangerouslySetInnerHTML={createMarkup(title)}
            />
          </Link>
        </h3>
        <div
          className={classNames(classes.subtitle, {
            [classes.subtitle_clamp]: isClamp,
          })}
          dangerouslySetInnerHTML={createMarkup(excerpt)}
        />
      </div>
      <div
        className={classNames(classes.footer, {
          [classes.footer_big]: isBig,
        })}>
        <Category data={categories.nodes} />
      </div>
    </div>
  </article>
);

function areEqual(prevProps, nextProps) {
  // console.log('prevProps', prevProps.data.title);
  // console.log('nextProps', nextProps.data.title);
  if (prevProps.data.id === nextProps.data.id) {
    return true;
  }
  return false;
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
}

export default memo(Card, areEqual);
