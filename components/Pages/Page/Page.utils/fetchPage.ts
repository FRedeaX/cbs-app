import { gql } from "@apollo/client";

import { columnsBlockGQL } from "../../../blocks/Columns/utils/columnsGQL";
import { embedBlockGQL } from "../../../blocks/Embed/utils/embedGQL";
import { fileBlockGQL } from "../../../blocks/File/utils/fileGQL";
import { galleryBlockGQL } from "../../../blocks/Gallery/utils/galleryGQL";
import { headingBlockGQL } from "../../../blocks/Heading/utils/headingGQL";
import { htmlBlockGQL } from "../../../blocks/Html/utils/htmlGQL";
import { imageBlockGQL } from "../../../blocks/Image/utils/imageGQL";
import { listBlockGQL } from "../../../blocks/List/utils/listGQL";
import { mediaTextBlockGQL } from "../../../blocks/MediaText/utils/mediaTextBlockGQL";
import { paragraphBlockGQL } from "../../../blocks/Paragraph/utils/paragraphGQL";
import { pullquoteBlockGQL } from "../../../blocks/Pullquote/utils/pullquoteGQL";
import { quoteBlockGQL } from "../../../blocks/Quote/utils/quoteGQL";
import { separatorBlockGQL } from "../../../blocks/Separator/utils/separatorGQL";
import { spacerBlockGQL } from "../../../blocks/Spacer/utils/spacerGQL";
import { tableBlockGQL } from "../../../blocks/Table/utils/tableGQL";
import { verseBlockGQL } from "../../../blocks/Verse/utils/verseGQL";
import { videoBlockGQL } from "../../../blocks/Video/utils/videoGQL";

export const FETCH_PAGE = gql`
  query FetchPage($id: ID!, $idType: PageIdType, $isPreview: Boolean) {
    page(id: $id, idType: $idType, asPreview: $isPreview) {
      id
      title
      excerpt
      children(first: 100) {
        nodes {
          ... on Page {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
      }
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
`;

export const FETCH_CHILDREN_PAGE = gql`
  query FetchChildrenPage(
    $id: ID!
    $idType: PageIdType
    $isPreview: Boolean
    $cursor: String
    $first: Int
  ) {
    page(id: $id, idType: $idType, asPreview: $isPreview) {
      title
      excerpt
      children(after: $cursor, first: $first) {
        nodes {
          ... on Page {
            id
            title
            uri
            excerpt
            featuredImage {
              node {
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
        pageInfo {
          endCursor
        }
      }
    }
  }
`;

export const FETCH_CHILDREN_PAGE_PAGINATION = gql`
  query FetchChildrenPagePagination($id: ID!, $cursor: String, $first: Int) {
    page(id: $id, idType: URI) {
      children(after: $cursor, first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
