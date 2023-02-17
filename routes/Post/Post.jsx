import { gql } from "@apollo/client";
import { useEffect } from "react";

import Article from "../../components/Article/Article";
import { postGQL } from "../../components/Posts/PostsRoot";
import { columnsBlockGQL } from "../../components/blocks/Columns/Columns";
import { embedBlockGQL } from "../../components/blocks/Embed/Embed";
import { fileBlockGQL } from "../../components/blocks/File/File";
import { galleryBlockGQL } from "../../components/blocks/Gallery/utils";
import { headingBlockGQL } from "../../components/blocks/Heading/Heading";
import { htmlBlockGQL } from "../../components/blocks/Html/Html";
import { imageBlockGQL } from "../../components/blocks/Image/Figure";
import { listBlockGQL } from "../../components/blocks/List/List";
import { mediaTextBlockGQL } from "../../components/blocks/MediaText/MediaText.utils/mediaTextBlockGQL";
import { paragraphBlockGQL } from "../../components/blocks/Paragraph/Paragraph";
import { quoteBlockGQL } from "../../components/blocks/Quote/Quote";
import { separatorBlockGQL } from "../../components/blocks/Separator/Separator";
import { spacerBlockGQL } from "../../components/blocks/Spacer/Spacer";
import { tableBlockGQL } from "../../components/blocks/Table/Table";
import { verseBlockGQL } from "../../components/blocks/Verse/Verse";
import classes from "./Post.module.css";
import { getShortID, usePost } from "./Post.utils";
import Offer from "./offer/Offer";

export const Post = ({
  id,
  href,
  title,
  image,
  blocks,
  categories,
  isPreview = false,
}) => {
  // const router = useRouter();
  // const ref = useRef();
  // const { isOnScreen } = useOnScreen(null, "0px", 0.5);
  const { hendleOffers, offerList } = usePost();

  useEffect(() => {
    if (id) hendleOffers(id);
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

      {offerList !== null && (
        <div className={classes.feed}>
          <Offer
            id={getShortID(id)}
            postListByCategory={offerList.postListByCategory}
            similarPostList={offerList.similarPostList}
            categories={categories.nodes.map((c) => c.name)}
            // nextPost={nextPost}
          />
        </div>
      )}
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
      date
    }
  }
`;

export const GET_SOURCE_THUMBNAIL_URL = gql`
  query GET_SOURCE_THUMBNAIL_URL($in: [ID]) {
    mediaItems(where: { in: $in }) {
      nodes {
        sourceUrl(size: THUMBNAIL)
      }
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
