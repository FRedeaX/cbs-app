import { gql } from "@apollo/client";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import Article from "../../components/Article/Article";
// import { useRef } from "react";
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
// import { useOnScreen } from "../../helpers/frontend";
// import { createMarkup } from "~/helpers";
import classes from "./Post.module.css";
import usePost from "./usePost";

export const Post = ({
  title,
  categories,
  href,
  image,
  blocks,
  isPreview = false,
}) => {
  // const ref = useRef();
  // const { isOnScreen } = useOnScreen(null, "0px", 0.5);
  const { hendleOffers, offerList } = usePost();

  useEffect(() => {
    hendleOffers(id);
  }, [hendleOffers, id]);

  // const [ref, { isVisible }] = useIntersectionObserver({ threshold: 0.5 });
  // useEffect(() => {
  //   if (isVisible) {
  //     const { nextPost } = offerList[offerList.length - 1];
  //     hendleOffers(nextPost.id);
  //   }
  // }, [hendleOffers, offerList, isVisible]);

  return (
    <>
      {/* <Button
        className={classNames(
          classes["button_to-top"],
          // classes[`button_to-top_${isOnScreen}`],
        )}
        iconLeft={<Icon direction="top" weight="small" />}
        onClick={hendeToTop}>
        <span className={classes["button_to-top_text"]}>Наверх</span>
      </Button> */}

      <Article
        title={title}
        categories={categories.nodes}
        blocks={blocks}
        isPreview={isPreview}
        href={href}
        image={image}
      />

      {offerList.length > 0 && (
        <div className={classes.feed}>
          <Offer
            postListByCategory={offerList[0].postListByCategory}
            similarPostList={offerList[0].similarPostList}
            categories={categories.nodes}
            // nextPost={nextPost}
          />
        </div>
      )}
    </>
  );
};

export const FETCH_ARTICLE = gql`
  query fetchArticle($id: ID!, $type: PostIdType, $isPreview: Boolean) {
    post(id: $id, idType: $type, asPreview: $isPreview) {
      categories {
        nodes {
          id
          name
          uri
        }
      }
      content
      excerpt
      featuredImage {
        node {
          sourceUrl(size: THUMBNAIL)
        }
      }
      id
      link
      title
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
      categories {
        nodes {
          id
          name
          uri
        }
      }
      excerpt
      featuredImage {
        node {
          sourceUrl(size: THUMBNAIL)
        }
      }
      id
      link
      title
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
`;
