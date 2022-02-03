/* eslint-disable no-unused-vars */

/* eslint-disable arrow-body-style */
import { gql } from "@apollo/client";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import Article from "../../components/Article/Article";
import InfiniteScrolling from "../../components/InfiniteScrolling/InfiniteScrolling";
import { postGQL } from "../../components/Posts/PostsRoot";
import Button from "../../components/UI/Button/Button";
import Icon from "../../components/UI/Icon/Icon";
import { columnsBlockGQL } from "../../components/blocks/Columns/Columns";
import { embedBlockGQL } from "../../components/blocks/Embed/Embed";
import { fileBlockGQL } from "../../components/blocks/File/File";
import { galleryBlockGQL } from "../../components/blocks/Gallery/Gallery";
import { headingBlockGQL } from "../../components/blocks/Heading/Heading";
import { htmlBlockGQL } from "../../components/blocks/Html/Html";
import { imageBlockGQL } from "../../components/blocks/Image/Figure";
import { listBlockGQL } from "../../components/blocks/List/List";
import { mediaTextBlockGQL } from "../../components/blocks/MediaText/MediaText";
import { paragraphBlockGQL } from "../../components/blocks/Paragraph/Paragraph";
import { quoteBlockGQL } from "../../components/blocks/Quote/Quote";
import { separatorBlockGQL } from "../../components/blocks/Separator/Separator";
import { spacerBlockGQL } from "../../components/blocks/Spacer/Spacer";
import { tableBlockGQL } from "../../components/blocks/Table/Table";
import { verseBlockGQL } from "../../components/blocks/Verse/Verse";
import { useIntersectionObserver } from "../../helpers/frontend/hooks";
// import { useOnScreen } from "../../helpers/frontend";
import classes from "./Post.module.css";
import Offer from "./offer/Offer";
import usePost from "./usePost";

export const Post = ({
  id,
  href,
  title,
  image,
  blocks,
  categories,
  isPreview = false,
}) => {
  // const ref = useRef();
  // const { isOnScreen } = useOnScreen(null, "0px", 0.5);
  const { hendeToTop, hendleOffers, offerList } = usePost();

  useEffect(() => {
    hendleOffers(id);
  }, [hendleOffers, id]);

  console.log(offerList);

  const router = useRouter();

  const onChange = useCallback(
    (entry) => {
      if (entry.isIntersecting) {
        const { id: _id, uri } = offerList[offerList.length - 1].nextPost;
        hendleOffers(_id);
        router.push(uri, uri, { scroll: false, shallow: true });

        console.log(
          `The component is ${
            entry.isIntersecting ? "visible" : "not visible"
          }.`,
        );
      }
    },
    [offerList, hendleOffers, router],
  );
  const [ref] = useIntersectionObserver(onChange, { threshold: 0.5 });
  // const isVisible = entry && entry.isIntersecting;

  // useEffect(() => {
  //   if (offerList.length > 0 && isVisible) {
  //     router.push(
  //       offerList[offerList.length - 1].nextPost.uri,
  //       offerList[offerList.length - 1].nextPost.uri,
  //       { scroll: false, shallow: true },
  //     );
  //   }

  //   console.log(`The component is ${isVisible ? "visible" : "not visible"}.`);
  // }, [isVisible]);

  return (
    <>
      <Button
        className={classNames(
          classes["button_to-top"],
          // classes[`button_to-top_${isOnScreen}`],
        )}
        iconLeft={<Icon direction="top" weight="small" />}
        onClick={hendeToTop}>
        <span className={classes["button_to-top_text"]}>Наверх</span>
      </Button>

      <Article
        title={title}
        categories={categories.nodes}
        blocks={blocks}
        isPreview={isPreview}
        href={href}
        image={image}
      />

      <div className={classes.feed}>
        {offerList.map(({ postListByCategory, nextPost }, index) => {
          if (offerList.length === index + 1) {
            return (
              //     <InfiniteScrolling
              //       hasMore
              //       hendleLoad={() => hendleOffers(nextPost.id)}>
              <Offer
                key={nextPost.id}
                postListByCategory={postListByCategory}
                nextPost={nextPost}
                ref={ref}
              />
              //     </InfiniteScrolling>
            );
          }
          return (
            <Offer
              key={nextPost.id}
              postListByCategory={postListByCategory}
              nextPost={nextPost}
            />
          );
        })}
      </div>
    </>
  );
};

export const GET_MINIMUM_DATA_FOR_OFFER = gql`
  query GET_MINIMUM_DATA_FOR_OFFER($id: ID!) {
    post(id: $id) {
      categories {
        nodes {
          termTaxonomyId
        }
      }
      postsFields {
        keywords
      }
      postId
    }
  }
`;

export const GET_POST_CONTENT_BY_BLOCKS = gql`
  query fetchArticle($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
      blocks {
        name
        ...paragraphBlockGQL
        ...galleryBlockGQL
        ...imageBlockGQL
        ...columnsBlockGQL
        ...htmlBlockGQL
        ...embedBlockGQL
        ...separatorBlockGQL
        ...quoteBlockGQL
        ...listBlockGQL
        ...mediaTextBlockGQL
        ...fileBlockGQL
        ...spacerBlockGQL
        ...headingBlockGQL
        ...tableBlockGQL
        ...verseBlockGQL
      }
      ...postGQL
      postId
    }
  }
  ${paragraphBlockGQL.fragments}
  ${galleryBlockGQL.fragments}
  ${imageBlockGQL.fragments}
  ${columnsBlockGQL.fragments}
  ${embedBlockGQL.fragments}
  ${htmlBlockGQL.fragments}
  ${separatorBlockGQL.fragments}
  ${quoteBlockGQL.fragments}
  ${listBlockGQL.fragments}
  ${mediaTextBlockGQL.fragments}
  ${fileBlockGQL.fragments}
  ${spacerBlockGQL.fragments}
  ${headingBlockGQL.fragments}
  ${tableBlockGQL.fragments}
  ${verseBlockGQL.fragments}
  ${postGQL.fragments}
`;
