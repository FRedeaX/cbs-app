import { gql } from "@apollo/client";
import { SEO } from "~/components/SEO/SEO";
import { columnsBlockGQL } from "../../blocks/Columns/Columns";
import { embedBlockGQL } from "../../blocks/Embed/Embed";
import { fileBlockGQL } from "../../blocks/File/File";
import { galleryBlockGQL } from "../../blocks/Gallery/Gallery";
import { headingBlockGQL } from "../../blocks/Heading/Heading";
import { htmlBlockGQL } from "../../blocks/Html/Html";
import { imageBlockGQL } from "../../blocks/Image/Figure";
import { listBlockGQL } from "../../blocks/List/List";
import { mediaTextBlockGQL } from "../../blocks/MediaText/MediaText";
import { paragraphBlockGQL } from "../../blocks/Paragraph/Paragraph";
import { quoteBlockGQL } from "../../blocks/Quote/Quote";
import { separatorBlockGQL } from "../../blocks/Separator/Separator";
import { spacerBlockGQL } from "../../blocks/Spacer/Spacer";
import { tableBlockGQL } from "../../blocks/Table/Table";
import { verseBlockGQL } from "../../blocks/Verse/Verse";
import { Page as PageDefault } from "./PageDefault/Page";

export const PageRoot = ({ page }) => (
  <>
    <SEO title={page.title} description={page.excerpt} />
    <PageDefault title={page.title} blocks={page.blocks} />
  </>
);

// const _loader = ({ page }) => {
//   switch (page.template.templateName) {
//     case "Redirect":
//       break;

//     default:
//       return <PageDefault page={page} />;
//   }
// };

// query FetchParentUriPages($parent: ID!) {
// pages(first: 100, where: { status: PUBLISH, parent: $parent }) {
export const FETCH_PARENT_URI_PAGES = gql`
  query FetchParentUriPages {
    pages(first: 100, where: { status: PUBLISH, parentIn: "" }) {
      edges {
        node {
          slug
          template {
            templateName
          }
        }
      }
    }
  }
`;

//slug | uri
export const FETCH_CHILDREN_URI_PAGES = gql`
  query FetchChildrenUriPages($pathname: ID!) {
    page(id: $pathname, idType: URI) {
      children {
        edges {
          node {
            slug
            template {
              templateName
            }
          }
        }
      }
    }
  }
`;

export const FETCH_PAGE = gql`
  query FetchPage($id: ID!, $type: PageIdType, $isPreview: Boolean) {
    page(id: $id, idType: $type, asPreview: $isPreview) {
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
      id
      title
      excerpt
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
