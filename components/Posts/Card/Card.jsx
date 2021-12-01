import classNames from "classnames";
import Link from "next/link";
import { memo } from "react";
import { createMarkup } from "../../../helpers";
import Category from "../Category/Category";
import classes from "./Card.module.css";
import Image from "next/image";

// const GET_ARTICLE_CONTENT = gql`
//   query GetArticleContent($id: ID!) {
//     post(id: $id, idType: ID) {
//       content
//     }
//   }
// `;

const Card = ({
  data: { isSticky, featuredImage, uri, title, excerpt, categories },
  horizontal,
  isBig,
  index,
  cls,
}) => {
  // console.log(title, !!featuredImage.node.src);
  return (
    <article
      className={classNames(
        classes.item,
        {
          [classes["item--horizontal"]]: horizontal,
          [classes["item_big"]]: isBig,
          [classes.sticky]: isSticky,
        },
        cls
      )}
    >
      {featuredImage && (
        <div
          className={classNames(classes.image, {
            [classes["image--horizontal"]]: horizontal,
            [classes["image_big"]]: isBig,
          })}
        >
          <Image
            src={featuredImage.node.src}
            className={classNames(classes.img, {
              [classes["img--horizontal"]]: horizontal,
              [classes["img_big"]]: isBig,
            })}
            width={500}
            height={258}
            // alt="Picture of the author"
            blurDataURL={featuredImage.node.blurDataURL}
            // automatically
            // provided
            placeholder="blur"
          />
        </div>
      )}
      <div
        className={classNames(classes.info, {
          [classes["info-horizontal"]]: horizontal,
        })}
      >
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
            className={classes.subtitle}
            dangerouslySetInnerHTML={createMarkup(excerpt)}
          />
        </div>
        <div
          className={classNames(classes.footer, {
            [classes["footer_big"]]: isBig,
          })}
        >
          <Category data={categories} />
        </div>
      </div>
    </article>
  );
};

function areEqual(prevProps, nextProps) {
  // console.log('prevProps', prevProps.data.title);
  // console.log('nextProps', nextProps.data.title);
  if (prevProps.data.id === nextProps.data.id) {
    return true;
  }
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
}

export default memo(Card, areEqual);
