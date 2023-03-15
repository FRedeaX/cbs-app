import { gql } from "@apollo/client";

import { columnsBlockGQL } from "../../../blocks/Columns/Columns";
import { embedBlockGQL } from "../../../blocks/Embed/Embed";
import { fileBlockGQL } from "../../../blocks/File/File";
import { galleryBlockGQL } from "../../../blocks/Gallery/utils";
import { headingBlockGQL } from "../../../blocks/Heading/Heading";
import { htmlBlockGQL } from "../../../blocks/Html/Html";
import { imageBlockGQL } from "../../../blocks/Image/utils/imageGQL";
import { listBlockGQL } from "../../../blocks/List/List";
import { mediaTextBlockGQL } from "../../../blocks/MediaText/MediaText.utils/mediaTextBlockGQL";
import { paragraphBlockGQL } from "../../../blocks/Paragraph/Paragraph";
import { quoteBlockGQL } from "../../../blocks/Quote/Quote";
import { separatorBlockGQL } from "../../../blocks/Separator/utils/separatorGQL";
import { spacerBlockGQL } from "../../../blocks/Spacer/utils/spacerGQL";
import { tableBlockGQL } from "../../../blocks/Table/Table";
import { verseBlockGQL } from "../../../blocks/Verse/Verse";

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
