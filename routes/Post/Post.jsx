import { gql } from "@apollo/client";
import { useEffect } from "react";

import Article from "../../components/Article/Article";
import { postGQL } from "../../components/Posts/PostsRoot";
import { columnsBlockGQL } from "../../components/blocks/Columns/utils/columnsGQL";
import { embedBlockGQL } from "../../components/blocks/Embed/utils/embedGQL";
import { fileBlockGQL } from "../../components/blocks/File/utils/fileGQL";
import { galleryBlockGQL } from "../../components/blocks/Gallery/utils/galleryGQL";
import { headingBlockGQL } from "../../components/blocks/Heading/utils/headingGQL";
import { htmlBlockGQL } from "../../components/blocks/Html/utils/htmlGQL";
import { imageBlockGQL } from "../../components/blocks/Image/utils/imageGQL";
import { listBlockGQL } from "../../components/blocks/List/utils/listGQL";
import { mediaTextBlockGQL } from "../../components/blocks/MediaText/utils/mediaTextBlockGQL";
import { paragraphBlockGQL } from "../../components/blocks/Paragraph/utils/paragraphGQL";
import { pullquoteBlockGQL } from "../../components/blocks/Pullquote/utils/pullquoteGQL";
import { quoteBlockGQL } from "../../components/blocks/Quote/utils/quoteGQL";
import { separatorBlockGQL } from "../../components/blocks/Separator/utils/separatorGQL";
import { spacerBlockGQL } from "../../components/blocks/Spacer/utils/spacerGQL";
import { tableBlockGQL } from "../../components/blocks/Table/utils/tableGQL";
import { verseBlockGQL } from "../../components/blocks/Verse/utils/verseGQL";
import { videoBlockGQL } from "../../components/blocks/Video/utils/videoGQL";
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
        ...columnsBlockGQL
        ...embedBlockGQL
        ...fileBlockGQL
        ...galleryBlockGQL
        ...headingBlockGQL
        ...htmlBlockGQL
        ...imageBlockGQL
        ...listBlockGQL
        ...mediaTextBlockGQL
        ...paragraphBlockGQL
        ...pullquoteBlockGQL
        ...quoteBlockGQL
        ...separatorBlockGQL
        ...spacerBlockGQL
        ...tableBlockGQL
        ...verseBlockGQL
        ...videoBlockGQL
      }
      ...postGQL
    }
  }
  ${columnsBlockGQL.fragments}
  ${embedBlockGQL.fragments}
  ${fileBlockGQL.fragments}
  ${galleryBlockGQL.fragments}
  ${headingBlockGQL.fragments}
  ${htmlBlockGQL.fragments}
  ${imageBlockGQL.fragments}
  ${listBlockGQL.fragments}
  ${mediaTextBlockGQL.fragments}
  ${paragraphBlockGQL.fragments}
  ${pullquoteBlockGQL.fragments}
  ${quoteBlockGQL.fragments}
  ${separatorBlockGQL.fragments}
  ${spacerBlockGQL.fragments}
  ${tableBlockGQL.fragments}
  ${verseBlockGQL.fragments}
  ${videoBlockGQL.fragments}
  ${postGQL.fragments}
`;
